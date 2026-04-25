import { ApiTypes } from "@/prisma/apiclient";
import { fileTypeFromBuffer } from "file-type";
import { createId } from '@paralleldrive/cuid2';
import path from 'path';
import sharp from "sharp";
import { NextResponse } from "next/server";

export type FileAttributes = ApiTypes["Media"]["attributes"];

export interface UploadResponse {
    jsonapi: {
        version: string;
    };
    data: {
        id: string;
        type: string;
        attributes: FileAttributes;
    }
}

export interface ErrorResponse {
    jsonapi: {
        version: string;
    };
    errors: Array<{
        status: string;
        title: string;
        detail?: string;
    }>;
}

export function jsonApiResponse<T>(data: T, status: number = 200): NextResponse<T> {
    const response = NextResponse.json(data, { status });
    response.headers.set('Content-Type', 'application/vnd.api+json');
    return response;
}

export async function validateRequest(
    request: Request,
    ignoreFileType: boolean = false
): Promise<ErrorResponse | (Omit<FileAttributes, 'updatedAt' | 'createdAt'> & { id: string, buffer: Buffer})> {
    const formData = await request.formData();
    const file = formData.get('file') as Blob | null;
    const uploadedFilename = formData.get('filename') as string | null;

    if (!file) {
        return {
            jsonapi: { version: '1.0' },
            errors: [{
                status: '400',
                title: 'Bad Request',
                detail: 'No file uploaded',
            }],
        }
    }

    if (!uploadedFilename) {
        return {
            jsonapi: { version: '1.0' },
            errors: [{
                status: '400',
                title: 'Bad Request',
                detail: 'Filename is required',
            }],
        }
    }
    
    // Convert blob to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    let uploadedExt: string = path.extname(uploadedFilename).toLowerCase().slice(1);
    let mimetype: string = 'application/octet-stream';
    if (!ignoreFileType) {
        // Get file type from buffer (more reliable than client headers)
        const fileTypeResult = await fileTypeFromBuffer(buffer);
        mimetype = fileTypeResult?.mime || 'application/octet-stream';

        // Validate file extension matches MIME type (optional but recommended)
        let detectedExt: string | null = fileTypeResult?.ext || uploadedExt;
    
        // Check if both are images (image extensions are interchangeable)
        const isUploadedImage = mimetype.startsWith('image/');
        const isDetectedImage = fileTypeResult?.mime?.startsWith('image/');
        const extensionMismatch = uploadedExt && detectedExt && uploadedExt !== detectedExt && !(isUploadedImage && isDetectedImage);
        
        if (extensionMismatch) {
            if (formData.get('ignoreExtensionMismatch') !== 'true') {
                return {
                    jsonapi: { version: '1.0' },
                    errors: [{
                        status: '400',
                        title: 'Bad Request',
                        detail: `File extension does not match file content: .${uploadedExt} vs .${detectedExt}`,
                    }],
                };
            }
            console.warn(`File extension mismatch: ${uploadedExt} vs ${detectedExt}`);
        }
    }

    // Generate IDs and paths
    const id = createId();
    const shortId = id.slice(0, 8);
    const filename = path.parse(uploadedFilename).name; // Remove extension
    const fileExtension = uploadedExt || 'bin';
    const filepath = `${filename}_${shortId}.${fileExtension}`;
    
    // Get image dimensions if applicable
    let width: number | null = null;
    let height: number | null = null;
    if (mimetype.startsWith('image/')) {
        try {
            const metadata = await sharp(buffer).metadata();
            width = metadata.width;
            height = metadata.height;
        } catch (e) {
            console.warn('Could not extract image dimensions:', e);
        }
    }

    return {
        id,
        filename: `${filename}_${shortId}.${fileExtension}`,
        filepath,
        mimetype,
        size: buffer.length,
        width,
        height,
        uploadedById: null,
        buffer,
    }
}
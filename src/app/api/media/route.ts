import sharp from 'sharp';
import { NextResponse } from 'next/server';
import { createId } from '@paralleldrive/cuid2';
import { fileTypeFromBuffer } from 'file-type';
import { auth } from '@/lib/auth'; // adjust import to your auth setup
import fs from 'fs/promises';
import path from 'path';
import prisma from "@/prisma";

const MEDIA_DIR = process.env.MEDIA_DIR || './public/media';

interface UploadResponse {
    jsonapi: {
        version: string;
    };
    data: {
        id: string;
        type: string;
        attributes: {
            filename: string;
            filepath: string;
            mimetype: string;
            size: number;
            width?: number;
            height?: number;
            uploadedAt: string;
        };
    }
}

interface ErrorResponse {
    jsonapi: {
        version: string;
    };
    errors: Array<{
        status: string;
        title: string;
        detail?: string;
    }>;
}

export async function POST(request: Request): Promise<NextResponse<UploadResponse | ErrorResponse>> {
    let requestBody: string = "";
    try {
        const clonedRequest = request.clone();
        requestBody = await clonedRequest.text();
        console.log('Raw request body (first 500 chars):', requestBody.substring(0, 500));
        console.log('Request content-type:', request.headers.get('content-type'));        
        
        // Get authenticated user
        const session = await auth();
        if (!session?.user?.id) {
            const errorResponse: ErrorResponse = {
                jsonapi: { version: '1.0' },
                errors: [{
                    status: '401',
                    title: 'Unauthorized',
                    detail: 'Authentication required',
                }],
            };
            return NextResponse.json(errorResponse, { status: 401 });
        }
        // const session = { user: { id: 'test-user-id' } }; // Placeholder for testing without auth

        // Parse form data
        const formData = await request.formData();
        const file = formData.get('file') as Blob | null;
        const uploadedFilename = formData.get('filename') as string | null;

        if (!file) {
            const errorResponse: ErrorResponse = {
                jsonapi: { version: '1.0' },
                errors: [{
                    status: '400',
                    title: 'Bad Request',
                    detail: 'No file uploaded',
                }],
            };
            return NextResponse.json(errorResponse, { status: 400 });
        }

        if (!uploadedFilename) {
            const errorResponse: ErrorResponse = {
                jsonapi: { version: '1.0' },
                errors: [{
                    status: '400',
                    title: 'Bad Request',
                    detail: 'Filename is required',
                }],
            };
            return NextResponse.json(errorResponse, { status: 400 });
        }

        // Convert blob to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Get file type from buffer (more reliable than client headers)
        const fileTypeResult = await fileTypeFromBuffer(buffer);
        const mimetype = fileTypeResult?.mime || 'application/octet-stream';

        // Validate file extension matches MIME type (optional but recommended)
        const uploadedExt = path.extname(uploadedFilename).toLowerCase().slice(1);
        let detectedExt = fileTypeResult?.ext || uploadedExt;
        
        // Check if both are images (image extensions are interchangeable)
        const isUploadedImage = mimetype.startsWith('image/');
        const isDetectedImage = fileTypeResult?.mime?.startsWith('image/');
        const extensionMismatch = uploadedExt && detectedExt && uploadedExt !== detectedExt && !(isUploadedImage && isDetectedImage);
        
        if (extensionMismatch) {
            if (formData.get('ignoreExtensionMismatch') !== 'true') {
                const errorResponse: ErrorResponse = {
                    jsonapi: { version: '1.0' },
                    errors: [{
                        status: '400',
                        title: 'Bad Request',
                        detail: `File extension does not match file content: .${uploadedExt} vs .${detectedExt}`,
                    }],
                };
                return NextResponse.json(errorResponse, { status: 400 });
            }
            console.warn(`File extension mismatch: ${uploadedExt} vs ${detectedExt}`);
            detectedExt = uploadedExt;
        }

        // Generate IDs and paths
        const id = createId();
        const shortId = id.slice(0, 8);
        const filename = path.parse(uploadedFilename).name; // Remove extension
        const fileExtension = detectedExt || uploadedExt || 'bin';
        const filepath = `${MEDIA_DIR.slice(1)}/${filename}_${shortId}.${fileExtension}`;
        const fullFilePath = path.join(MEDIA_DIR, `${filename}_${shortId}.${fileExtension}`);

        // Get image dimensions if applicable
        let width: number | undefined;
        let height: number | undefined;
        if (mimetype.startsWith('image/')) {
            try {
                const metadata = await sharp(buffer).metadata();
                width = metadata.width;
                height = metadata.height;
            } catch (e) {
                console.warn('Could not extract image dimensions:', e);
            }
        }

        // Ensure directory exists
        await fs.mkdir(path.dirname(fullFilePath), { recursive: true });

        // Write file to disk
        await fs.writeFile(fullFilePath, buffer);

        const mediaRecord = await prisma.media.create({
            data: {
                id,
                filename: uploadedFilename,
                filepath,
                mimetype,
                size: buffer.length,
                width,
                height,
                uploadedById: session.user.id,
            },
        });

        const response: UploadResponse = {
            jsonapi: {
                version: '1.0',
            },
            data: {
                id: mediaRecord.id,
                type: 'media',
                attributes: {
                    filename: mediaRecord.filename,
                    filepath: mediaRecord.filepath,
                    mimetype: mediaRecord.mimetype,
                    size: mediaRecord.size,
                    width: mediaRecord.width || undefined,
                    height: mediaRecord.height || undefined,
                    uploadedAt: mediaRecord.createdAt.toISOString(),
                },
            }
        };

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        console.error('Error processing upload:', error);
        console.error("Raw request body that caused error:", requestBody.substring(0,1000));
        const errorResponse: ErrorResponse = {
            jsonapi: { version: '1.0' },
            errors: [{
                status: '500',
                title: 'Internal Server Error',
                detail: error instanceof Error ? error.message : 'An unexpected error occurred',
            }],
        };
        return NextResponse.json(errorResponse, { status: 500 });
    }
}

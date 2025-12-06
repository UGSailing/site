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
    id: string;
    filename: string;
    filepath: string;
    mimetype: string;
    size: number;
    width?: number;
    height?: number;
    uploadedAt: string;
}

export async function POST(request: Request): Promise<NextResponse<UploadResponse | { error: string }>> {
    try {
        // Get authenticated user
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        // const session = { user: { id: 'test-user-id' } }; // Placeholder for testing without auth

        // Parse form data
        const formData = await request.formData();
        const file = formData.get('file') as Blob | null;
        const uploadedFilename = formData.get('filename') as string | null;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        if (!uploadedFilename) {
            return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
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
                return NextResponse.json(
                    { 
                        error: `File extension does not match file content: .${uploadedExt} vs .${detectedExt}` 
                    }, { 
                        status: 400 
                    }
                );
            }
            console.warn(`File extension mismatch: ${uploadedExt} vs ${detectedExt}`);
            detectedExt = uploadedExt;
        }

        // Generate IDs and paths
        const id = createId();
        const shortId = id.slice(0, 8);
        const filename = path.parse(uploadedFilename).name; // Remove extension
        const fileExtension = detectedExt || uploadedExt || 'bin';
        const filepath = `/media/${filename}_${shortId}.${fileExtension}`;
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

        const response: UploadResponse = {
            id,
            filename: uploadedFilename,
            filepath,
            mimetype,
            size: buffer.length,
            ...(width && { width }),
            ...(height && { height }),
            uploadedAt: new Date().toISOString(),
        };

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        console.error('Error processing upload:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal Server Error' },
            { status: 500 }
        );
    }
}
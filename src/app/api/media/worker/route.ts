import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import prisma from "@/prisma";
import { UploadResponse, ErrorResponse, validateRequest, jsonApiResponse } from '@/lib/file-helpers';

const WORKER_DIR = process.env.WORKER_DIR || './public/worker';

export async function POST(request: Request): Promise<NextResponse<UploadResponse | ErrorResponse>> {
    // The security implications of allowing file uploads by any user, not even being logged in, are significant.
    // Until we have a clear solution for this, the endpoint is disabled and file uploads to this endpoint will fail.
    return jsonApiResponse({
        jsonapi: { version: '1.0' },
        errors: [{
            status: '503',
            title: 'Service Unavailable',
            detail: 'The worker file upload endpoint is currently disabled. Please try again later.',
        }],
    }, 503);
}
/*
    let requestBody: string = "";
    try {
        const clonedRequest = request.clone();
        requestBody = await clonedRequest.text();
        console.log('Raw request body (first 500 chars):', requestBody.substring(0, 500));
        console.log('Request content-type:', request.headers.get('content-type'));        
        
        // User does not need auth

        const fileData = await validateRequest(request);
        if ('errors' in fileData) {
            return jsonApiResponse(fileData as ErrorResponse, 400);
        }

        if (fileData.size > 10 * 1024 * 1024) { // 10MB limit for worker uploads
            const errorResponse: ErrorResponse = {
                jsonapi: { version: '1.0' },
                errors: [{
                    status: '413',
                    title: 'Payload Too Large',
                    detail: 'File size exceeds the 10MB limit for worker uploads',
                }],
            };
            return jsonApiResponse(errorResponse, 413);
        }

        if (!fileData.filename.endsWith('.npz')) {
            const errorResponse: ErrorResponse = {
                jsonapi: { version: '1.0' },
                errors: [{
                    status: '415',
                    title: 'Unsupported Media Type',
                    detail: 'Only .npz files are allowed for worker uploads',
                }],
            };
            return jsonApiResponse(errorResponse, 415);
        }

        // Ensure directory exists
        const fullFilePath = path.join(WORKER_DIR, fileData.filepath);
        await fs.mkdir(path.dirname(fullFilePath), { recursive: true });

        // Write file to disk
        await fs.writeFile(fullFilePath, fileData.buffer);

        const mediaRecord = await prisma.media.create({
            data: {
                id: fileData.id,
                filename: fileData.filename,
                filepath: fullFilePath.slice(1),
                mimetype: fileData.mimetype,
                size: fileData.size,
                width: fileData.width,
                height: fileData.height,
                uploadedById: null,
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
                    width: mediaRecord.width || null,
                    height: mediaRecord.height || null,
                    createdAt: mediaRecord.createdAt.toISOString(),
                    updatedAt: mediaRecord.updatedAt.toISOString(),
                    uploadedById: mediaRecord.uploadedById,
                },
            }
        };

        return jsonApiResponse(response, 201);
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
        return jsonApiResponse(errorResponse, 500);
    }
}
**/
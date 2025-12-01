"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";

export interface ImageUploadProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
    onImageSelected?: (file: File) => void;
    onImageRemoved?: () => void;
    preview?: string | null;
    maxSize?: number; // in bytes, default 10MB
    accept?: string;
}

const ImageUpload = React.forwardRef<HTMLInputElement, ImageUploadProps>(
    (
        {
            className,
            onImageSelected,
            onImageRemoved,
            preview,
            maxSize = 10 * 1024 * 1024, // 10MB default
            accept = "image/*",
            disabled,
            ...props
        },
        ref
    ) => {
        const [isDragging, setIsDragging] = React.useState(false);
        const [error, setError] = React.useState<string | null>(null);
        const fileInputRef = React.useRef<HTMLInputElement>(null);

        const validateFile = (file: File): boolean => {
            setError(null);

            if (!file.type.startsWith("image/")) {
                setError("Please select an image file");
                return false;
            }

            if (file.size > maxSize) {
                setError(
                    `File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`
                );
                return false;
            }

            return true;
        };

        const handleFileSelect = (file: File) => {
            if (validateFile(file)) {
                onImageSelected?.(file);
            }
        };

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                handleFileSelect(file);
            }
        };

        const handleDragOver = (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (!disabled) {
                setIsDragging(true);
            }
        };

        const handleDragLeave = (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
        };

        const handleDrop = (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);

            if (disabled) return;

            const file = e.dataTransfer.files?.[0];
            if (file) {
                handleFileSelect(file);
            }
        };

        const handleRemove = () => {
            setError(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            onImageRemoved?.();
        };

        return (
            <div className="flex flex-col gap-4">
                <div
                    className={cn(
                        "relative flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed px-6 py-8 transition-colors",
                        isDragging
                            ? "border-primary bg-primary/10"
                            : "border-input bg-muted/30 hover:bg-muted/50",
                        disabled && "cursor-not-allowed opacity-50",
                        error && "border-destructive",
                        className
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <input
                        ref={(node) => {
                            if (ref) {
                                if (typeof ref === "function") {
                                    ref(node);
                                } else {
                                    ref.current = node;
                                }
                            }
                            fileInputRef.current = node;
                        }}
                        type="file"
                        accept={accept}
                        onChange={handleInputChange}
                        disabled={disabled}
                        className="absolute inset-0 cursor-pointer opacity-0"
                        {...props}
                    />

                    {preview ? (
                        <div className="relative w-full max-w-xs">
                            <img
                                src={preview}
                                alt="Preview"
                                className="h-auto w-full rounded-md object-cover"
                            />
                            <button
                                type="button"
                                onClick={handleRemove}
                                disabled={disabled}
                                className="absolute right-2 top-2 rounded-full bg-destructive p-1 text-destructive-foreground shadow-lg hover:bg-destructive/90 disabled:opacity-50"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ) : (
                        <>
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <div className="text-center">
                                <p className="text-sm font-medium text-foreground">
                                    Drag and drop your image here, or click to select
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Max size: {Math.round(maxSize / 1024 / 1024)}MB
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {error && (
                    <p className="text-sm font-medium text-destructive">{error}</p>
                )}
            </div>
        );
    }
);

ImageUpload.displayName = "ImageUpload";

export { ImageUpload };

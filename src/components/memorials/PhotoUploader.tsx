'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, X, Loader2, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { uploadPhoto, compressImage, stripExif } from '@/lib/storage/photos';

interface PhotoUploaderProps {
  memorialId: string;
  onUploadComplete: (photos: { path: string; url: string }[]) => void;
  maxPhotos?: number;
  currentPhotoCount?: number;
}

interface UploadingFile {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: 'pending' | 'uploading' | 'complete' | 'error';
  error?: string;
  result?: { path: string; url: string };
}

export default function PhotoUploader({
  memorialId,
  onUploadComplete,
  maxPhotos = 50,
  currentPhotoCount = 0,
}: PhotoUploaderProps) {
  const [files, setFiles] = useState<UploadingFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const remainingSlots = maxPhotos - currentPhotoCount;

  const processFiles = useCallback(async (selectedFiles: File[]) => {
    const validFiles = selectedFiles.filter((file) =>
      ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)
    );

    if (validFiles.length === 0) return;

    // Limit to remaining slots
    const filesToProcess = validFiles.slice(0, remainingSlots - files.length);

    // Create preview entries
    const newFiles: UploadingFile[] = filesToProcess.map((file) => ({
      id: Math.random().toString(36).substring(2),
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      status: 'pending' as const,
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // Process and upload each file
    for (const uploadingFile of newFiles) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadingFile.id ? { ...f, status: 'uploading' as const } : f
        )
      );

      try {
        // Compress and strip EXIF
        let processedFile = await compressImage(uploadingFile.file);
        processedFile = await stripExif(processedFile);

        // Upload
        const result = await uploadPhoto(processedFile, memorialId, (progress) => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uploadingFile.id ? { ...f, progress } : f
            )
          );
        });

        if (result.success && result.path && result.url) {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uploadingFile.id
                ? {
                    ...f,
                    status: 'complete' as const,
                    progress: 100,
                    result: { path: result.path!, url: result.url! },
                  }
                : f
            )
          );
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uploadingFile.id
                ? { ...f, status: 'error' as const, error: result.error }
                : f
            )
          );
        }
      } catch (error) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadingFile.id
              ? { ...f, status: 'error' as const, error: 'Upload failed' }
              : f
          )
        );
      }
    }
  }, [memorialId, remainingSlots, files.length]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, [processFiles]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleDone = () => {
    const completedPhotos = files
      .filter((f) => f.status === 'complete' && f.result)
      .map((f) => f.result!);

    onUploadComplete(completedPhotos);

    // Clean up previews
    files.forEach((f) => URL.revokeObjectURL(f.preview));
    setFiles([]);
  };

  const hasCompletedUploads = files.some((f) => f.status === 'complete');
  const isUploading = files.some((f) => f.status === 'uploading');

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-teal-500 bg-teal-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-600 mb-1">
          Drag and drop photos here, or click to select
        </p>
        <p className="text-sm text-gray-400">
          JPEG, PNG, GIF, or WebP • Max 15MB each • {remainingSlots} photo{remainingSlots !== 1 ? 's' : ''} remaining
        </p>
      </div>

      {/* Upload previews */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {files.map((file) => (
              <div
                key={file.id}
                className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
              >
                <img
                  src={file.preview}
                  alt=""
                  className="w-full h-full object-cover"
                />

                {/* Status overlay */}
                {file.status === 'uploading' && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center">
                      <Loader2 className="w-6 h-6 text-white animate-spin mx-auto mb-1" />
                      <span className="text-white text-xs">{file.progress}%</span>
                    </div>
                  </div>
                )}

                {file.status === 'error' && (
                  <div className="absolute inset-0 bg-red-500/80 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                )}

                {/* Remove button */}
                {file.status !== 'uploading' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file.id);
                    }}
                    className="absolute top-1 right-1 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {files.filter((f) => f.status === 'complete').length} of {files.length} uploaded
            </p>
            {hasCompletedUploads && !isUploading && (
              <button
                onClick={handleDone}
                className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors"
              >
                Done
              </button>
            )}
          </div>
        </div>
      )}

      {/* Empty state */}
      {files.length === 0 && currentPhotoCount === 0 && (
        <div className="text-center py-8 border border-gray-200 rounded-lg bg-gray-50">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No photos yet</p>
          <p className="text-sm text-gray-400">Add photos to your memorial</p>
        </div>
      )}
    </div>
  );
}

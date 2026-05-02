'use client';

import { useState, useCallback } from 'react';
import { Upload, Star, Trash2, GripVertical, Loader2 } from 'lucide-react';

interface Photo {
  id: string;
  storage_path: string;
  caption: string | null;
  display_order: number;
}

interface PhotosManagerProps {
  memorialId: string;
  initialPhotos: Photo[];
  heroPhotoId: string | null;
}

export default function PhotosManager({
  memorialId,
  initialPhotos,
  heroPhotoId: initialHeroPhotoId,
}: PhotosManagerProps) {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [heroPhotoId, setHeroPhotoId] = useState<string | null>(initialHeroPhotoId);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const getPhotoUrl = (storagePath: string) => {
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/memorial-photos/${storagePath}`;
  };

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      setIsUploading(true);
      setMessage(null);

      try {
        for (const file of Array.from(files)) {
          const formData = new FormData();
          formData.append('file', file);

          const response = await fetch(`/api/memorials/${memorialId}/photos`, {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Failed to upload photo');
          }

          const { photo } = await response.json();
          setPhotos((prev) => [...prev, photo]);
        }

        setMessage({ type: 'success', text: 'Photos uploaded successfully' });
      } catch (error) {
        setMessage({
          type: 'error',
          text: error instanceof Error ? error.message : 'Failed to upload photos',
        });
      } finally {
        setIsUploading(false);
        e.target.value = '';
      }
    },
    [memorialId]
  );

  const handleSetHero = async (photoId: string) => {
    try {
      const response = await fetch(`/api/memorials/${memorialId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hero_photo_id: photoId }),
      });

      if (!response.ok) {
        throw new Error('Failed to set hero photo');
      }

      setHeroPhotoId(photoId);
      setMessage({ type: 'success', text: 'Hero photo updated' });
    } catch {
      setMessage({ type: 'error', text: 'Failed to set hero photo' });
    }
  };

  const handleDelete = async (photoId: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;

    try {
      const response = await fetch(
        `/api/memorials/${memorialId}/photos?photoId=${photoId}`,
        { method: 'DELETE' }
      );

      if (!response.ok) {
        throw new Error('Failed to delete photo');
      }

      setPhotos((prev) => prev.filter((p) => p.id !== photoId));
      if (heroPhotoId === photoId) {
        setHeroPhotoId(null);
      }
      setMessage({ type: 'success', text: 'Photo deleted' });
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete photo' });
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-light text-gray-800">Photos</h1>
        <p className="text-gray-600 mt-1">
          Upload and manage photos for this memorial (max 50 photos)
        </p>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-md ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <label
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
            isUploading
              ? 'border-gray-300 bg-gray-50'
              : 'border-gray-300 hover:border-teal-500 hover:bg-teal-50'
          }`}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-8 h-8 text-gray-400 animate-spin mb-2" />
              <span className="text-gray-500">Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-gray-500">Click to upload photos</span>
              <span className="text-sm text-gray-400 mt-1">
                JPG, PNG, or GIF up to 10MB each
              </span>
            </>
          )}
          <input
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            disabled={isUploading || photos.length >= 50}
          />
        </label>
        <p className="text-sm text-gray-500 mt-2 text-center">
          {photos.length}/50 photos uploaded
        </p>
      </div>

      {photos.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No photos uploaded yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative group bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              <div className="aspect-square relative">
                <img
                  src={getPhotoUrl(photo.storage_path)}
                  alt={photo.caption || 'Memorial photo'}
                  className="w-full h-full object-cover"
                />
                {heroPhotoId === photo.id && (
                  <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Hero
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => handleSetHero(photo.id)}
                  className="p-2 bg-white rounded-full text-gray-700 hover:bg-yellow-100 hover:text-yellow-600 transition-colors"
                  title="Set as hero photo"
                >
                  <Star className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(photo.id)}
                  className="p-2 bg-white rounded-full text-gray-700 hover:bg-red-100 hover:text-red-600 transition-colors"
                  title="Delete photo"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button
                  className="p-2 bg-white rounded-full text-gray-700 cursor-grab"
                  title="Drag to reorder"
                >
                  <GripVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

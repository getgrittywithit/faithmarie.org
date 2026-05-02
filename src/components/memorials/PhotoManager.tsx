'use client';

import { useState } from 'react';
import { Trash2, Star, GripVertical, X, Loader2 } from 'lucide-react';
import { deletePhoto, getPhotoUrl } from '@/lib/storage/photos';
import type { MemorialPhoto } from '@/lib/supabase/types';

interface PhotoManagerProps {
  photos: MemorialPhoto[];
  heroPhotoId: string | null;
  onReorder: (photos: MemorialPhoto[]) => void;
  onDelete: (photoId: string) => void;
  onSetHero: (photoId: string) => void;
  onUpdateCaption: (photoId: string, caption: string) => void;
}

export default function PhotoManager({
  photos,
  heroPhotoId,
  onReorder,
  onDelete,
  onSetHero,
  onUpdateCaption,
}: PhotoManagerProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<MemorialPhoto | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [editingCaption, setEditingCaption] = useState<string | null>(null);
  const [captionValue, setCaptionValue] = useState('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDelete = async (photo: MemorialPhoto) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;

    setIsDeleting(photo.id);
    const success = await deletePhoto(photo.storage_path);

    if (success) {
      onDelete(photo.id);
    }
    setIsDeleting(null);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newPhotos = [...photos];
    const draggedPhoto = newPhotos[draggedIndex];
    newPhotos.splice(draggedIndex, 1);
    newPhotos.splice(index, 0, draggedPhoto);

    // Update sort_order
    const reorderedPhotos = newPhotos.map((p, i) => ({
      ...p,
      sort_order: i,
    }));

    onReorder(reorderedPhotos);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const startEditCaption = (photo: MemorialPhoto) => {
    setEditingCaption(photo.id);
    setCaptionValue(photo.caption || '');
  };

  const saveCaption = (photoId: string) => {
    onUpdateCaption(photoId, captionValue);
    setEditingCaption(null);
  };

  return (
    <div className="space-y-4">
      {/* Photo grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {photos.map((photo, index) => {
          const isHero = photo.id === heroPhotoId;
          const url = getPhotoUrl(photo.storage_path);

          return (
            <div
              key={photo.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`relative aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-move group ${
                draggedIndex === index ? 'opacity-50' : ''
              } ${isHero ? 'ring-2 ring-teal-500' : ''}`}
            >
              <img
                src={url}
                alt={photo.caption || ''}
                className="w-full h-full object-cover"
                onClick={() => setSelectedPhoto(photo)}
              />

              {/* Hero badge */}
              {isHero && (
                <div className="absolute top-1 left-1 bg-teal-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Hero
                </div>
              )}

              {/* Drag handle */}
              <div className="absolute top-1 right-1 p-1 bg-black/50 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical className="w-4 h-4" />
              </div>

              {/* Actions overlay */}
              <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => onSetHero(photo.id)}
                    className={`p-1 rounded ${
                      isHero ? 'text-teal-400' : 'text-white hover:text-teal-400'
                    }`}
                    title="Set as hero image"
                  >
                    <Star className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(photo)}
                    disabled={isDeleting === photo.id}
                    className="p-1 text-white hover:text-red-400 disabled:opacity-50"
                    title="Delete photo"
                  >
                    {isDeleting === photo.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Photo detail modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={getPhotoUrl(selectedPhoto.storage_path)}
                alt={selectedPhoto.caption || ''}
                className="w-full"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              {editingCaption === selectedPhoto.id ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={captionValue}
                    onChange={(e) => setCaptionValue(e.target.value)}
                    placeholder="Add a caption..."
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    autoFocus
                  />
                  <button
                    onClick={() => saveCaption(selectedPhoto.id)}
                    className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingCaption(null)}
                    className="text-gray-500 px-4 py-2 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => startEditCaption(selectedPhoto)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {selectedPhoto.caption || 'Add a caption...'}
                </button>
              )}

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => onSetHero(selectedPhoto.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    selectedPhoto.id === heroPhotoId
                      ? 'bg-teal-100 text-teal-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Star className="w-4 h-4" />
                  {selectedPhoto.id === heroPhotoId ? 'Hero Image' : 'Set as Hero'}
                </button>
                <button
                  onClick={() => {
                    handleDelete(selectedPhoto);
                    setSelectedPhoto(null);
                  }}
                  disabled={isDeleting === selectedPhoto.id}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {photos.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          No photos yet. Upload some photos to get started.
        </p>
      )}
    </div>
  );
}

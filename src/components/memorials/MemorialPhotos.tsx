'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { MemorialPhoto } from '@/lib/supabase/types';

interface MemorialPhotosProps {
  photos: MemorialPhoto[];
}

export default function MemorialPhotos({ photos }: MemorialPhotosProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const getPhotoUrl = (path: string) =>
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/memorial-photos/${path}`;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % photos.length);
    }
  };

  const goPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft') goPrev();
  };

  return (
    <section className="py-12 md:py-16 bg-memorial-bg">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="font-serif text-3xl text-gray-800 mb-8 text-center">
          Photos
        </h2>

        {/* Photo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="aspect-square overflow-hidden rounded-lg bg-gray-100 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <img
                src={getPhotoUrl(photo.storage_path)}
                alt={photo.caption || ''}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation */}
          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-4 p-2 text-white/70 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-4 p-2 text-white/70 hover:text-white transition-colors"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            </>
          )}

          {/* Image */}
          <div
            className="max-w-[90vw] max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={getPhotoUrl(photos[lightboxIndex].storage_path)}
              alt={photos[lightboxIndex].caption || ''}
              className="max-w-full max-h-[85vh] object-contain"
            />
            {photos[lightboxIndex].caption && (
              <p className="text-white/80 text-center mt-4 px-4">
                {photos[lightboxIndex].caption}
              </p>
            )}
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightboxIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </section>
  );
}

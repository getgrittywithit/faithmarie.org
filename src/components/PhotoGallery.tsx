'use client';

import Image from 'next/image';
import { useState } from 'react';

// Placeholder images for the MVP - replace these with your actual photos
const photos = [
  {
    id: 1,
    src: '/api/placeholder/400/400',
    alt: 'Faith Marie - precious moment',
    caption: 'Our beautiful Faith Marie'
  },
  {
    id: 2,
    src: '/api/placeholder/400/400',
    alt: 'Faith Marie with family',
    caption: 'Surrounded by love'
  },
  {
    id: 3,
    src: '/api/placeholder/400/400',
    alt: 'Faith Marie peaceful moment',
    caption: 'Peaceful moments'
  },
  {
    id: 4,
    src: '/api/placeholder/400/400',
    alt: 'Faith Marie tiny hands',
    caption: 'Tiny hands, mighty spirit'
  },
  {
    id: 5,
    src: '/api/placeholder/400/400',
    alt: 'Faith Marie family love',
    caption: 'Forever in our hearts'
  },
  {
    id: 6,
    src: '/api/placeholder/400/400',
    alt: 'Faith Marie legacy',
    caption: 'A legacy of love'
  }
];

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="w-full h-full bg-gradient-to-br from-rose-100 to-purple-100 flex items-center justify-center">
              <p className="text-gray-500 text-sm">Photo {photo.id}</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <p className="text-white text-sm">{photo.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(null);
              }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="w-full h-full bg-gradient-to-br from-rose-100 to-purple-100 flex items-center justify-center p-16">
              <p className="text-gray-600 text-lg">Photo {selectedPhoto.id}</p>
            </div>
            <div className="p-6 bg-white">
              <p className="text-lg text-gray-700">{selectedPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
'use client';

import Image from 'next/image';
import { useState } from 'react';

const photos = [
  {
    id: 1,
    src: '/images/190716 025 Faith Marie.jpg',
    alt: 'Faith Marie - precious moment',
    caption: 'Our beautiful Faith Marie'
  },
  {
    id: 2,
    src: '/images/190716 030 Faith Marie.jpg',
    alt: 'Faith Marie with family',
    caption: 'Surrounded by love'
  },
  {
    id: 3,
    src: '/images/190716 032 Faith Marie.jpg',
    alt: 'Faith Marie peaceful moment',
    caption: 'Peaceful moments'
  },
  {
    id: 4,
    src: '/images/190716 035 Faith Marie.jpg',
    alt: 'Faith Marie tiny hands',
    caption: 'Tiny hands, mighty spirit'
  },
  {
    id: 5,
    src: '/images/190716 039 Faith Marie.jpg',
    alt: 'Faith Marie family love',
    caption: 'Forever in our hearts'
  },
  {
    id: 6,
    src: '/images/190716 044 Faith Marie.jpg',
    alt: 'Faith Marie legacy',
    caption: 'A legacy of love'
  },
  {
    id: 7,
    src: '/images/190716 047 Faith Marie.jpg',
    alt: 'Faith Marie precious memories',
    caption: 'Precious memories'
  },
  {
    id: 8,
    src: '/images/190716 051 Faith Marie.jpg',
    alt: 'Faith Marie sweet moments',
    caption: 'Sweet moments together'
  },
  {
    id: 9,
    src: '/images/190716 056 Faith Marie.jpg',
    alt: 'Faith Marie cherished',
    caption: 'Forever cherished'
  },
  {
    id: 10,
    src: '/images/190716 057 Faith Marie.jpg',
    alt: 'Faith Marie loved',
    caption: 'So deeply loved'
  },
  {
    id: 11,
    src: '/images/190716 062 Faith Marie.jpg',
    alt: 'Faith Marie peaceful',
    caption: 'Peace and love'
  },
  {
    id: 12,
    src: '/images/190716 064 Faith Marie.jpg',
    alt: 'Faith Marie beautiful soul',
    caption: 'Beautiful soul'
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
            className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity group"
            onClick={() => setSelectedPhoto(photo)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
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
            <div className="relative w-full h-[70vh]">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
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
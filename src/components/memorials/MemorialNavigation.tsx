'use client';

import Link from 'next/link';

interface MemorialNavigationProps {
  memorialName?: string;
}

export default function MemorialNavigation({ memorialName }: MemorialNavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-memorial-bg/95 backdrop-blur-sm border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <Link
            href="/"
            className="text-lg font-light text-gray-700 hover:text-teal-600 transition-colors"
          >
            Faith Marie Foundation
          </Link>

          {memorialName && (
            <span className="hidden sm:block text-sm text-gray-500 font-serif italic">
              In memory of {memorialName}
            </span>
          )}

          <Link
            href="/crisis-support"
            className="text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            Crisis Support
          </Link>
        </div>
      </div>
    </nav>
  );
}

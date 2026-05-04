'use client';

import Link from 'next/link';

interface MemorialNavigationProps {
  memorialName?: string;
}

export default function MemorialNavigation({ memorialName }: MemorialNavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-warm-cream/95 backdrop-blur-sm border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <Link
            href="/"
            className="font-serif text-lg text-stone-900 hover:text-deep-teal transition-colors"
          >
            FaithMarie.org
          </Link>

          {memorialName && (
            <span className="hidden sm:block text-sm text-stone-600 font-serif italic">
              In memory of {memorialName}
            </span>
          )}

          <Link
            href="/crisis-support"
            className="text-sm text-stone-600 hover:text-rose-900 transition-colors"
          >
            Crisis support
          </Link>
        </div>
      </div>
    </nav>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className="text-xl font-light text-gray-800 hover:text-gray-600 transition-colors"
          >
            Faith Marie
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/our-story" 
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Our Story
            </Link>
            <Link 
              href="/resources" 
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Resources
            </Link>
            <Link 
              href="/support" 
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Find Support
            </Link>
            <Link 
              href="/community" 
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Community
            </Link>
            <Link 
              href="/get-involved" 
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Get Involved
            </Link>
          </div>

          <div className="hidden md:block">
            <Link 
              href="/crisis-support" 
              className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-200 transition-colors"
            >
              Crisis Support
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white">
            <div className="flex flex-col space-y-4">
              <Link href="/our-story" className="text-gray-600 hover:text-gray-800 transition-colors">
                Our Story
              </Link>
              <Link href="/resources" className="text-gray-600 hover:text-gray-800 transition-colors">
                Resources
              </Link>
              <Link href="/support" className="text-gray-600 hover:text-gray-800 transition-colors">
                Find Support
              </Link>
              <Link href="/community" className="text-gray-600 hover:text-gray-800 transition-colors">
                Community
              </Link>
              <Link href="/get-involved" className="text-gray-600 hover:text-gray-800 transition-colors">
                Get Involved
              </Link>
              <Link 
                href="/crisis-support" 
                className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-200 transition-colors w-fit"
              >
                Crisis Support
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
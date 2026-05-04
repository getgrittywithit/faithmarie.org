'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CrisisWidget() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Expanded Panel */}
      {isExpanded && (
        <div className="mb-3 bg-white rounded-lg shadow-xl border border-stone-200 p-4 w-72 animate-in slide-in-from-bottom-2">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-serif font-semibold text-stone-900">Need support?</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-stone-400 hover:text-stone-600"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-3">
            <a
              href="tel:988"
              className="flex items-center gap-3 p-3 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"
            >
              <div className="w-10 h-10 bg-rose-900 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-rose-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-rose-900 text-lg">988</div>
                <div className="text-xs text-rose-900/70">Suicide & Crisis Lifeline</div>
              </div>
            </a>

            <a
              href="sms:741741&body=HOME"
              className="flex items-center gap-3 p-3 bg-soft-aqua/30 rounded-lg hover:bg-soft-aqua/50 transition-colors"
            >
              <div className="w-10 h-10 bg-deep-teal rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-forest-teal">Text HOME to 741741</div>
                <div className="text-xs text-forest-teal/70">Crisis Text Line</div>
              </div>
            </a>

            <Link
              href="/crisis-support"
              className="block text-center text-sm text-deep-teal hover:text-forest-teal py-2 underline"
            >
              View all crisis resources
            </Link>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all ${
          isExpanded
            ? 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            : 'bg-rose-900 text-rose-50 hover:bg-rose-800'
        }`}
        aria-label={isExpanded ? 'Close crisis support' : 'Get crisis support'}
      >
        {isExpanded ? (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            <span className="font-medium">Close</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="font-medium">Get help</span>
            <span className="bg-rose-50/20 px-2 py-0.5 rounded text-sm font-bold">988</span>
          </>
        )}
      </button>
    </div>
  );
}

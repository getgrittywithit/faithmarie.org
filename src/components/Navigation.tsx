'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [researchDropdown, setResearchDropdown] = useState(false);
  const [toolsDropdown, setToolsDropdown] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-xl font-light text-gray-800 hover:text-teal-600 transition-colors"
          >
            Faith Marie Foundation
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {/* Research Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setResearchDropdown(true)}
              onMouseLeave={() => setResearchDropdown(false)}
            >
              <button className="flex items-center text-gray-600 hover:text-teal-600 transition-colors">
                Research
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {researchDropdown && (
                <div className="absolute top-full left-0 pt-2 w-48">
                  <div className="bg-white rounded-md shadow-lg border border-gray-100 py-2">
                    <Link
                      href="/research"
                      className="block px-4 py-2 text-gray-600 hover:bg-teal-50 hover:text-teal-700"
                    >
                      Overview
                    </Link>
                    <Link
                      href="/research/daily-digests"
                      className="block px-4 py-2 text-gray-600 hover:bg-teal-50 hover:text-teal-700"
                    >
                      Daily Digests
                    </Link>
                    <Link
                      href="/research/topics"
                      className="block px-4 py-2 text-gray-600 hover:bg-teal-50 hover:text-teal-700"
                    >
                      Topics
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setToolsDropdown(true)}
              onMouseLeave={() => setToolsDropdown(false)}
            >
              <button className="flex items-center text-gray-600 hover:text-teal-600 transition-colors">
                Tools
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {toolsDropdown && (
                <div className="absolute top-full left-0 pt-2 w-48">
                  <div className="bg-white rounded-md shadow-lg border border-gray-100 py-2">
                    <Link
                      href="/tools/chatbot"
                      className="block px-4 py-2 text-gray-600 hover:bg-teal-50 hover:text-teal-700"
                    >
                      AI Chatbot
                    </Link>
                    <Link
                      href="/knowledge-base"
                      className="block px-4 py-2 text-gray-600 hover:bg-teal-50 hover:text-teal-700"
                    >
                      Knowledge Base
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/our-story"
              className="text-gray-600 hover:text-teal-600 transition-colors"
            >
              Our Story
            </Link>
            <Link
              href="/get-involved"
              className="text-gray-600 hover:text-teal-600 transition-colors"
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
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white">
            <div className="flex flex-col space-y-4">
              {/* Research Section */}
              <div className="space-y-2">
                <span className="text-sm font-medium text-teal-700 uppercase tracking-wide">Research</span>
                <Link href="/research" className="block pl-4 text-gray-600 hover:text-teal-600 transition-colors">
                  Overview
                </Link>
                <Link href="/research/daily-digests" className="block pl-4 text-gray-600 hover:text-teal-600 transition-colors">
                  Daily Digests
                </Link>
                <Link href="/research/topics" className="block pl-4 text-gray-600 hover:text-teal-600 transition-colors">
                  Topics
                </Link>
              </div>

              {/* Tools Section */}
              <div className="space-y-2">
                <span className="text-sm font-medium text-teal-700 uppercase tracking-wide">Tools</span>
                <Link href="/tools/chatbot" className="block pl-4 text-gray-600 hover:text-teal-600 transition-colors">
                  AI Chatbot
                </Link>
                <Link href="/knowledge-base" className="block pl-4 text-gray-600 hover:text-teal-600 transition-colors">
                  Knowledge Base
                </Link>
              </div>

              <Link href="/our-story" className="text-gray-600 hover:text-teal-600 transition-colors">
                Our Story
              </Link>
              <Link href="/get-involved" className="text-gray-600 hover:text-teal-600 transition-colors">
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

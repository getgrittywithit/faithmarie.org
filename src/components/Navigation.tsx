'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [researchDropdown, setResearchDropdown] = useState(false);
  const [toolsDropdown, setToolsDropdown] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-warm-cream/95 backdrop-blur-sm border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="font-serif text-xl text-stone-900 hover:text-deep-teal transition-colors"
          >
            FaithMarie.org
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {/* Learn Link */}
            <Link
              href="/learn"
              className="text-stone-700 hover:text-deep-teal transition-colors"
            >
              Learn
            </Link>

            {/* Research Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setResearchDropdown(true)}
              onMouseLeave={() => setResearchDropdown(false)}
            >
              <button className="flex items-center text-stone-700 hover:text-deep-teal transition-colors">
                Research
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {researchDropdown && (
                <div className="absolute top-full left-0 pt-2 w-48">
                  <div className="bg-white rounded-lg shadow-lg border border-stone-200 py-2">
                    <Link
                      href="/research"
                      className="block px-4 py-2 text-stone-700 hover:bg-soft-aqua/20 hover:text-deep-teal"
                    >
                      Overview
                    </Link>
                    <Link
                      href="/research/daily-digests"
                      className="block px-4 py-2 text-stone-700 hover:bg-soft-aqua/20 hover:text-deep-teal"
                    >
                      Research summaries
                    </Link>
                    <Link
                      href="/research/topics"
                      className="block px-4 py-2 text-stone-700 hover:bg-soft-aqua/20 hover:text-deep-teal"
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
              <button className="flex items-center text-stone-700 hover:text-deep-teal transition-colors">
                Tools
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {toolsDropdown && (
                <div className="absolute top-full left-0 pt-2 w-48">
                  <div className="bg-white rounded-lg shadow-lg border border-stone-200 py-2">
                    <Link
                      href="/assessments"
                      className="block px-4 py-2 text-stone-700 hover:bg-soft-aqua/20 hover:text-deep-teal"
                    >
                      Self-assessments
                    </Link>
                    <Link
                      href="/tools/chatbot"
                      className="block px-4 py-2 text-stone-700 hover:bg-soft-aqua/20 hover:text-deep-teal"
                    >
                      Resource guide
                    </Link>
                    <Link
                      href="/knowledge-base"
                      className="block px-4 py-2 text-stone-700 hover:bg-soft-aqua/20 hover:text-deep-teal"
                    >
                      Knowledge base
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAboutDropdown(true)}
              onMouseLeave={() => setAboutDropdown(false)}
            >
              <button className="flex items-center text-stone-700 hover:text-deep-teal transition-colors">
                About
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {aboutDropdown && (
                <div className="absolute top-full left-0 pt-2 w-48">
                  <div className="bg-white rounded-lg shadow-lg border border-stone-200 py-2">
                    <Link
                      href="/about"
                      className="block px-4 py-2 text-stone-700 hover:bg-soft-aqua/20 hover:text-deep-teal"
                    >
                      About us
                    </Link>
                    <Link
                      href="/our-story"
                      className="block px-4 py-2 text-stone-700 hover:bg-soft-aqua/20 hover:text-deep-teal"
                    >
                      Our story
                    </Link>
                    <Link
                      href="/about/team"
                      className="block px-4 py-2 text-stone-700 hover:bg-soft-aqua/20 hover:text-deep-teal"
                    >
                      Our team
                    </Link>
                    <Link
                      href="/about/impact"
                      className="block px-4 py-2 text-stone-700 hover:bg-soft-aqua/20 hover:text-deep-teal"
                    >
                      Impact & roadmap
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/get-involved"
              className="text-stone-700 hover:text-deep-teal transition-colors"
            >
              Get involved
            </Link>
            <Link
              href="/memorials/create"
              className="text-stone-700 hover:text-deep-teal transition-colors"
            >
              In memory
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/find-help"
              className="bg-deep-teal text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-forest-teal transition-colors"
            >
              Find help
            </Link>
            <Link
              href="/crisis-support"
              className="bg-rose-50 text-rose-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-rose-100 transition-colors"
            >
              Crisis support
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-stone-700"
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
          <div className="md:hidden py-4 border-t border-stone-200 bg-warm-cream">
            <div className="flex flex-col space-y-4">
              {/* Learn Link */}
              <Link href="/learn" className="text-stone-700 hover:text-deep-teal transition-colors font-medium">
                Learn
              </Link>

              {/* Research Section */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-deep-teal uppercase tracking-wide">Research</span>
                <Link href="/research" className="block pl-4 text-stone-700 hover:text-deep-teal transition-colors">
                  Overview
                </Link>
                <Link href="/research/daily-digests" className="block pl-4 text-stone-700 hover:text-deep-teal transition-colors">
                  Research summaries
                </Link>
                <Link href="/research/topics" className="block pl-4 text-stone-700 hover:text-deep-teal transition-colors">
                  Topics
                </Link>
              </div>

              {/* Tools Section */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-deep-teal uppercase tracking-wide">Tools</span>
                <Link href="/assessments" className="block pl-4 text-stone-700 hover:text-deep-teal transition-colors">
                  Self-assessments
                </Link>
                <Link href="/tools/chatbot" className="block pl-4 text-stone-700 hover:text-deep-teal transition-colors">
                  Resource guide
                </Link>
                <Link href="/knowledge-base" className="block pl-4 text-stone-700 hover:text-deep-teal transition-colors">
                  Knowledge base
                </Link>
              </div>

              {/* About Section */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-deep-teal uppercase tracking-wide">About</span>
                <Link href="/about" className="block pl-4 text-stone-700 hover:text-deep-teal transition-colors">
                  About us
                </Link>
                <Link href="/our-story" className="block pl-4 text-stone-700 hover:text-deep-teal transition-colors">
                  Our story
                </Link>
                <Link href="/about/team" className="block pl-4 text-stone-700 hover:text-deep-teal transition-colors">
                  Our team
                </Link>
                <Link href="/about/impact" className="block pl-4 text-stone-700 hover:text-deep-teal transition-colors">
                  Impact & roadmap
                </Link>
              </div>
              <Link href="/get-involved" className="text-stone-700 hover:text-deep-teal transition-colors">
                Get involved
              </Link>
              <Link href="/memorials/create" className="text-stone-700 hover:text-deep-teal transition-colors">
                In memory
              </Link>
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  href="/find-help"
                  className="bg-deep-teal text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-forest-teal transition-colors w-fit"
                >
                  Find help
                </Link>
                <Link
                  href="/crisis-support"
                  className="bg-rose-50 text-rose-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-rose-100 transition-colors w-fit"
                >
                  Crisis support
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

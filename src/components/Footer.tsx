'use client';

import Link from 'next/link';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  return (
    <footer className="bg-teal-50 border-t border-teal-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-light text-gray-800">Faith Marie Foundation</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              Helping every family navigating grief and mental health find the resources and guidance they need.
            </p>
            <p className="text-sm text-teal-700 font-medium">
              In memory of Faith Marie Moses
            </p>
            <div className="pt-2">
              <p className="text-sm font-medium text-gray-700 mb-2">Stay updated:</p>
              <NewsletterForm variant="compact" />
            </div>
          </div>

          {/* Research Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-800 uppercase tracking-wide">Research</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/research" className="text-gray-600 hover:text-teal-700 transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/research/daily-digests" className="text-gray-600 hover:text-teal-700 transition-colors">
                  Research Summaries
                </Link>
              </li>
              <li>
                <Link href="/research/topics" className="text-gray-600 hover:text-teal-700 transition-colors">
                  Topics
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools & Resources Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-800 uppercase tracking-wide">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/learn" className="text-gray-600 hover:text-teal-700 transition-colors">
                  Learn About Mental Health
                </Link>
              </li>
              <li>
                <Link href="/tools/chatbot" className="text-gray-600 hover:text-teal-700 transition-colors">
                  Resource Guide
                </Link>
              </li>
              <li>
                <Link href="/knowledge-base" className="text-gray-600 hover:text-teal-700 transition-colors">
                  Knowledge Base
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Crisis */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-800 uppercase tracking-wide">About</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/our-story" className="text-gray-600 hover:text-teal-700 transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/about/team" className="text-gray-600 hover:text-teal-700 transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-teal-700 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about/impact" className="text-gray-600 hover:text-teal-700 transition-colors">
                  Impact & Roadmap
                </Link>
              </li>
              <li>
                <Link href="/get-involved" className="text-gray-600 hover:text-teal-700 transition-colors">
                  Get Involved
                </Link>
              </li>
            </ul>
            <div className="pt-4">
              <Link
                href="/crisis-support"
                className="inline-block bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Crisis Support
              </Link>
            </div>
          </div>
        </div>

        {/* Crisis Hotline Banner */}
        <div className="mt-12 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
          <p className="text-sm text-gray-700">
            <span className="text-red-700 font-medium">If you&apos;re in crisis:</span>{' '}
            Call or text <span className="font-semibold">988</span> (Suicide & Crisis Lifeline)
            {' '}or text <span className="font-semibold">HOME</span> to <span className="font-semibold">741741</span> (Crisis Text Line)
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-teal-200 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Faith Marie Foundation. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-teal-700 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-teal-700 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

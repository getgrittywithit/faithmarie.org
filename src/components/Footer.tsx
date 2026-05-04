'use client';

import Link from 'next/link';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  return (
    <footer className="bg-forest-teal">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl text-stone-50">FaithMarie.org</h3>
            <p className="text-sm leading-relaxed text-stone-50/80">
              Making mental health and grief education clearer, kinder, and easier to act on.
            </p>
            <p className="text-sm text-light-champagne">
              In memory of Faith Marie
            </p>
            <div className="pt-2">
              <p className="text-sm font-medium text-stone-50/90 mb-2">Stay updated:</p>
              <NewsletterForm variant="compact" />
            </div>
          </div>

          {/* Research Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-stone-50/60 uppercase tracking-wide">Research</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/research" className="text-stone-50/80 hover:text-stone-50 transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/research/daily-digests" className="text-stone-50/80 hover:text-stone-50 transition-colors">
                  Research summaries
                </Link>
              </li>
              <li>
                <Link href="/research/topics" className="text-stone-50/80 hover:text-stone-50 transition-colors">
                  Topics
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools & Resources Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-stone-50/60 uppercase tracking-wide">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/learn" className="text-stone-50/80 hover:text-stone-50 transition-colors">
                  Learn about mental health
                </Link>
              </li>
              <li>
                <Link href="/tools/chatbot" className="text-stone-50/80 hover:text-stone-50 transition-colors">
                  Resource guide
                </Link>
              </li>
              <li>
                <Link href="/knowledge-base" className="text-stone-50/80 hover:text-stone-50 transition-colors">
                  Knowledge base
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Crisis */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-stone-50/60 uppercase tracking-wide">About</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/our-story" className="text-stone-50/80 hover:text-stone-50 transition-colors">
                  Our story
                </Link>
              </li>
              <li>
                <Link href="/about/team" className="text-stone-50/80 hover:text-stone-50 transition-colors">
                  Our team
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-stone-50/80 hover:text-stone-50 transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/about/impact" className="text-stone-50/80 hover:text-stone-50 transition-colors">
                  Impact & roadmap
                </Link>
              </li>
              <li>
                <Link href="/get-involved" className="text-stone-50/80 hover:text-stone-50 transition-colors">
                  Get involved
                </Link>
              </li>
            </ul>
            <div className="pt-4">
              <Link
                href="/crisis-support"
                className="inline-block bg-rose-900 text-rose-50 px-4 py-2 rounded-lg text-sm font-medium hover:bg-rose-800 transition-colors"
              >
                Crisis support
              </Link>
            </div>
          </div>
        </div>

        {/* Crisis Hotline Banner */}
        <div className="mt-12 p-4 bg-rose-900/20 border border-rose-900/30 rounded-lg text-center">
          <p className="text-sm text-stone-50">
            <span className="text-rose-50 font-medium">If you&apos;re in crisis:</span>{' '}
            Call or text <a href="tel:988" className="font-semibold underline">988</a> (Suicide & Crisis Lifeline)
            {' '}or text <span className="font-semibold">HOME</span> to <a href="sms:741741&body=HOME" className="font-semibold underline">741741</a> (Crisis Text Line)
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-50/20 flex flex-col md:flex-row justify-between items-center text-sm text-stone-50/60">
          <p>&copy; {new Date().getFullYear()} Faith Marie Foundation. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-stone-50 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-stone-50 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-light text-white">Faith Marie Foundation</h3>
            <p className="text-sm leading-relaxed">
              Advancing mental health research through AI — making the latest findings accessible to everyone.
            </p>
            <p className="text-sm text-teal-400">
              In memory of Faith Marie Moses
            </p>
          </div>

          {/* Research Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-white uppercase tracking-wide">Research</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/research" className="hover:text-teal-400 transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/research/daily-digests" className="hover:text-teal-400 transition-colors">
                  Daily Digests
                </Link>
              </li>
              <li>
                <Link href="/research/topics" className="hover:text-teal-400 transition-colors">
                  Topics
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-white uppercase tracking-wide">Tools</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools/chatbot" className="hover:text-teal-400 transition-colors">
                  AI Chatbot
                </Link>
              </li>
              <li>
                <Link href="/knowledge-base" className="hover:text-teal-400 transition-colors">
                  Knowledge Base
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Crisis */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-white uppercase tracking-wide">About</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/our-story" className="hover:text-teal-400 transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/get-involved" className="hover:text-teal-400 transition-colors">
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
        <div className="mt-12 p-4 bg-gray-800 rounded-lg text-center">
          <p className="text-sm">
            <span className="text-red-400 font-medium">If you&apos;re in crisis:</span>{' '}
            Call or text <span className="text-white font-medium">988</span> (Suicide & Crisis Lifeline)
            {' '}or text <span className="text-white font-medium">HOME</span> to <span className="text-white font-medium">741741</span> (Crisis Text Line)
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} Faith Marie Foundation. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-teal-400 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-teal-400 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

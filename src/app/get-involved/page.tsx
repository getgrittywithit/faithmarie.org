import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: "Get Involved | Faith Marie Foundation",
  description: "Join our mission to make mental health research accessible to everyone. Donate, volunteer, or spread awareness.",
};

export default function GetInvolvedPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-light text-gray-800 mb-6">
              Get Involved
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Help us make mental health research accessible to everyone. Your support directly powers
              our AI research teams and the tools that help people heal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Donate</h2>
              <p className="text-gray-600 mb-6">
                Your donation powers our AI infrastructure, research operations, and the development
                of tools that make mental health support accessible to everyone who needs it.
              </p>
              <button className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-colors">
                Make a Donation
              </button>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Stay Updated</h2>
              <p className="text-gray-600 mb-6">
                Be the first to know when we launch new features, publish research digests, or need
                support. Join our community of people committed to mental health accessibility.
              </p>
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors">
                Join the Newsletter
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Volunteer</h2>
              <p className="text-gray-600 mb-6">
                We&apos;re looking for mental health professionals, researchers, writers, and tech
                volunteers to help review content, improve our tools, and expand our reach.
              </p>
              <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors">
                Apply to Volunteer
              </button>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Partner With Us</h2>
              <p className="text-gray-600 mb-6">
                Are you a mental health organization, university, or company interested in partnering?
                We&apos;d love to explore how we can work together to expand access to research.
              </p>
              <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors">
                Contact Us
              </button>
            </div>
          </div>

          <div className="bg-teal-50 p-8 rounded-lg text-center mb-12">
            <h2 className="text-2xl font-medium text-gray-800 mb-4">Spread the Word</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Help others find the resources they need by sharing Faith Marie Foundation with your network.
              Every share helps someone discover accessible mental health research.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Share on Facebook
              </button>
              <button className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Share on X
              </button>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Share on LinkedIn
              </button>
            </div>
          </div>

          {/* How Funds Are Used */}
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-medium text-gray-800 mb-6 text-center">How Your Support Is Used</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium text-gray-800 mb-4">AI Infrastructure & Research</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Computing resources, API costs, and tools that power our AI research teams scanning
                  thousands of papers daily.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-4">Platform Development</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Building and maintaining faithmarie.org, the AI chatbot, knowledge base, and
                  resource finder tools.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-4">Operations & Administration</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Nonprofit administration, legal compliance, accounting, and keeping the foundation running smoothly.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-4">Outreach & Awareness</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Reaching people who need these tools and resources, and connecting with the mental health community.
                </p>
              </div>
            </div>
          </div>

          {/* Faith Marie Note */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 italic max-w-2xl mx-auto">
              &quot;Every contribution, no matter how small, helps extend Faith Marie&apos;s legacy —
              ensuring that no one has to navigate mental health challenges without accessible, modern support.&quot;
            </p>
            <Link href="/our-story" className="inline-block mt-4 text-teal-600 hover:text-teal-700">
              Read Faith Marie&apos;s Story →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

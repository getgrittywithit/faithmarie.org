import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: "Knowledge Base | Faith Marie Foundation",
  description: "A searchable library of synthesized mental health research organized by topic, condition, and practical application.",
};

export default function KnowledgeBasePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-teal-50 to-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
              Knowledge Base
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A searchable, public library of synthesized research — organized by topic, condition,
              and practical application — so anyone can access the latest understanding of mental
              health in plain language.
            </p>
          </div>
        </section>

        {/* Search Bar */}
        <section className="py-8 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search the knowledge base... (coming soon)"
                  disabled
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Topic Categories */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-medium text-gray-800 mb-8">Browse by Topic</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link
                href="/research/topics/grief"
                className="p-6 bg-amber-50 rounded-lg border border-amber-100 hover:shadow-md hover:border-amber-200 transition-all group"
              >
                <div className="text-3xl mb-4">💔</div>
                <h3 className="font-medium text-gray-800 group-hover:text-amber-700 transition-colors">Grief & Loss</h3>
                <p className="text-sm text-gray-600 mt-2">Research on bereavement, complicated grief, and child loss</p>
              </Link>

              <Link
                href="/research/topics/ptsd"
                className="p-6 bg-red-50 rounded-lg border border-red-100 hover:shadow-md hover:border-red-200 transition-all group"
              >
                <div className="text-3xl mb-4">🛡️</div>
                <h3 className="font-medium text-gray-800 group-hover:text-red-700 transition-colors">PTSD & Trauma</h3>
                <p className="text-sm text-gray-600 mt-2">Research on trauma processing and PTSD treatment</p>
              </Link>

              <Link
                href="/research/topics/depression"
                className="p-6 bg-blue-50 rounded-lg border border-blue-100 hover:shadow-md hover:border-blue-200 transition-all group"
              >
                <div className="text-3xl mb-4">🌧️</div>
                <h3 className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors">Depression</h3>
                <p className="text-sm text-gray-600 mt-2">Research on clinical depression and treatment options</p>
              </Link>

              <Link
                href="/research/topics/anxiety"
                className="p-6 bg-purple-50 rounded-lg border border-purple-100 hover:shadow-md hover:border-purple-200 transition-all group"
              >
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="font-medium text-gray-800 group-hover:text-purple-700 transition-colors">Anxiety</h3>
                <p className="text-sm text-gray-600 mt-2">Research on anxiety disorders and management</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Coming Soon */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-block bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Building Our Library
            </div>
            <h2 className="text-3xl font-light text-gray-800 mb-4">Knowledge Base Coming Soon</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              As our AI research teams produce daily digests and reports, we&apos;re building a comprehensive,
              searchable library of synthesized research. Soon you&apos;ll be able to find answers to your
              specific questions, explore topics in depth, and access practical guidance backed by science.
            </p>

            <div className="bg-white rounded-lg p-8 max-w-2xl mx-auto shadow-sm">
              <h3 className="font-medium text-gray-800 mb-4">What the Knowledge Base Will Include:</h3>
              <ul className="text-left text-gray-600 space-y-3">
                <li className="flex items-start">
                  <span className="text-teal-500 mr-3">•</span>
                  <span>Searchable research summaries on hundreds of mental health topics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-3">•</span>
                  <span>Practical guides based on the latest evidence</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-3">•</span>
                  <span>FAQ sections addressing common questions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-3">•</span>
                  <span>Links to original research for those who want to go deeper</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-3">•</span>
                  <span>Regular updates as new research emerges</span>
                </li>
              </ul>
            </div>

            <div className="mt-12">
              <Link
                href="/get-involved"
                className="inline-block bg-teal-600 text-white px-8 py-4 rounded-md text-lg hover:bg-teal-700 transition-colors"
              >
                Get Notified When We Launch
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

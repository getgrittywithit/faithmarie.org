import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import NewsletterForm from '@/components/NewsletterForm';
import Link from 'next/link';

export const metadata = {
  title: "Daily Digests | Faith Marie Foundation",
  description: "Daily AI-generated research summaries on mental health topics including grief, PTSD, depression, and anxiety.",
};

export default function DailyDigestsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 bg-white">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-teal-50 to-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
              Daily Research Digests
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fresh summaries of the latest mental health research, published every day and translated into plain language.
            </p>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="py-6 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                All Topics
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors">
                Grief & Loss
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors">
                PTSD & Trauma
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors">
                Depression
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors">
                Anxiety
              </button>
            </div>
          </div>
        </section>

        {/* Digests List */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            {/* Coming Soon State */}
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-medium text-gray-800 mb-4">Daily Digests Coming Soon</h2>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                Our AI research teams are being trained and calibrated. Soon, fresh research digests will be
                published here every day.
              </p>

              <div className="bg-gray-50 rounded-lg p-8 max-w-2xl mx-auto">
                <h3 className="font-medium text-gray-800 mb-4">What to expect:</h3>
                <ul className="text-left text-gray-600 space-y-3">
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-3">•</span>
                    <span>Daily summaries of new research papers across all mental health topics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-3">•</span>
                    <span>Plain language explanations of complex findings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-3">•</span>
                    <span>Practical implications for people navigating mental health challenges</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-3">•</span>
                    <span>Links to original sources for those who want to dive deeper</span>
                  </li>
                </ul>
              </div>

              <div className="mt-12 max-w-md mx-auto">
                <p className="text-gray-700 font-medium mb-4">Get notified when we launch:</p>
                <NewsletterForm variant="full" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

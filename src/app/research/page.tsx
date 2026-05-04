import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: "Research Library | Faith Marie Foundation",
  description: "Mental health research made accessible. Research summaries, guides, and a curated library on grief, PTSD, depression, and anxiety.",
};

export default function ResearchPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 bg-warm-cream">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-soft-aqua/30 to-warm-cream">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-6xl text-stone-900 mb-6">
              Research library
            </h1>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              We read the research so you don&apos;t have to — translating complex findings
              into plain-language summaries anyone can understand.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-serif text-3xl text-center text-stone-900 mb-12">How we create our research library</h2>

            <div className="grid md:grid-cols-5 gap-4">
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-soft-aqua/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-deep-teal font-medium">1</span>
                </div>
                <h3 className="font-medium text-stone-900 mb-2">Scan</h3>
                <p className="text-sm text-stone-600">Monitor academic databases and publications for new research</p>
              </div>

              <div className="text-center p-6">
                <div className="w-12 h-12 bg-soft-aqua/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-deep-teal font-medium">2</span>
                </div>
                <h3 className="font-medium text-stone-900 mb-2">Analyze</h3>
                <p className="text-sm text-stone-600">Evaluate and extract key findings from relevant papers</p>
              </div>

              <div className="text-center p-6">
                <div className="w-12 h-12 bg-soft-aqua/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-deep-teal font-medium">3</span>
                </div>
                <h3 className="font-medium text-stone-900 mb-2">Translate</h3>
                <p className="text-sm text-stone-600">Convert academic language into accessible summaries</p>
              </div>

              <div className="text-center p-6">
                <div className="w-12 h-12 bg-soft-aqua/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-deep-teal font-medium">4</span>
                </div>
                <h3 className="font-medium text-stone-900 mb-2">Review</h3>
                <p className="text-sm text-stone-600">Verify accuracy and ensure quality before publishing</p>
              </div>

              <div className="text-center p-6">
                <div className="w-12 h-12 bg-soft-aqua/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-deep-teal font-medium">5</span>
                </div>
                <h3 className="font-medium text-stone-900 mb-2">Publish</h3>
                <p className="text-sm text-stone-600">Share summaries and add to our searchable library</p>
              </div>
            </div>
          </div>
        </section>

        {/* Research Sections */}
        <section className="py-16 bg-stone-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Research Summaries */}
              <Link
                href="/research/daily-digests"
                className="bg-white p-8 rounded-lg border border-stone-200 hover:border-deep-teal transition-all group"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-soft-aqua/30 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-deep-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-stone-900 group-hover:text-deep-teal transition-colors">Research summaries</h3>
                </div>
                <p className="text-stone-600 mb-4">
                  Fresh research summaries published regularly. Stay up-to-date with the latest findings
                  in mental health research, translated into plain language.
                </p>
                <span className="text-deep-teal font-medium">View summaries →</span>
              </Link>

              {/* Topics */}
              <Link
                href="/research/topics"
                className="bg-white p-8 rounded-lg border border-stone-200 hover:border-deep-teal transition-all group"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-soft-aqua/30 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-deep-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-stone-900 group-hover:text-deep-teal transition-colors">Browse by topic</h3>
                </div>
                <p className="text-stone-600 mb-4">
                  Explore research organized by topic. Find resources focused specifically on
                  grief, PTSD, depression, or anxiety.
                </p>
                <span className="text-deep-teal font-medium">Explore topics →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Topic Areas */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-serif text-3xl text-center text-stone-900 mb-4">Topics we cover</h2>
            <p className="text-center text-stone-600 mb-12">Focused resources for each area of mental health</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link
                href="/research/topics/grief"
                className="p-6 bg-light-champagne/30 rounded-lg border border-champagne-gold/30 hover:border-champagne-gold transition-all group"
              >
                <div className="text-3xl mb-4">💔</div>
                <h3 className="font-medium text-stone-900 group-hover:text-deep-champagne transition-colors">Grief & loss</h3>
                <p className="text-sm text-stone-600 mt-2">Child loss, complicated grief, bereavement</p>
                <p className="text-xs text-champagne-gold mt-4 font-medium">Explore resources →</p>
              </Link>

              <Link
                href="/research/topics/ptsd"
                className="p-6 bg-rose-50 rounded-lg border border-rose-200 hover:border-rose-300 transition-all group"
              >
                <div className="text-3xl mb-4">🛡️</div>
                <h3 className="font-medium text-stone-900 group-hover:text-rose-900 transition-colors">PTSD & trauma</h3>
                <p className="text-sm text-stone-600 mt-2">Medical trauma, CPTSD, childhood trauma</p>
                <p className="text-xs text-rose-700 mt-4 font-medium">Explore resources →</p>
              </Link>

              <Link
                href="/research/topics/depression"
                className="p-6 bg-soft-aqua/20 rounded-lg border border-soft-aqua/50 hover:border-deep-teal transition-all group"
              >
                <div className="text-3xl mb-4">🌧️</div>
                <h3 className="font-medium text-stone-900 group-hover:text-deep-teal transition-colors">Depression</h3>
                <p className="text-sm text-stone-600 mt-2">Clinical depression, treatment-resistant, SAD</p>
                <p className="text-xs text-deep-teal mt-4 font-medium">Explore resources →</p>
              </Link>

              <Link
                href="/research/topics/anxiety"
                className="p-6 bg-vibrant-teal/10 rounded-lg border border-vibrant-teal/30 hover:border-vibrant-teal transition-all group"
              >
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="font-medium text-stone-900 group-hover:text-deep-teal transition-colors">Anxiety</h3>
                <p className="text-sm text-stone-600 mt-2">Generalized anxiety, social anxiety, panic</p>
                <p className="text-xs text-vibrant-teal mt-4 font-medium">Explore resources →</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Coming Soon Notice */}
        <section className="py-16 bg-soft-aqua/30">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-block bg-white text-deep-teal px-4 py-2 rounded-full text-sm font-medium mb-6">
              Growing library
            </div>
            <h2 className="font-serif text-3xl text-stone-900 mb-4">We&apos;re building our library</h2>
            <p className="text-stone-600 mb-8 max-w-2xl mx-auto">
              We&apos;re continuously adding new research summaries, guides, and resources.
              Sign up to be notified when new content is published.
            </p>
            <Link
              href="/get-involved"
              className="inline-block bg-deep-teal text-white px-8 py-4 rounded-lg text-lg hover:bg-forest-teal transition-colors"
            >
              Get notified of updates
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

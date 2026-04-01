import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: "Research | Faith Marie Foundation",
  description: "AI-powered mental health research made accessible. Daily digests, deep dives, and a searchable knowledge base on grief, PTSD, depression, and anxiety.",
};

export default function ResearchPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 bg-white">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-teal-50 to-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-light text-gray-800 mb-6">
              AI-Powered Research
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our autonomous AI teams scan thousands of research papers daily, translating complex findings
              into actionable insights for everyone.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-light text-center text-gray-800 mb-12">How Our AI Research Works</h2>

            <div className="grid md:grid-cols-5 gap-4">
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-teal-700 font-medium">1</span>
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Scan</h3>
                <p className="text-sm text-gray-600">Monitor academic databases and publications for new research</p>
              </div>

              <div className="text-center p-6">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-teal-700 font-medium">2</span>
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Analyze</h3>
                <p className="text-sm text-gray-600">Evaluate and extract key findings from relevant papers</p>
              </div>

              <div className="text-center p-6">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-teal-700 font-medium">3</span>
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Synthesize</h3>
                <p className="text-sm text-gray-600">Translate academic language into accessible summaries</p>
              </div>

              <div className="text-center p-6">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-teal-700 font-medium">4</span>
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Publish</h3>
                <p className="text-sm text-gray-600">Release daily digests and contribute to the knowledge base</p>
              </div>

              <div className="text-center p-6">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-teal-700 font-medium">5</span>
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Report</h3>
                <p className="text-sm text-gray-600">Compile deeper analysis on emerging trends</p>
              </div>
            </div>
          </div>
        </section>

        {/* Research Sections */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Daily Digests */}
              <Link
                href="/research/daily-digests"
                className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-teal-200 transition-all group"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-800 group-hover:text-teal-700 transition-colors">Daily Digests</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Fresh research summaries published every day. Stay up-to-date with the latest findings
                  in mental health research, translated into plain language.
                </p>
                <span className="text-teal-600 font-medium group-hover:text-teal-700">View Digests →</span>
              </Link>

              {/* Topics */}
              <Link
                href="/research/topics"
                className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all group"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-800 group-hover:text-indigo-700 transition-colors">Research Topics</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Deep dives into specific mental health areas. Each topic has its own AI research team
                  focused on grief, PTSD, depression, or anxiety.
                </p>
                <span className="text-indigo-600 font-medium group-hover:text-indigo-700">Explore Topics →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Topic Teams */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-light text-center text-gray-800 mb-4">Our Research Teams</h2>
            <p className="text-center text-gray-600 mb-12">Each topic has a dedicated AI team running the full research pipeline</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link
                href="/research/topics/grief"
                className="p-6 bg-amber-50 rounded-lg border border-amber-100 hover:shadow-md hover:border-amber-200 transition-all group"
              >
                <div className="text-3xl mb-4">💔</div>
                <h3 className="font-medium text-gray-800 group-hover:text-amber-700 transition-colors">Grief & Loss</h3>
                <p className="text-sm text-gray-600 mt-2">Child loss, complicated grief, bereavement</p>
                <p className="text-xs text-amber-600 mt-4 font-medium">Explore Research →</p>
              </Link>

              <Link
                href="/research/topics/ptsd"
                className="p-6 bg-red-50 rounded-lg border border-red-100 hover:shadow-md hover:border-red-200 transition-all group"
              >
                <div className="text-3xl mb-4">🛡️</div>
                <h3 className="font-medium text-gray-800 group-hover:text-red-700 transition-colors">PTSD & Trauma</h3>
                <p className="text-sm text-gray-600 mt-2">Medical trauma, CPTSD, childhood trauma</p>
                <p className="text-xs text-red-600 mt-4 font-medium">Explore Research →</p>
              </Link>

              <Link
                href="/research/topics/depression"
                className="p-6 bg-blue-50 rounded-lg border border-blue-100 hover:shadow-md hover:border-blue-200 transition-all group"
              >
                <div className="text-3xl mb-4">🌧️</div>
                <h3 className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors">Depression</h3>
                <p className="text-sm text-gray-600 mt-2">Clinical depression, treatment-resistant, SAD</p>
                <p className="text-xs text-blue-600 mt-4 font-medium">Explore Research →</p>
              </Link>

              <Link
                href="/research/topics/anxiety"
                className="p-6 bg-purple-50 rounded-lg border border-purple-100 hover:shadow-md hover:border-purple-200 transition-all group"
              >
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="font-medium text-gray-800 group-hover:text-purple-700 transition-colors">Anxiety</h3>
                <p className="text-sm text-gray-600 mt-2">Generalized anxiety, social anxiety, panic</p>
                <p className="text-xs text-purple-600 mt-4 font-medium">Explore Research →</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Coming Soon Notice */}
        <section className="py-16 bg-teal-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-block bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Coming Soon
            </div>
            <h2 className="text-3xl font-light text-gray-800 mb-4">We&apos;re Building Something Special</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our AI research teams are being trained and calibrated. Soon, you&apos;ll have access to daily
              digests, searchable research archives, and deep dives on the latest mental health findings.
            </p>
            <Link
              href="/get-involved"
              className="inline-block bg-teal-600 text-white px-8 py-4 rounded-md text-lg hover:bg-teal-700 transition-colors"
            >
              Get Notified When We Launch
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

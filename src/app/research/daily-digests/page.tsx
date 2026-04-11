import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import NewsletterForm from '@/components/NewsletterForm';
import Link from 'next/link';
import { getAllDigests, topicColors, topicLabels, DigestTopic } from '@/data/digests';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

export const metadata = {
  title: "Research Digests | Faith Marie Foundation",
  description: "Plain-language summaries of the latest mental health research on grief, PTSD, depression, and anxiety.",
};

export default function DailyDigestsPage() {
  const digests = getAllDigests();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 bg-white">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-teal-50 to-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
              Research Digests
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The latest mental health research, translated into plain language.
              Because understanding is the first step toward healing.
            </p>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-4 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
              <span><strong className="text-gray-800">{digests.length}</strong> digests published</span>
              <span><strong className="text-gray-800">4</strong> topics covered</span>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="py-6 bg-white border-b border-gray-100 sticky top-16 z-40">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                All Topics
              </span>
              {(Object.keys(topicLabels) as DigestTopic[]).map((topic) => (
                <Link
                  key={topic}
                  href={`/research/topics/${topic}`}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${topicColors[topic].bg} ${topicColors[topic].text} hover:opacity-80`}
                >
                  {topicLabels[topic]}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Digests List */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            {digests.length > 0 ? (
              <div className="space-y-6">
                {digests.map((digest) => {
                  const topicColor = topicColors[digest.topic];
                  return (
                    <article
                      key={digest.slug}
                      className="border border-gray-200 rounded-xl p-6 hover:border-teal-300 hover:shadow-sm transition-all"
                    >
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${topicColor.bg} ${topicColor.text}`}
                        >
                          {topicLabels[digest.topic]}
                        </span>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(digest.publishedAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {digest.readingTime} min
                          </span>
                        </div>
                      </div>

                      <Link href={`/research/daily-digests/${digest.slug}`}>
                        <h2 className="text-xl font-medium text-gray-800 mb-2 hover:text-teal-600 transition-colors">
                          {digest.title}
                        </h2>
                      </Link>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {digest.subtitle}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {digest.keyFindings.slice(0, 2).map((finding, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                            >
                              {finding.length > 50 ? finding.slice(0, 50) + '...' : finding}
                            </span>
                          ))}
                        </div>
                        <Link
                          href={`/research/daily-digests/${digest.slug}`}
                          className="flex items-center gap-1 text-teal-600 hover:text-teal-700 text-sm font-medium flex-shrink-0 ml-4"
                        >
                          Read <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-600">No digests published yet. Check back soon!</p>
              </div>
            )}
          </div>
        </section>

        {/* About Our Process */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-medium text-gray-800 text-center mb-8">
              How We Create These Digests
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-teal-700 font-medium">1</span>
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Research Scan</h3>
                <p className="text-sm text-gray-600">
                  We monitor peer-reviewed journals and academic databases for new mental health research.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-teal-700 font-medium">2</span>
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Quality Review</h3>
                <p className="text-sm text-gray-600">
                  Each study is evaluated for methodology, sample size, and clinical relevance.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-teal-700 font-medium">3</span>
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Plain Language</h3>
                <p className="text-sm text-gray-600">
                  We translate findings into accessible summaries with practical takeaways.
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link
                href="/about/ai-transparency"
                className="text-teal-600 hover:text-teal-700 text-sm underline"
              >
                Learn more about our research process
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-white">
          <div className="max-w-xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              Get Digests in Your Inbox
            </h2>
            <p className="text-gray-600 mb-8">
              Subscribe to receive new research digests and choose which topics matter most to you.
            </p>
            <NewsletterForm variant="full" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

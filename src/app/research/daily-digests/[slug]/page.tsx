import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllDigests,
  getDigestBySlug,
  topicColors,
  topicLabels,
} from '@/data/digests';
import {
  ArrowLeft,
  Clock,
  Calendar,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export async function generateStaticParams() {
  const digests = getAllDigests();
  return digests.map((digest) => ({
    slug: digest.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const digest = getDigestBySlug(slug);

  if (!digest) {
    return {
      title: 'Digest Not Found | Faith Marie Foundation',
    };
  }

  return {
    title: `${digest.title} | Faith Marie Foundation`,
    description: digest.summary.slice(0, 160),
  };
}

const confidenceConfig = {
  high: {
    icon: CheckCircle2,
    label: 'High Confidence',
    description: 'Multiple high-quality studies with consistent results',
    color: 'text-green-700 bg-green-50 border-green-200',
  },
  moderate: {
    icon: AlertCircle,
    label: 'Moderate Confidence',
    description: 'Limited studies or some inconsistency in results',
    color: 'text-amber-700 bg-amber-50 border-amber-200',
  },
  preliminary: {
    icon: AlertTriangle,
    label: 'Preliminary',
    description: 'Early research; findings may change with more study',
    color: 'text-orange-700 bg-orange-50 border-orange-200',
  },
};

export default async function DigestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const digest = getDigestBySlug(slug);

  if (!digest) {
    notFound();
  }

  const topicColor = topicColors[digest.topic];
  const confidence = confidenceConfig[digest.confidenceLevel];
  const ConfidenceIcon = confidence.icon;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 bg-white">
        {/* Header */}
        <article className="max-w-3xl mx-auto px-4 py-12">
          {/* Back Link */}
          <Link
            href="/research/daily-digests"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Digests
          </Link>

          {/* Topic & Metadata */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${topicColor.bg} ${topicColor.text}`}
            >
              {topicLabels[digest.topic]}
            </span>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(digest.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {digest.readingTime} min read
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
            {digest.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8">{digest.subtitle}</p>

          {/* Confidence Level */}
          <div className={`rounded-lg border p-4 mb-8 ${confidence.color}`}>
            <div className="flex items-start gap-3">
              <ConfidenceIcon className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">{confidence.label}</span>
                <p className="text-sm mt-1 opacity-90">{confidence.description}</p>
              </div>
            </div>
          </div>

          {/* Summary Box */}
          <div className="bg-teal-50 border border-teal-100 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-medium text-gray-800 mb-3">Summary</h2>
            <p className="text-gray-700 leading-relaxed">{digest.summary}</p>
          </div>

          {/* Key Findings */}
          <section className="mb-10">
            <h2 className="text-xl font-medium text-gray-800 mb-4">Key Findings</h2>
            <ul className="space-y-3">
              {digest.keyFindings.map((finding, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm font-medium">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700">{finding}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* What This Means */}
          <section className="mb-10">
            <h2 className="text-xl font-medium text-gray-800 mb-4">
              What This Means for You
            </h2>
            <div className="prose prose-gray max-w-none">
              {digest.whatThisMeans.split('\n\n').map((para, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed mb-4">
                  {para}
                </p>
              ))}
            </div>
          </section>

          {/* Full Content */}
          <section className="mb-10 border-t border-gray-100 pt-10">
            <div className="prose prose-gray max-w-none">
              {digest.content.split('\n\n').map((block, idx) => {
                if (block.startsWith('## ')) {
                  return (
                    <h2 key={idx} className="text-2xl font-medium text-gray-800 mt-8 mb-4">
                      {block.replace('## ', '')}
                    </h2>
                  );
                }
                if (block.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-xl font-medium text-gray-800 mt-6 mb-3">
                      {block.replace('### ', '')}
                    </h3>
                  );
                }
                if (block.startsWith('- ')) {
                  const items = block.split('\n').filter(line => line.startsWith('- '));
                  return (
                    <ul key={idx} className="list-disc list-inside space-y-1 mb-4 text-gray-700">
                      {items.map((item, i) => (
                        <li key={i}>{item.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                if (block.match(/^\d+\./)) {
                  const items = block.split('\n').filter(line => line.match(/^\d+\./));
                  return (
                    <ol key={idx} className="list-decimal list-inside space-y-1 mb-4 text-gray-700">
                      {items.map((item, i) => (
                        <li key={i}>{item.replace(/^\d+\.\s*/, '')}</li>
                      ))}
                    </ol>
                  );
                }
                return (
                  <p key={idx} className="text-gray-700 leading-relaxed mb-4">
                    {block}
                  </p>
                );
              })}
            </div>
          </section>

          {/* Limitations */}
          <section className="mb-10 bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-3">
              Limitations & Considerations
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">{digest.limitations}</p>
          </section>

          {/* Original Study */}
          <section className="mb-10 border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Original Research</h2>
            <div className="space-y-2 text-sm">
              <p className="font-medium text-gray-800">{digest.originalStudy.title}</p>
              <p className="text-gray-600">{digest.originalStudy.authors}</p>
              <p className="text-gray-500">
                {digest.originalStudy.journal}, {digest.originalStudy.year}
              </p>
              {digest.originalStudy.doi && (
                <a
                  href={`https://doi.org/${digest.originalStudy.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-700"
                >
                  View on DOI <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </section>

          {/* Disclaimer */}
          <section className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-sm">
            <p className="text-amber-800">
              <strong>Disclaimer:</strong> This digest is for educational purposes only and
              does not constitute medical advice. Always consult with a qualified mental
              health professional for diagnosis and treatment. If you&apos;re in crisis,
              please contact{' '}
              <Link href="/crisis-support" className="underline font-medium">
                crisis support resources
              </Link>
              .
            </p>
          </section>

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link
              href="/research/daily-digests"
              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              View All Research Digests
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

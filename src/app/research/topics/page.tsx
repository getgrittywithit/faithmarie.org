import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: "Research Topics | Faith Marie Foundation",
  description: "Explore our AI research teams focused on grief, PTSD, depression, and anxiety. Each topic has dedicated resources and findings.",
};

const topics = [
  {
    slug: 'grief',
    title: 'Grief & Loss',
    emoji: '💔',
    description: 'Research on child loss, complicated grief, bereavement, and the grieving process.',
    color: 'amber',
    areas: ['Child loss', 'Complicated grief', 'Bereavement', 'Prolonged grief disorder'],
  },
  {
    slug: 'ptsd',
    title: 'PTSD & Trauma',
    emoji: '🛡️',
    description: 'Research on post-traumatic stress, medical trauma, childhood trauma, and CPTSD.',
    color: 'red',
    areas: ['Medical trauma', 'Combat PTSD', 'Childhood trauma', 'Complex PTSD (CPTSD)'],
  },
  {
    slug: 'depression',
    title: 'Depression',
    emoji: '🌧️',
    description: 'Research on clinical depression, treatment-resistant depression, and seasonal affective disorder.',
    color: 'blue',
    areas: ['Clinical depression', 'Treatment-resistant depression', 'Seasonal affective disorder', 'Postpartum depression'],
  },
  {
    slug: 'anxiety',
    title: 'Anxiety',
    emoji: '⚡',
    description: 'Research on generalized anxiety, social anxiety, panic disorder, and related conditions.',
    color: 'purple',
    areas: ['Generalized anxiety disorder', 'Social anxiety', 'Panic disorder', 'Health anxiety'],
  },
];

export default function TopicsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 bg-white">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-indigo-50 to-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
              Research Topics
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Each topic has a dedicated AI research team running the full pipeline — scanning, analyzing,
              synthesizing, and publishing findings.
            </p>
          </div>
        </section>

        {/* Topics Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {topics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/research/topics/${topic.slug}`}
                  className={`p-8 bg-${topic.color}-50 rounded-lg border border-${topic.color}-100 hover:shadow-lg hover:border-${topic.color}-200 transition-all group`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-4xl mb-4">{topic.emoji}</div>
                      <h2 className={`text-2xl font-medium text-gray-800 group-hover:text-${topic.color}-700 transition-colors mb-3`}>
                        {topic.title}
                      </h2>
                      <p className="text-gray-600 mb-6">{topic.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Research areas:</p>
                    <div className="flex flex-wrap gap-2">
                      {topic.areas.map((area) => (
                        <span
                          key={area}
                          className={`px-3 py-1 bg-white/70 text-${topic.color}-700 rounded-full text-xs`}
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={`mt-6 text-${topic.color}-600 font-medium group-hover:text-${topic.color}-700`}>
                    Explore Research →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How Teams Work */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-light text-center text-gray-800 mb-12">How Each Team Works</h2>

            <div className="bg-white rounded-lg p-8 shadow-sm">
              <p className="text-gray-700 mb-6">
                Each topic team is an autonomous AI agent pipeline that runs daily:
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <span className="text-teal-700 text-sm font-medium">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Scan</h3>
                    <p className="text-sm text-gray-600">Monitor academic databases, preprint servers, and publications for new content</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <span className="text-teal-700 text-sm font-medium">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Analyze</h3>
                    <p className="text-sm text-gray-600">Read, evaluate, and extract key findings from relevant papers</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <span className="text-teal-700 text-sm font-medium">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Synthesize</h3>
                    <p className="text-sm text-gray-600">Translate academic language into accessible summaries with practical implications</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <span className="text-teal-700 text-sm font-medium">4</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Publish</h3>
                    <p className="text-sm text-gray-600">Produce daily digests and contribute to the knowledge base</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <span className="text-teal-700 text-sm font-medium">5</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Report</h3>
                    <p className="text-sm text-gray-600">Compile deeper analysis pieces on a weekly or monthly cadence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

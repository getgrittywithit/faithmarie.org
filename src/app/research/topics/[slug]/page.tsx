import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const topicData: Record<string, {
  title: string;
  emoji: string;
  description: string;
  color: string;
  bgColor: string;
  textColor: string;
  areas: string[];
  exampleFindings: string[];
}> = {
  grief: {
    title: 'Grief & Loss',
    emoji: '💔',
    description: 'Research on child loss, complicated grief, bereavement, and the grieving process. Our AI team scans the latest studies to help you understand grief better.',
    color: 'amber',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    areas: ['Child loss', 'Complicated grief', 'Bereavement', 'Prolonged grief disorder', 'Anticipatory grief'],
    exampleFindings: [
      'Peer support groups reduce prolonged grief symptoms by 40%',
      'Writing exercises help process complicated grief',
      'Grief counseling is most effective when started early',
    ],
  },
  ptsd: {
    title: 'PTSD & Trauma',
    emoji: '🛡️',
    description: 'Research on post-traumatic stress disorder, medical trauma, childhood trauma, and complex PTSD. Understanding trauma is the first step to healing.',
    color: 'red',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    areas: ['Medical trauma', 'Combat PTSD', 'Childhood trauma', 'Complex PTSD (CPTSD)', 'Intergenerational trauma'],
    exampleFindings: [
      'New biomarkers identified for early PTSD detection',
      'EMDR therapy shows strong efficacy for trauma processing',
      'Sleep quality significantly impacts PTSD recovery',
    ],
  },
  depression: {
    title: 'Depression',
    emoji: '🌧️',
    description: 'Research on clinical depression, treatment-resistant depression, and seasonal affective disorder. Finding what works for different types of depression.',
    color: 'blue',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    areas: ['Clinical depression', 'Treatment-resistant depression', 'Seasonal affective disorder', 'Postpartum depression', 'Dysthymia'],
    exampleFindings: [
      'Exercise is as effective as medication for mild depression',
      'Gut microbiome linked to depression symptoms',
      'Social connection is a key protective factor',
    ],
  },
  anxiety: {
    title: 'Anxiety',
    emoji: '⚡',
    description: 'Research on generalized anxiety, social anxiety, panic disorder, and related conditions. Learning what science says about managing anxiety.',
    color: 'purple',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    areas: ['Generalized anxiety disorder', 'Social anxiety', 'Panic disorder', 'Health anxiety', 'Phobias'],
    exampleFindings: [
      'AI-assisted CBT shows promise for reducing anxiety in teens',
      'Breathing exercises can reduce anxiety symptoms in minutes',
      'Caffeine significantly impacts anxiety severity',
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(topicData).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // This will be resolved at build time
  return params.then(({ slug }) => {
    const topic = topicData[slug];
    if (!topic) {
      return { title: 'Topic Not Found' };
    }
    return {
      title: `${topic.title} Research | Faith Marie Foundation`,
      description: topic.description,
    };
  });
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = topicData[slug];

  if (!topic) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 bg-white">
        {/* Hero */}
        <section className={`py-16 ${topic.bgColor}`}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="text-5xl mb-6">{topic.emoji}</div>
            <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
              {topic.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {topic.description}
            </p>
          </div>
        </section>

        {/* Research Areas */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-medium text-gray-800 mb-8">Research Areas</h2>
            <div className="flex flex-wrap gap-3">
              {topic.areas.map((area) => (
                <span
                  key={area}
                  className={`px-4 py-2 ${topic.bgColor} ${topic.textColor} rounded-full text-sm font-medium`}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Example Findings */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-medium text-gray-800 mb-8">Example Research Findings</h2>
            <p className="text-gray-600 mb-8">
              When our AI research team is fully operational, findings like these will be published daily:
            </p>
            <div className="space-y-4">
              {topic.exampleFindings.map((finding, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-start">
                    <div className={`w-8 h-8 ${topic.bgColor} rounded-full flex items-center justify-center flex-shrink-0 mr-4`}>
                      <svg className={`w-4 h-4 ${topic.textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-700">{finding}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coming Soon */}
        <section className={`py-16 ${topic.bgColor}`}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className={`inline-block bg-white/70 ${topic.textColor} px-4 py-2 rounded-full text-sm font-medium mb-6`}>
              Coming Soon
            </div>
            <h2 className="text-3xl font-light text-gray-800 mb-4">Research Team Launching Soon</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our {topic.title} AI research team is being trained and calibrated. Soon, daily digests
              and in-depth reports will be available here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-involved"
                className={`bg-${topic.color}-600 text-white px-8 py-4 rounded-md text-lg hover:bg-${topic.color}-700 transition-colors`}
              >
                Get Notified
              </Link>
              <Link
                href="/research/topics"
                className="bg-white text-gray-700 px-8 py-4 rounded-md text-lg hover:bg-gray-50 transition-colors"
              >
                View All Topics
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
  FileText,
  Users,
  Mail,
  Calendar,
  Target,
  Rocket,
  CheckCircle2,
  Circle,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export const metadata = {
  title: "Impact & Roadmap | Faith Marie Foundation",
  description: "See our current progress and 2026 roadmap for making mental health research accessible to everyone.",
};

// Current metrics - update these as you grow
const currentMetrics = {
  researchDigests: 3,
  newsletterSubscribers: 0,
  topicsCovered: 4,
  foundedDate: "2024",
};

const milestones = [
  {
    quarter: "Q1 2026",
    title: "Foundation Launch",
    status: "completed",
    items: [
      { text: "Website launch with core pages", done: true },
      { text: "AI transparency documentation", done: true },
      { text: "Newsletter signup system", done: true },
      { text: "Donation processing", done: true },
      { text: "Crisis support resources", done: true },
    ],
  },
  {
    quarter: "Q2 2026",
    title: "Research Operations",
    status: "in-progress",
    items: [
      { text: "First research digests published", done: true },
      { text: "AI research pipeline operational", done: false },
      { text: "100 newsletter subscribers", done: false },
      { text: "Advisory board: Medical Advisor", done: false },
      { text: "Knowledge base v1 launch", done: false },
    ],
  },
  {
    quarter: "Q3 2026",
    title: "Scale & Partnerships",
    status: "upcoming",
    items: [
      { text: "Weekly research digest schedule", done: false },
      { text: "500 newsletter subscribers", done: false },
      { text: "First university partnership", done: false },
      { text: "Advisory board complete (5 members)", done: false },
      { text: "AI chatbot beta launch", done: false },
    ],
  },
  {
    quarter: "Q4 2026",
    title: "Community Growth",
    status: "upcoming",
    items: [
      { text: "1,000 newsletter subscribers", done: false },
      { text: "50+ research digests published", done: false },
      { text: "Full knowledge base with search", done: false },
      { text: "First annual impact report", done: false },
      { text: "501(c)(3) status obtained", done: false },
    ],
  },
];

export default function ImpactPage() {
  const completedItems = milestones.flatMap(m => m.items).filter(i => i.done).length;
  const totalItems = milestones.flatMap(m => m.items).length;
  const progressPercent = Math.round((completedItems / totalItems) * 100);

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 bg-white">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-6xl font-light text-center text-gray-800 mb-6">
            Impact & Roadmap
          </h1>
          <p className="text-xl text-center text-gray-600 font-light max-w-2xl mx-auto">
            We believe in radical transparency. Here&apos;s exactly where we are
            and where we&apos;re headed.
          </p>
        </div>

        {/* Honest Stage Indicator */}
        <section className="py-8 bg-amber-50 border-y border-amber-200">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-amber-800">
              <span className="font-medium">Current Stage:</span> Early Operations —
              We&apos;re a young foundation building something meaningful.
              These numbers will grow as we do.
            </p>
          </div>
        </section>

        {/* Current Metrics */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-12">
              <TrendingUp className="h-6 w-6 text-teal-600" />
              <h2 className="text-2xl font-medium text-gray-800">Current Metrics</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <FileText className="h-8 w-8 text-teal-600 mx-auto mb-3" />
                <div className="text-4xl font-light text-gray-800 mb-1">
                  {currentMetrics.researchDigests}
                </div>
                <div className="text-sm text-gray-600">Research Digests Published</div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <Mail className="h-8 w-8 text-teal-600 mx-auto mb-3" />
                <div className="text-4xl font-light text-gray-800 mb-1">
                  {currentMetrics.newsletterSubscribers}
                </div>
                <div className="text-sm text-gray-600">Newsletter Subscribers</div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <Target className="h-8 w-8 text-teal-600 mx-auto mb-3" />
                <div className="text-4xl font-light text-gray-800 mb-1">
                  {currentMetrics.topicsCovered}
                </div>
                <div className="text-sm text-gray-600">Research Topics</div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <Calendar className="h-8 w-8 text-teal-600 mx-auto mb-3" />
                <div className="text-4xl font-light text-gray-800 mb-1">
                  {currentMetrics.foundedDate}
                </div>
                <div className="text-sm text-gray-600">Year Founded</div>
              </div>
            </div>

            <p className="text-center text-gray-500 text-sm mt-8">
              Last updated: April 2026
            </p>
          </div>
        </section>

        {/* Progress Bar */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">2026 Roadmap Progress</span>
              <span className="text-sm text-gray-600">{completedItems} of {totalItems} milestones</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-600 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-center text-teal-700 font-medium mt-2">{progressPercent}% Complete</p>
          </div>
        </section>

        {/* Roadmap Timeline */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-12">
              <Rocket className="h-6 w-6 text-teal-600" />
              <h2 className="text-2xl font-medium text-gray-800">2026 Roadmap</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {milestones.map((milestone) => (
                <div
                  key={milestone.quarter}
                  className={`rounded-xl border-2 p-6 ${
                    milestone.status === 'completed'
                      ? 'border-teal-500 bg-teal-50'
                      : milestone.status === 'in-progress'
                      ? 'border-amber-400 bg-amber-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className={`text-sm font-medium px-2 py-1 rounded ${
                        milestone.status === 'completed'
                          ? 'bg-teal-600 text-white'
                          : milestone.status === 'in-progress'
                          ? 'bg-amber-500 text-white'
                          : 'bg-gray-300 text-gray-700'
                      }`}>
                        {milestone.quarter}
                      </span>
                    </div>
                    {milestone.status === 'completed' && (
                      <CheckCircle2 className="h-5 w-5 text-teal-600" />
                    )}
                    {milestone.status === 'in-progress' && (
                      <div className="flex items-center gap-1 text-amber-600 text-sm font-medium">
                        <Circle className="h-3 w-3 fill-amber-600" />
                        In Progress
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-medium text-gray-800 mb-4">{milestone.title}</h3>

                  <ul className="space-y-2">
                    {milestone.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        {item.done ? (
                          <CheckCircle2 className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={item.done ? 'text-gray-700' : 'text-gray-500'}>
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How Funds Are Used */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-medium text-gray-800 text-center mb-8">
              How Your Support Is Used
            </h2>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-light text-teal-600 mb-2">60%</div>
                  <div className="font-medium text-gray-800 mb-1">AI & Research</div>
                  <p className="text-sm text-gray-600">
                    API costs, cloud infrastructure, and research database access
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-teal-600 mb-2">25%</div>
                  <div className="font-medium text-gray-800 mb-1">Operations</div>
                  <p className="text-sm text-gray-600">
                    Website hosting, email services, and administrative costs
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-teal-600 mb-2">15%</div>
                  <div className="font-medium text-gray-800 mb-1">Growth</div>
                  <p className="text-sm text-gray-600">
                    Outreach, partnerships, and expanding our reach
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Estimated monthly operating costs: $670 - $1,450
                </p>
                <Link
                  href="/about/ai-transparency"
                  className="text-teal-600 hover:text-teal-700 text-sm underline"
                >
                  See detailed cost breakdown
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-light text-gray-800 mb-4">
              Help Us Reach Our Goals
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Every subscriber, every donation, every share helps us make mental health
              research accessible to those who need it most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-involved"
                className="inline-flex items-center justify-center gap-2 bg-teal-600 text-white px-8 py-4 rounded-md text-lg hover:bg-teal-700 transition-colors"
              >
                Get Involved
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/research/daily-digests"
                className="bg-gray-100 text-gray-700 px-8 py-4 rounded-md text-lg hover:bg-gray-200 transition-colors"
              >
                Read Our Research
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

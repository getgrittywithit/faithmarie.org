import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Phone, MessageCircle, Search, DollarSign, Heart, Globe, Users, ExternalLink } from 'lucide-react';

export const metadata = {
  title: "Find Help | Faith Marie Foundation",
  description: "Curated mental health resources including crisis lines, therapist directories, and affordable care options.",
};

const crisisResources = [
  {
    name: '988 Suicide & Crisis Lifeline',
    description: 'Free, confidential support 24/7 for anyone in suicidal crisis or emotional distress.',
    action: 'Call or text 988',
    href: 'tel:988',
    icon: Phone,
    color: 'bg-red-50 border-red-200',
    iconColor: 'text-red-600',
    urgent: true,
  },
  {
    name: 'Crisis Text Line',
    description: 'Text-based crisis support. Trained crisis counselors available 24/7.',
    action: 'Text HOME to 741741',
    href: 'sms:741741&body=HOME',
    icon: MessageCircle,
    color: 'bg-red-50 border-red-200',
    iconColor: 'text-red-600',
    urgent: true,
  },
  {
    name: 'International Association for Suicide Prevention',
    description: 'Crisis centers around the world if you\'re outside the US.',
    action: 'Find your country',
    href: 'https://www.iasp.info/resources/Crisis_Centres/',
    icon: Globe,
    color: 'bg-orange-50 border-orange-200',
    iconColor: 'text-orange-600',
    urgent: false,
  },
];

const therapistDirectories = [
  {
    name: 'Psychology Today',
    description: 'The largest therapist directory. Filter by location, specialty, insurance, and more.',
    href: 'https://www.psychologytoday.com/us/therapists',
    note: 'Most comprehensive directory',
  },
  {
    name: 'SAMHSA Treatment Locator',
    description: 'Government-run directory of mental health and substance abuse treatment facilities.',
    href: 'https://findtreatment.gov/',
    note: 'Includes community health centers',
  },
  {
    name: 'Therapy Den',
    description: 'Directory focused on inclusive, affirming therapists for marginalized communities.',
    href: 'https://www.therapyden.com/',
    note: 'LGBTQ+ and culturally-affirming focus',
  },
];

const affordableOptions = [
  {
    name: 'Open Path Collective',
    description: 'Affordable therapy sessions ($30-$80) with licensed therapists for people without insurance or with financial need.',
    href: 'https://openpathcollective.org/',
    price: '$30-$80/session',
  },
  {
    name: 'Sliding Scale Therapy',
    description: 'Directory of therapists who offer reduced rates based on income.',
    href: 'https://www.opensourcemh.org/',
    price: 'Income-based pricing',
  },
  {
    name: 'Community Health Centers',
    description: 'Federally-funded health centers that provide mental health services on a sliding fee scale.',
    href: 'https://findahealthcenter.hrsa.gov/',
    price: 'Sliding scale / free',
  },
  {
    name: '7 Cups',
    description: 'Free online chat with trained listeners. Not therapy, but peer support when you need someone to talk to.',
    href: 'https://www.7cups.com/',
    price: 'Free (listeners) / Paid (therapy)',
  },
];

const griefSpecific = [
  {
    name: 'The Compassionate Friends',
    description: 'Support for families who have experienced the death of a child. Local chapters, online support, and resources.',
    href: 'https://www.compassionatefriends.org/',
  },
  {
    name: 'GriefShare',
    description: 'Grief recovery support groups meeting in churches and community centers nationwide.',
    href: 'https://www.griefshare.org/',
  },
  {
    name: 'What\'s Your Grief',
    description: 'Online grief education, articles, and courses. Evidence-based content written by counselors.',
    href: 'https://whatsyourgrief.com/',
  },
  {
    name: 'The Dinner Party',
    description: 'Community for 20-40 somethings who have experienced significant loss. Virtual and in-person gatherings.',
    href: 'https://www.thedinnerparty.org/',
  },
];

export default function FindHelpPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 bg-white">
        {/* Hero */}
        <section className="py-12 bg-gradient-to-b from-teal-50 to-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
              Find Help
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Curated resources for crisis support, finding a therapist, and affordable care.
              We don&apos;t maintain a directory — we link to trusted resources that do.
            </p>
          </div>
        </section>

        {/* Crisis Resources - Most prominent */}
        <section className="py-12 bg-red-50 border-y border-red-200">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <Phone className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-semibold text-gray-800">Crisis Support</h2>
            </div>
            <p className="text-gray-600 mb-8">
              If you&apos;re in crisis or having thoughts of suicide, please reach out. Help is available 24/7.
            </p>

            <div className="grid gap-4">
              {crisisResources.map((resource) => (
                <a
                  key={resource.name}
                  href={resource.href}
                  target={resource.href.startsWith('http') ? '_blank' : undefined}
                  rel={resource.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`flex items-start gap-4 p-5 rounded-xl border-2 ${resource.color} hover:shadow-md transition-shadow`}
                >
                  <div className={`p-3 bg-white rounded-lg ${resource.iconColor}`}>
                    <resource.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-800">{resource.name}</h3>
                      {resource.href.startsWith('http') && (
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{resource.description}</p>
                    <p className="text-lg font-semibold text-red-700 mt-2">{resource.action}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Therapist Directories */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <Search className="w-6 h-6 text-teal-600" />
              <h2 className="text-2xl font-semibold text-gray-800">Find a Therapist</h2>
            </div>
            <p className="text-gray-600 mb-8">
              These directories help you search for therapists by location, specialty, insurance, and more.
            </p>

            <div className="grid gap-4">
              {therapistDirectories.map((directory) => (
                <a
                  key={directory.name}
                  href={directory.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between p-5 bg-white rounded-xl border border-gray-200 hover:border-teal-300 hover:shadow-md transition-all"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-800">{directory.name}</h3>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{directory.description}</p>
                    <span className="inline-block text-xs text-teal-700 bg-teal-50 px-2 py-1 rounded mt-2">
                      {directory.note}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Affordable Options */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-semibold text-gray-800">Affordable Care Options</h2>
            </div>
            <p className="text-gray-600 mb-8">
              Mental health care shouldn&apos;t break the bank. These resources offer reduced-cost or free options.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {affordableOptions.map((option) => (
                <a
                  key={option.name}
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col p-5 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-800">{option.name}</h3>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-gray-600 text-sm flex-1">{option.description}</p>
                  <span className="inline-block text-sm font-medium text-green-700 mt-3">
                    {option.price}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Grief-Specific Resources */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-6 h-6 text-amber-600" />
              <h2 className="text-2xl font-semibold text-gray-800">Grief-Specific Support</h2>
            </div>
            <p className="text-gray-600 mb-8">
              Organizations focused specifically on grief, loss, and bereavement support.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {griefSpecific.map((resource) => (
                <a
                  key={resource.name}
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col p-5 bg-white rounded-xl border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-800">{resource.name}</h3>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-gray-600 text-sm">{resource.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-12 bg-teal-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-teal-600" />
              <h2 className="text-2xl font-semibold text-gray-800">Not Sure Where to Start?</h2>
            </div>

            <div className="bg-white rounded-xl p-6 border border-teal-200">
              <p className="text-gray-600 mb-4">
                Finding the right help can feel overwhelming. Here&apos;s a simple path:
              </p>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-semibold">1</span>
                  <div>
                    <p className="font-medium text-gray-800">If you&apos;re in crisis</p>
                    <p className="text-sm text-gray-600">Call or text 988 right now. They&apos;re trained to help.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-semibold">2</span>
                  <div>
                    <p className="font-medium text-gray-800">If you want to understand your symptoms</p>
                    <p className="text-sm text-gray-600">Take one of our <Link href="/assessments" className="text-teal-600 underline">self-assessments</Link> to learn more about what you&apos;re experiencing.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-semibold">3</span>
                  <div>
                    <p className="font-medium text-gray-800">If you&apos;re ready to find a therapist</p>
                    <p className="text-sm text-gray-600">Use Psychology Today&apos;s directory — filter by your insurance, location, and what you&apos;re dealing with.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-semibold">4</span>
                  <div>
                    <p className="font-medium text-gray-800">If cost is a barrier</p>
                    <p className="text-sm text-gray-600">Open Path Collective offers sessions at $30-$80. Community health centers use sliding scales.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Back to resources */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-gray-600 mb-6">
              Want to understand more about treatments before seeking help?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/learn"
                className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Learn About Treatments
              </Link>
              <Link
                href="/assessments"
                className="bg-white text-gray-700 px-8 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Take a Self-Assessment
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

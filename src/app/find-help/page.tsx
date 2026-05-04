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
    color: 'bg-rose-50 border-rose-200',
    iconColor: 'text-rose-900',
    urgent: true,
  },
  {
    name: 'Crisis Text Line',
    description: 'Text-based crisis support. Trained crisis counselors available 24/7.',
    action: 'Text HOME to 741741',
    href: 'sms:741741&body=HOME',
    icon: MessageCircle,
    color: 'bg-rose-50 border-rose-200',
    iconColor: 'text-rose-900',
    urgent: true,
  },
  {
    name: 'International Association for Suicide Prevention',
    description: 'Crisis centers around the world if you\'re outside the US.',
    action: 'Find your country',
    href: 'https://www.iasp.info/resources/Crisis_Centres/',
    icon: Globe,
    color: 'bg-light-champagne/50 border-champagne-gold/30',
    iconColor: 'text-deep-champagne',
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
      <main className="min-h-screen pt-20 bg-warm-cream">
        {/* Hero */}
        <section className="py-12 bg-gradient-to-b from-soft-aqua/30 to-warm-cream">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">
              Find help
            </h1>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Curated resources for crisis support, finding a therapist, and affordable care.
              We don&apos;t maintain a directory — we link to trusted resources that do.
            </p>
          </div>
        </section>

        {/* Crisis Resources - Most prominent */}
        <section className="py-12 bg-rose-50 border-y border-rose-200">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <Phone className="w-6 h-6 text-rose-900" />
              <h2 className="font-serif text-2xl text-stone-900">Crisis support</h2>
            </div>
            <p className="text-stone-600 mb-8">
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
                      <h3 className="font-semibold text-stone-900">{resource.name}</h3>
                      {resource.href.startsWith('http') && (
                        <ExternalLink className="w-4 h-4 text-stone-400" />
                      )}
                    </div>
                    <p className="text-stone-600 text-sm mt-1">{resource.description}</p>
                    <p className="text-lg font-semibold text-rose-900 mt-2">{resource.action}</p>
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
              <Search className="w-6 h-6 text-deep-teal" />
              <h2 className="font-serif text-2xl text-stone-900">Find a therapist</h2>
            </div>
            <p className="text-stone-600 mb-8">
              These directories help you search for therapists by location, specialty, insurance, and more.
            </p>

            <div className="grid gap-4">
              {therapistDirectories.map((directory) => (
                <a
                  key={directory.name}
                  href={directory.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between p-5 bg-white rounded-xl border border-stone-200 hover:border-deep-teal hover:shadow-md transition-all"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-stone-900">{directory.name}</h3>
                      <ExternalLink className="w-4 h-4 text-stone-400" />
                    </div>
                    <p className="text-stone-600 text-sm mt-1">{directory.description}</p>
                    <span className="inline-block text-xs text-deep-teal bg-soft-aqua/30 px-2 py-1 rounded mt-2">
                      {directory.note}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Affordable Options */}
        <section className="py-12 bg-stone-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="w-6 h-6 text-vibrant-teal" />
              <h2 className="font-serif text-2xl text-stone-900">Affordable care options</h2>
            </div>
            <p className="text-stone-600 mb-8">
              Mental health care shouldn&apos;t break the bank. These resources offer reduced-cost or free options.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {affordableOptions.map((option) => (
                <a
                  key={option.name}
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col p-5 bg-white rounded-xl border border-stone-200 hover:border-vibrant-teal hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-stone-900">{option.name}</h3>
                    <ExternalLink className="w-4 h-4 text-stone-400" />
                  </div>
                  <p className="text-stone-600 text-sm flex-1">{option.description}</p>
                  <span className="inline-block text-sm font-medium text-vibrant-teal mt-3">
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
              <Heart className="w-6 h-6 text-champagne-gold" />
              <h2 className="font-serif text-2xl text-stone-900">Grief-specific support</h2>
            </div>
            <p className="text-stone-600 mb-8">
              Organizations focused specifically on grief, loss, and bereavement support.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {griefSpecific.map((resource) => (
                <a
                  key={resource.name}
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col p-5 bg-white rounded-xl border border-stone-200 hover:border-champagne-gold hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-stone-900">{resource.name}</h3>
                    <ExternalLink className="w-4 h-4 text-stone-400" />
                  </div>
                  <p className="text-stone-600 text-sm">{resource.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-12 bg-soft-aqua/30">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-deep-teal" />
              <h2 className="font-serif text-2xl text-stone-900">Not sure where to start?</h2>
            </div>

            <div className="bg-white rounded-xl p-6 border border-soft-aqua">
              <p className="text-stone-600 mb-4">
                Finding the right help can feel overwhelming. Here&apos;s a simple path:
              </p>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-soft-aqua/50 rounded-full flex items-center justify-center text-deep-teal font-semibold">1</span>
                  <div>
                    <p className="font-medium text-stone-900">If you&apos;re in crisis</p>
                    <p className="text-sm text-stone-600">Call or text 988 right now. They&apos;re trained to help.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-soft-aqua/50 rounded-full flex items-center justify-center text-deep-teal font-semibold">2</span>
                  <div>
                    <p className="font-medium text-stone-900">If you want to understand your symptoms</p>
                    <p className="text-sm text-stone-600">Take one of our <Link href="/assessments" className="text-deep-teal underline">self-assessments</Link> to learn more about what you&apos;re experiencing.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-soft-aqua/50 rounded-full flex items-center justify-center text-deep-teal font-semibold">3</span>
                  <div>
                    <p className="font-medium text-stone-900">If you&apos;re ready to find a therapist</p>
                    <p className="text-sm text-stone-600">Use Psychology Today&apos;s directory — filter by your insurance, location, and what you&apos;re dealing with.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-soft-aqua/50 rounded-full flex items-center justify-center text-deep-teal font-semibold">4</span>
                  <div>
                    <p className="font-medium text-stone-900">If cost is a barrier</p>
                    <p className="text-sm text-stone-600">Open Path Collective offers sessions at $30-$80. Community health centers use sliding scales.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Back to resources */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-stone-600 mb-6">
              Want to understand more about treatments before seeking help?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/learn"
                className="bg-deep-teal text-white px-8 py-3 rounded-lg hover:bg-forest-teal transition-colors"
              >
                Learn about treatments
              </Link>
              <Link
                href="/assessments"
                className="bg-white text-stone-700 px-8 py-3 rounded-lg border border-stone-200 hover:border-stone-300 transition-colors"
              >
                Take a self-assessment
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

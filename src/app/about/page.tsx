import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Users, BarChart3, BookOpen, Shield, CheckCircle } from 'lucide-react';

export const metadata = {
  title: "About Us | Faith Marie Foundation",
  description: "Learn about the Faith Marie Foundation - our mission, team, methodology, and commitment to making mental health research accessible.",
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 bg-warm-cream">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-soft-aqua/30 to-warm-cream py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-6xl text-stone-900 mb-6">
              About the foundation
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              We read the research so you don&apos;t have to — translating academic findings
              into plain-language guidance that families can actually use.
            </p>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-12 bg-warm-cream border-b border-stone-200">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/about/team"
                className="group p-6 bg-white rounded-xl border border-stone-200 hover:border-deep-teal transition-colors"
              >
                <Users className="h-8 w-8 text-deep-teal mb-3" />
                <h3 className="text-lg font-medium text-stone-900 group-hover:text-deep-teal">Our team</h3>
                <p className="text-stone-600 text-sm mt-1">Meet the founders and advisors</p>
              </Link>

              <Link
                href="/about/impact"
                className="group p-6 bg-white rounded-xl border border-stone-200 hover:border-deep-teal transition-colors"
              >
                <BarChart3 className="h-8 w-8 text-deep-teal mb-3" />
                <h3 className="text-lg font-medium text-stone-900 group-hover:text-deep-teal">Our impact</h3>
                <p className="text-stone-600 text-sm mt-1">See what we&apos;ve accomplished</p>
              </Link>

              <Link
                href="/our-story"
                className="group p-6 bg-white rounded-xl border border-stone-200 hover:border-deep-teal transition-colors"
              >
                <BookOpen className="h-8 w-8 text-deep-teal mb-3" />
                <h3 className="text-lg font-medium text-stone-900 group-hover:text-deep-teal">Our story</h3>
                <p className="text-stone-600 text-sm mt-1">Why we started this foundation</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-serif text-3xl text-center text-stone-900 mb-8">Our mission</h2>
            <div className="prose prose-lg mx-auto text-stone-700 space-y-6">
              <p className="leading-relaxed">
                Mental health research is fragmented, locked behind paywalls, and often written in language
                that&apos;s inaccessible to the people who need it most. Families dealing with grief, individuals
                struggling with trauma, and anyone facing mental health challenges are left to navigate an
                overwhelming, disconnected landscape.
              </p>
              <p className="leading-relaxed">
                The Faith Marie Foundation exists to change this. We believe that understanding is the first
                step toward healing — and that the latest research on grief, depression, anxiety, and trauma
                should be accessible to everyone, not just academics and clinicians.
              </p>
              <p className="leading-relaxed font-medium text-deep-teal">
                No family should navigate mental health challenges without accessible, modern support.
              </p>
            </div>
          </div>
        </section>

        {/* How We Work Section (Condensed Methodology) */}
        <section className="py-16 bg-stone-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-serif text-3xl text-center text-stone-900 mb-4">How we work</h2>
            <p className="text-center text-stone-600 mb-12 max-w-2xl mx-auto">
              Our methodology for translating research into accessible resources
            </p>

            <div className="bg-white rounded-xl border border-stone-200 p-8 mb-8">
              <div className="prose prose-lg mx-auto text-stone-700">
                <p className="leading-relaxed">
                  We use a combination of research tools and human review to stay on top of the latest
                  mental health studies. Our process involves scanning academic databases for new papers
                  on grief, trauma, depression, and anxiety, then summarizing key findings in plain language.
                </p>
                <p className="leading-relaxed">
                  Every piece of content goes through quality review before publication. We verify claims
                  against source papers, check for accuracy, and ensure the information is presented with
                  appropriate context and caveats.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-stone-200 p-6">
                <Shield className="h-8 w-8 text-deep-teal mb-3" />
                <h3 className="text-lg font-medium text-stone-900 mb-2">Quality standards</h3>
                <ul className="space-y-2 text-stone-600 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-vibrant-teal mt-0.5 flex-shrink-0" />
                    <span>Source verification for all claims</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-vibrant-teal mt-0.5 flex-shrink-0" />
                    <span>Prioritize high-quality studies (RCTs, meta-analyses)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-vibrant-teal mt-0.5 flex-shrink-0" />
                    <span>Clear confidence levels for findings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-vibrant-teal mt-0.5 flex-shrink-0" />
                    <span>Human review before publication</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border border-stone-200 p-6">
                <BookOpen className="h-8 w-8 text-deep-teal mb-3" />
                <h3 className="text-lg font-medium text-stone-900 mb-2">Our principles</h3>
                <ul className="space-y-2 text-stone-600 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-vibrant-teal mt-0.5 flex-shrink-0" />
                    <span>Accuracy over speed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-vibrant-teal mt-0.5 flex-shrink-0" />
                    <span>Compassion in communication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-vibrant-teal mt-0.5 flex-shrink-0" />
                    <span>Transparency about limitations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-vibrant-teal mt-0.5 flex-shrink-0" />
                    <span>Encouraging professional consultation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Where Donations Go */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-serif text-3xl text-center text-stone-900 mb-4">Where your support goes</h2>
            <p className="text-center text-stone-600 mb-12">
              We&apos;re committed to transparency in how we use donations
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-stone-50 rounded-lg p-6">
                <h3 className="font-medium text-stone-900 mb-3">Research & content</h3>
                <p className="text-stone-600 text-sm">
                  Reviewing studies, translating findings into plain language, and creating
                  guides families can actually use.
                </p>
              </div>
              <div className="bg-stone-50 rounded-lg p-6">
                <h3 className="font-medium text-stone-900 mb-3">Platform & tools</h3>
                <p className="text-stone-600 text-sm">
                  Building and maintaining faithmarie.org, the resource finder, and
                  other tools that help families find support.
                </p>
              </div>
              <div className="bg-stone-50 rounded-lg p-6">
                <h3 className="font-medium text-stone-900 mb-3">Operations</h3>
                <p className="text-stone-600 text-sm">
                  Nonprofit administration, legal compliance, and keeping the foundation
                  running smoothly.
                </p>
              </div>
              <div className="bg-stone-50 rounded-lg p-6">
                <h3 className="font-medium text-stone-900 mb-3">Outreach</h3>
                <p className="text-stone-600 text-sm">
                  Reaching people who need these resources and connecting with the
                  mental health community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-b from-stone-50 to-warm-cream">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl text-stone-900 mb-8">Join our mission</h2>
            <p className="text-lg text-stone-600 mb-8 max-w-2xl mx-auto">
              Help us make mental health resources accessible to everyone who needs them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-involved"
                className="bg-deep-teal text-white px-8 py-4 rounded-lg text-lg hover:bg-forest-teal transition-colors"
              >
                Get involved
              </Link>
              <Link
                href="/our-story"
                className="bg-white text-stone-700 px-8 py-4 rounded-lg text-lg border border-stone-200 hover:border-stone-300 transition-colors"
              >
                Read our story
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

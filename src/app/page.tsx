'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import NewsletterForm from '@/components/NewsletterForm';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-warm-cream">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center">
          <div className="text-center space-y-8 px-4 max-w-4xl mx-auto pt-20">
            <div className="space-y-4">
              <h1 className="font-serif text-5xl md:text-7xl text-stone-900">
                Mental health, explained with care
              </h1>
              <p className="text-xl md:text-2xl text-stone-600">
                Plain-language resources for families navigating grief and mental health
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-stone-700 max-w-2xl mx-auto leading-relaxed">
                We translate the best of mental health and grief care into plain language anyone can use — free, ad-free, and built for the person reading at 2 a.m. who just wants to know what to do next.
              </p>

              {/* What do you need right now? */}
              <div className="mt-12">
                <h2 className="font-serif text-xl text-stone-900 mb-6">What do you need right now?</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Link
                    href="/crisis-support"
                    className="bg-rose-50 p-6 rounded-lg border border-rose-200 hover:border-rose-300 hover:shadow-md transition-all group text-center"
                  >
                    <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-rose-200 transition-colors">
                      <svg className="w-6 h-6 text-rose-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-stone-900 group-hover:text-rose-900">In crisis</h3>
                    <p className="text-sm text-stone-600 mt-1">Get immediate help</p>
                  </Link>

                  <Link
                    href="/research/topics"
                    className="bg-soft-aqua/30 p-6 rounded-lg border border-soft-aqua hover:border-deep-teal hover:shadow-md transition-all group text-center"
                  >
                    <div className="w-12 h-12 bg-soft-aqua/50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-soft-aqua transition-colors">
                      <svg className="w-6 h-6 text-deep-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-stone-900 group-hover:text-deep-teal">Learning about a condition</h3>
                    <p className="text-sm text-stone-600 mt-1">Explore topics</p>
                  </Link>

                  <Link
                    href="/tools/chatbot"
                    className="bg-white p-6 rounded-lg border border-stone-200 hover:border-deep-teal hover:shadow-md transition-all group text-center"
                  >
                    <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-soft-aqua/50 transition-colors">
                      <svg className="w-6 h-6 text-stone-700 group-hover:text-deep-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-stone-900 group-hover:text-deep-teal">Supporting someone</h3>
                    <p className="text-sm text-stone-600 mt-1">How to help a loved one</p>
                  </Link>

                  <Link
                    href="/learn"
                    className="bg-white p-6 rounded-lg border border-stone-200 hover:border-deep-teal hover:shadow-md transition-all group text-center"
                  >
                    <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-soft-aqua/50 transition-colors">
                      <svg className="w-6 h-6 text-stone-700 group-hover:text-deep-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-stone-900 group-hover:text-deep-teal">Just looking</h3>
                    <p className="text-sm text-stone-600 mt-1">Browse all resources</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resource Guide Section */}
        <section className="py-16 bg-stone-50 border-y border-stone-200">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="font-serif text-2xl text-center text-stone-900 mb-3">Need help finding resources?</h2>
            <p className="text-center text-stone-600 mb-10">Tell us what you&apos;re going through and we&apos;ll help you find what you need</p>

            <div className="max-w-2xl mx-auto">
              <Link
                href="/tools/chatbot"
                className="group block p-8 bg-white rounded-xl border border-stone-200 hover:shadow-lg hover:border-deep-teal transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-soft-aqua/30 rounded-full flex items-center justify-center group-hover:bg-soft-aqua/50 transition-colors flex-shrink-0">
                    <svg className="w-8 h-8 text-deep-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-serif text-xl text-stone-900 mb-2 group-hover:text-deep-teal transition-colors">
                      Ask our resource guide
                    </h3>
                    <p className="text-stone-600">
                      Describe your situation and get matched with trusted resources, research summaries, and practical tools.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-deep-teal text-white group-hover:bg-forest-teal transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 bg-warm-cream">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="font-serif text-4xl text-center text-stone-900 mb-16">Our mission</h2>

            <div className="prose prose-lg mx-auto text-stone-700 space-y-6">
              <p className="leading-relaxed">
                Mental health research is fragmented, locked behind paywalls, and often inaccessible to the people who need it most. Families dealing with grief, individuals struggling with PTSD or trauma, and anyone facing depression or anxiety are left to navigate an overwhelming, disconnected landscape.
              </p>

              <p className="leading-relaxed">
                We change this. We read the research so you don&apos;t have to — reviewing thousands of studies and translating academic findings into plain-language guidance, practical tools, and curated resources that families can actually use.
              </p>

              <p className="leading-relaxed font-medium text-deep-teal">
                Because understanding is the first step toward healing.
              </p>
            </div>
          </div>
        </section>

        {/* How We Help Section */}
        <section className="py-24 bg-stone-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-serif text-4xl text-center text-stone-900 mb-4">How we help</h2>
            <p className="text-center text-stone-600 mb-16 text-lg">Research translated into resources you can use</p>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Pillar 1: Research */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-soft-aqua/50 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-deep-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl text-stone-900">Research library</h3>
                </div>
                <p className="text-stone-700 leading-relaxed">
                  Our team reviews the latest studies on grief, trauma, depression, and anxiety — then translates complex findings into plain-language summaries anyone can understand.
                </p>
                <ul className="space-y-3 text-stone-700">
                  <li className="flex items-start">
                    <span className="text-deep-teal mr-3">•</span>
                    <span>Weekly research digests in plain language</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-deep-teal mr-3">•</span>
                    <span>Deep-dive reports on emerging findings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-deep-teal mr-3">•</span>
                    <span>Searchable library of curated research</span>
                  </li>
                </ul>
                <Link
                  href="/research"
                  className="inline-block bg-deep-teal text-white px-6 py-3 rounded-lg hover:bg-forest-teal transition-colors"
                >
                  Browse research
                </Link>
              </div>

              {/* Pillar 2: Tools */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-soft-aqua/50 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-deep-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl text-stone-900">Practical tools</h3>
                </div>
                <p className="text-stone-700 leading-relaxed">
                  Beyond research, we build tools that meet you where you are. Our resource guide helps you find answers, and our curated links connect you with trusted professional resources.
                </p>
                <ul className="space-y-3 text-stone-700">
                  <li className="flex items-start">
                    <span className="text-deep-teal mr-3">•</span>
                    <span>Resource guide for personalized help</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-deep-teal mr-3">•</span>
                    <span>Searchable resource library by topic</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-deep-teal mr-3">•</span>
                    <span>Links to therapists and support groups</span>
                  </li>
                </ul>
                <Link
                  href="/tools/chatbot"
                  className="inline-block bg-deep-teal text-white px-6 py-3 rounded-lg hover:bg-forest-teal transition-colors"
                >
                  Get help finding resources
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Topics Section */}
        <section className="py-24 bg-warm-cream">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-serif text-4xl text-center text-stone-900 mb-4">Topics we cover</h2>
            <p className="text-center text-stone-600 mb-16 text-lg">Focused resources for each area of mental health</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link
                href="/research/topics/grief"
                className="p-6 bg-white rounded-lg border border-stone-200 hover:shadow-md hover:border-deep-teal transition-all group"
              >
                <h3 className="font-serif text-lg text-stone-900 group-hover:text-deep-teal transition-colors">Grief & loss</h3>
                <p className="text-sm text-stone-600 mt-2">Child loss, complicated grief, bereavement</p>
              </Link>

              <Link
                href="/research/topics/ptsd"
                className="p-6 bg-white rounded-lg border border-stone-200 hover:shadow-md hover:border-deep-teal transition-all group"
              >
                <h3 className="font-serif text-lg text-stone-900 group-hover:text-deep-teal transition-colors">PTSD & trauma</h3>
                <p className="text-sm text-stone-600 mt-2">Medical trauma, CPTSD, childhood trauma</p>
              </Link>

              <Link
                href="/research/topics/depression"
                className="p-6 bg-white rounded-lg border border-stone-200 hover:shadow-md hover:border-deep-teal transition-all group"
              >
                <h3 className="font-serif text-lg text-stone-900 group-hover:text-deep-teal transition-colors">Depression</h3>
                <p className="text-sm text-stone-600 mt-2">Clinical depression, treatment-resistant, SAD</p>
              </Link>

              <Link
                href="/research/topics/anxiety"
                className="p-6 bg-white rounded-lg border border-stone-200 hover:shadow-md hover:border-deep-teal transition-all group"
              >
                <h3 className="font-serif text-lg text-stone-900 group-hover:text-deep-teal transition-colors">Anxiety</h3>
                <p className="text-sm text-stone-600 mt-2">Generalized anxiety, social anxiety, panic</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Origin Story Preview */}
        <section className="py-24 bg-stone-50">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-serif text-4xl text-stone-900 mb-8">Why we do this</h2>
            <p className="text-xl text-stone-600 leading-relaxed mb-8">
              Faith Marie was born in 2019 with a complicated heart condition and lived for 21 precious days. Her short life left a permanent mark on her family and became the driving force behind this foundation.
            </p>
            <p className="text-lg text-stone-700 leading-relaxed mb-12">
              We exist because no family should navigate grief, trauma, or mental health struggles without accessible, modern support — and because Faith Marie&apos;s name deserves to be connected to something that helps others heal.
            </p>
            <Link
              href="/our-story"
              className="inline-block bg-deep-teal text-white px-8 py-4 rounded-lg text-lg hover:bg-forest-teal transition-colors"
            >
              Read our full story
            </Link>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-24 bg-warm-cream">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl text-stone-900 mb-4">Stay updated</h2>
            <p className="text-stone-600 mb-8">
              Get research insights delivered to your inbox. Choose the topics that matter most to you.
            </p>
            <div className="bg-white rounded-lg p-8 border border-stone-200">
              <NewsletterForm variant="full" />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-forest-teal">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-serif text-4xl text-stone-50 mb-6">Join our mission</h2>
            <p className="text-xl text-stone-50/80 mb-12">
              Help us make mental health resources accessible to everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-involved"
                className="bg-white text-forest-teal px-8 py-4 rounded-lg text-lg font-medium hover:bg-stone-50 transition-colors"
              >
                Get involved
              </Link>
              <Link
                href="/research"
                className="bg-deep-teal text-white px-8 py-4 rounded-lg text-lg border border-deep-teal/50 hover:bg-forest-teal/80 transition-colors"
              >
                Browse research
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

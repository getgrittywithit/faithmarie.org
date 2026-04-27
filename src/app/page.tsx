'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import NewsletterForm from '@/components/NewsletterForm';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section - Utility First */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-50 to-white">
          <div className="text-center space-y-8 px-4 max-w-4xl mx-auto pt-20">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-light text-gray-800">
                Faith Marie Foundation
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-light">
                Helping every family navigating grief and mental health find the resources and guidance they need
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
                After losing our daughter Faith Marie, we found that the help families need most is often the hardest to find. The Faith Marie Foundation exists to change that — helping every family find the trusted resources, practical tools, and plain-language guidance they need, when they need it.
              </p>

              {/* What do you need right now? Chooser */}
              <div className="mt-12">
                <h2 className="text-xl font-medium text-gray-800 mb-6">What do you need right now?</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Link
                    href="/learn#crisis"
                    className="bg-red-50 p-6 rounded-lg border-2 border-red-100 hover:border-red-300 hover:shadow-md transition-all group text-center"
                  >
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-red-200 transition-colors">
                      <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-800 group-hover:text-red-700">In Crisis</h3>
                    <p className="text-sm text-gray-600 mt-1">Get immediate help</p>
                  </Link>

                  <Link
                    href="/research/topics"
                    className="bg-teal-50 p-6 rounded-lg border-2 border-teal-100 hover:border-teal-300 hover:shadow-md transition-all group text-center"
                  >
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-teal-200 transition-colors">
                      <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-800 group-hover:text-teal-700">Learning About a Condition</h3>
                    <p className="text-sm text-gray-600 mt-1">Explore topics</p>
                  </Link>

                  <Link
                    href="/tools/chatbot"
                    className="bg-amber-50 p-6 rounded-lg border-2 border-amber-100 hover:border-amber-300 hover:shadow-md transition-all group text-center"
                  >
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-amber-200 transition-colors">
                      <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-800 group-hover:text-amber-700">Supporting Someone</h3>
                    <p className="text-sm text-gray-600 mt-1">How to help a loved one</p>
                  </Link>

                  <Link
                    href="/learn"
                    className="bg-indigo-50 p-6 rounded-lg border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-md transition-all group text-center"
                  >
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-indigo-200 transition-colors">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-800 group-hover:text-indigo-700">Just Looking</h3>
                    <p className="text-sm text-gray-600 mt-1">Browse all resources</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research Guide Section */}
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-light text-center text-gray-800 mb-3">Need help finding resources?</h2>
            <p className="text-center text-gray-500 mb-10">Tell us what you&apos;re going through and we&apos;ll help you find what you need</p>

            <div className="max-w-2xl mx-auto">
              <Link
                href="/tools/chatbot"
                className="group block p-8 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border border-teal-100 hover:shadow-lg hover:border-teal-300 transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center group-hover:bg-teal-200 transition-colors flex-shrink-0">
                    <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-medium text-gray-800 mb-2 group-hover:text-teal-700 transition-colors">
                      Ask Our Research Guide
                    </h3>
                    <p className="text-gray-600">
                      Describe your situation and get matched with trusted resources, research summaries, and practical tools.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-teal-600 text-white group-hover:bg-teal-700 transition-colors">
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
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-light text-center text-gray-800 mb-16">Our Mission</h2>

            <div className="prose prose-lg mx-auto text-gray-700 space-y-6">
              <p className="leading-relaxed">
                Mental health research is fragmented, locked behind paywalls, and often inaccessible to the people who need it most.
                Families dealing with grief, individuals struggling with PTSD or trauma, and anyone facing depression or anxiety
                are left to navigate an overwhelming, disconnected landscape.
              </p>

              <p className="leading-relaxed">
                The Faith Marie Foundation changes this. We read the research so you don&apos;t have to — reviewing thousands of
                studies and translating academic findings into plain-language guidance, practical tools, and curated resources
                that families can actually use.
              </p>

              <p className="leading-relaxed font-medium text-teal-700">
                Because understanding is the first step toward healing.
              </p>
            </div>
          </div>
        </section>

        {/* How We Help Section */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-light text-center text-gray-800 mb-4">How We Help</h2>
            <p className="text-center text-gray-600 mb-16 text-lg">Research translated into resources you can use</p>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Pillar 1: Research */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-medium text-gray-800">Research Library</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Our team reviews the latest studies on grief, trauma, depression, and anxiety — then translates
                  complex findings into plain-language summaries anyone can understand.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-3">•</span>
                    <span>Weekly research digests in plain language</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-3">•</span>
                    <span>Deep-dive reports on emerging findings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-3">•</span>
                    <span>Searchable library of curated research</span>
                  </li>
                </ul>
                <Link
                  href="/research"
                  className="inline-block bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-colors"
                >
                  Browse Research
                </Link>
              </div>

              {/* Pillar 2: Tools */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-medium text-gray-800">Practical Tools</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Beyond research, we build tools that meet you where you are. Our resource guide helps you find
                  answers, and our curated links connect you with trusted professional resources.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-3">•</span>
                    <span>Research guide for personalized help</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-3">•</span>
                    <span>Searchable resource library by topic</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-3">•</span>
                    <span>Links to therapists and support groups</span>
                  </li>
                </ul>
                <Link
                  href="/tools/chatbot"
                  className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Get Help Finding Resources
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Topics Section */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-light text-center text-gray-800 mb-4">Topics We Cover</h2>
            <p className="text-center text-gray-600 mb-16 text-lg">Focused resources for each area of mental health</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link
                href="/research/topics/grief"
                className="p-6 bg-amber-50 rounded-lg border border-amber-100 hover:shadow-md hover:border-amber-200 transition-all group"
              >
                <div className="text-3xl mb-4">💔</div>
                <h3 className="font-medium text-gray-800 group-hover:text-amber-700 transition-colors">Grief & Loss</h3>
                <p className="text-sm text-gray-600 mt-2">Child loss, complicated grief, bereavement</p>
              </Link>

              <Link
                href="/research/topics/ptsd"
                className="p-6 bg-red-50 rounded-lg border border-red-100 hover:shadow-md hover:border-red-200 transition-all group"
              >
                <div className="text-3xl mb-4">🛡️</div>
                <h3 className="font-medium text-gray-800 group-hover:text-red-700 transition-colors">PTSD & Trauma</h3>
                <p className="text-sm text-gray-600 mt-2">Medical trauma, CPTSD, childhood trauma</p>
              </Link>

              <Link
                href="/research/topics/depression"
                className="p-6 bg-blue-50 rounded-lg border border-blue-100 hover:shadow-md hover:border-blue-200 transition-all group"
              >
                <div className="text-3xl mb-4">🌧️</div>
                <h3 className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors">Depression</h3>
                <p className="text-sm text-gray-600 mt-2">Clinical depression, treatment-resistant, SAD</p>
              </Link>

              <Link
                href="/research/topics/anxiety"
                className="p-6 bg-purple-50 rounded-lg border border-purple-100 hover:shadow-md hover:border-purple-200 transition-all group"
              >
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="font-medium text-gray-800 group-hover:text-purple-700 transition-colors">Anxiety</h3>
                <p className="text-sm text-gray-600 mt-2">Generalized anxiety, social anxiety, panic</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Origin Story Preview */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-light text-gray-800 mb-8">Why We Do This</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Faith Marie was born in 2019 with a complicated heart condition and lived for 21 precious days.
              Her short life left a permanent mark on her family and became the driving force behind this Foundation.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-12">
              We exist because no family should navigate grief, trauma, or mental health struggles without accessible, modern support —
              and because Faith Marie&apos;s name deserves to be connected to something that helps others heal.
            </p>
            <Link
              href="/our-story"
              className="inline-block bg-teal-700 text-white px-8 py-4 rounded-md text-lg hover:bg-teal-800 transition-colors"
            >
              Read Our Full Story
            </Link>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-24 bg-white">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-light text-gray-800 mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-8">
              Get research insights delivered to your inbox. Choose the topics that matter most to you.
            </p>
            <div className="bg-gray-50 rounded-lg p-8">
              <NewsletterForm variant="full" />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-teal-700">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-light text-white mb-6">Join Our Mission</h2>
            <p className="text-xl text-teal-100 mb-12">
              Help us make mental health resources accessible to everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-involved"
                className="bg-white text-teal-700 px-8 py-4 rounded-md text-lg font-medium hover:bg-teal-50 transition-colors"
              >
                Get Involved
              </Link>
              <Link
                href="/research"
                className="bg-teal-600 text-white px-8 py-4 rounded-md text-lg border border-teal-500 hover:bg-teal-800 transition-colors"
              >
                Browse Research
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

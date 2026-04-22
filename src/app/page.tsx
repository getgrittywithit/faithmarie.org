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
        {/* Hero Section */}
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

              <div className="grid md:grid-cols-2 gap-6 mt-12">
                <Link
                  href="/research"
                  className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-teal-200 transition-all group"
                >
                  <h3 className="text-lg font-medium text-gray-800 mb-4 group-hover:text-teal-700 transition-colors">
                    Explore Research
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Daily digests and deep dives on the latest mental health research, translated into plain language.
                  </p>
                  <span className="inline-block bg-teal-100 text-teal-700 py-2 px-4 rounded-md group-hover:bg-teal-200 transition-colors">
                    View Research
                  </span>
                </Link>

                <Link
                  href="/tools/chatbot"
                  className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all group"
                >
                  <h3 className="text-lg font-medium text-gray-800 mb-4 group-hover:text-indigo-700 transition-colors">
                    Get Support
                  </h3>
                  <p className="text-gray-600 mb-6">
                    AI-powered tools including our empathetic chatbot and curated resource finder.
                  </p>
                  <span className="inline-block bg-indigo-100 text-indigo-700 py-2 px-4 rounded-md group-hover:bg-indigo-200 transition-colors">
                    Access Tools
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Audience Navigation Section */}
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-light text-center text-gray-800 mb-3">How can we help you today?</h2>
            <p className="text-center text-gray-500 mb-10">Find the right resources for your situation</p>

            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/research/topics/grief"
                className="group p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100 hover:shadow-lg hover:border-amber-300 transition-all"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-colors">
                  <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">I&apos;m grieving</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Research-backed resources and support for navigating loss and grief.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Grief research digests</li>
                  <li>• AI support chatbot</li>
                  <li>• Crisis resources</li>
                </ul>
              </Link>

              <Link
                href="/tools/chatbot"
                className="group p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border border-teal-100 hover:shadow-lg hover:border-teal-300 transition-all"
              >
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-teal-200 transition-colors">
                  <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">I&apos;m supporting someone</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Learn how to help a loved one through grief, trauma, or mental health challenges.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Understanding their experience</li>
                  <li>• How to help resources</li>
                  <li>• Self-care for caregivers</li>
                </ul>
              </Link>

              <Link
                href="/about/ai-transparency"
                className="group p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 hover:shadow-lg hover:border-indigo-300 transition-all"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">I&apos;m a professional</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Research methodology, partnership opportunities, and resources to share with clients.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• AI transparency docs</li>
                  <li>• Research methodology</li>
                  <li>• Partnership inquiries</li>
                </ul>
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
                The Faith Marie Foundation changes this. We use autonomous AI agent teams to continuously scan academic papers,
                synthesize findings, and publish accessible daily digests and in-depth reports. We&apos;re building the tools
                and knowledge that help people find their way through darkness.
              </p>

              <p className="leading-relaxed font-medium text-teal-700">
                Because understanding is the first step toward healing.
              </p>
            </div>
          </div>
        </section>

        {/* Two Pillars Section */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-light text-center text-gray-800 mb-4">How We Help</h2>
            <p className="text-center text-gray-600 mb-16 text-lg">Two pillars of support, powered by AI</p>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Pillar 1: Research */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-medium text-gray-800">AI-Powered Research</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Our autonomous AI teams each focus on a specific topic area — grief, PTSD, depression, and anxiety.
                  Every day, they scan new papers, synthesize findings, and publish accessible summaries.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-3">•</span>
                    <span>Daily research digests in plain language</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-3">•</span>
                    <span>Deep-dive reports on emerging findings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-3">•</span>
                    <span>Searchable knowledge base of curated research</span>
                  </li>
                </ul>
                <Link
                  href="/research"
                  className="inline-block bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-colors"
                >
                  Explore Research
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
                  <h3 className="text-2xl font-medium text-gray-800">Direct Support Tools</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Beyond research, we build tools that meet you where you are. Our AI chatbot provides empathetic,
                  resource-backed support, while our knowledge base helps you find answers.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-3">•</span>
                    <span>AI chatbot for real-time support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-3">•</span>
                    <span>Searchable knowledge base for your situation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-3">•</span>
                    <span>Resource finder for local therapists and support groups</span>
                  </li>
                </ul>
                <Link
                  href="/tools/chatbot"
                  className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Access Tools
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Topics Section */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-light text-center text-gray-800 mb-4">Research Topics</h2>
            <p className="text-center text-gray-600 mb-16 text-lg">Focused AI teams for each area of mental health</p>

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
              Get research insights delivered twice weekly. Choose the topics that matter most to you.
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
              Help us make mental health research accessible to everyone.
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
                Explore Research
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

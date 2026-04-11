import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatInterface from '@/components/ChatInterface';
import Link from 'next/link';
import { AlertTriangle, BookOpen, Shield, MessageCircle } from 'lucide-react';

export const metadata = {
  title: "Research Assistant | Faith Marie Foundation",
  description: "An AI assistant that helps you understand mental health research published by the Faith Marie Foundation.",
};

export default function ChatbotPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 bg-white">
        {/* Hero */}
        <section className="py-12 bg-gradient-to-b from-teal-50 to-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
              </span>
              Beta
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
              Research Assistant
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ask questions about mental health research. Get plain-language explanations
              based on our published digests.
            </p>
          </div>
        </section>

        {/* Important Disclaimer */}
        <section className="py-4 bg-amber-50 border-y border-amber-200">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-3 text-amber-800">
              <AlertTriangle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">
                <strong>Important:</strong> This is an AI research assistant, not a therapist or medical professional.
                For personal mental health support, please consult a licensed provider.{' '}
                <Link href="/crisis-support" className="underline font-medium">
                  Crisis resources available here.
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Chat Interface */}
        <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <ChatInterface />
          </div>
        </section>

        {/* What This Assistant Does */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-medium text-center text-gray-800 mb-12">
              How This Assistant Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Grounded in Research</h3>
                <p className="text-gray-600 text-sm">
                  Responses are based only on research digests we&apos;ve published and reviewed,
                  not general internet knowledge.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Safety First</h3>
                <p className="text-gray-600 text-sm">
                  Crisis detection automatically connects you with professional
                  support resources when needed.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Plain Language</h3>
                <p className="text-gray-600 text-sm">
                  Complex research findings explained in everyday language
                  that anyone can understand.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What It Can & Can't Do */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-teal-50 rounded-xl p-6">
                <h3 className="font-medium text-teal-800 mb-4 flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  What It Can Do
                </h3>
                <ul className="space-y-2 text-sm text-teal-700">
                  <li>• Explain research on grief, PTSD, depression, and anxiety</li>
                  <li>• Help you find relevant research digests</li>
                  <li>• Answer questions about specific studies we&apos;ve covered</li>
                  <li>• Provide links to full articles and original sources</li>
                  <li>• Point you toward professional resources</li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-xl p-6">
                <h3 className="font-medium text-red-800 mb-4 flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  What It Cannot Do
                </h3>
                <ul className="space-y-2 text-sm text-red-700">
                  <li>• Provide therapy, counseling, or emotional support</li>
                  <li>• Diagnose mental health conditions</li>
                  <li>• Recommend specific treatments or medications</li>
                  <li>• Replace professional mental health care</li>
                  <li>• Provide crisis intervention (we route to 988)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Example Questions */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-medium text-center text-gray-800 mb-8">
              Try Asking...
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Why does grief come in waves?",
                "How does EMDR work?",
                "Does exercise help with depression?",
                "What is the dual process model?",
                "How much exercise is enough for mental health?",
              ].map((question) => (
                <span
                  key={question}
                  className="bg-white border border-gray-200 px-4 py-2 rounded-full text-sm text-gray-600"
                >
                  &ldquo;{question}&rdquo;
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Crisis Support */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
              <h3 className="font-medium text-red-800 text-lg mb-4">Need Immediate Support?</h3>
              <p className="text-red-700 text-sm mb-6">
                If you&apos;re in crisis or need to talk to someone right now, please reach out to a crisis service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:988"
                  className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  📞 Call 988
                </a>
                <Link
                  href="/crisis-support"
                  className="inline-flex items-center justify-center gap-2 bg-white text-red-700 border border-red-300 px-6 py-3 rounded-lg font-medium hover:bg-red-50 transition-colors"
                >
                  View All Crisis Resources
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

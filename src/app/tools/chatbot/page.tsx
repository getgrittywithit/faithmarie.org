import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: "AI Chatbot | Faith Marie Foundation",
  description: "An empathetic AI chatbot for real-time mental health support, coping strategies, and curated resources.",
};

export default function ChatbotPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-indigo-50 to-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
              AI Support Chatbot
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              An empathetic conversational AI that provides real-time support, coping strategies,
              and curated resources when you need them most.
            </p>
          </div>
        </section>

        {/* Coming Soon State */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            {/* Placeholder Chat UI */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-12">
              <div className="max-w-2xl mx-auto">
                {/* Chat Messages Placeholder */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                      <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="bg-white rounded-lg px-4 py-3 shadow-sm">
                      <p className="text-gray-700">
                        Hello. I&apos;m here to listen and help. You can talk to me about what you&apos;re
                        going through, and I&apos;ll do my best to provide support and resources.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Input Placeholder */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-white rounded-lg border border-gray-200 px-4 py-3 text-gray-400">
                    Coming soon: Type your message here...
                  </div>
                  <button disabled className="bg-indigo-300 text-white px-6 py-3 rounded-lg cursor-not-allowed">
                    Send
                  </button>
                </div>
              </div>
            </div>

            {/* Coming Soon Notice */}
            <div className="text-center">
              <div className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                Coming Soon
              </div>
              <h2 className="text-2xl font-medium text-gray-800 mb-4">We&apos;re Building Something Special</h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Our AI chatbot is being carefully designed to provide empathetic, helpful support.
                We&apos;re training it on the latest mental health research to ensure it can offer
                accurate information and appropriate resources.
              </p>
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-medium text-center text-gray-800 mb-12">What the Chatbot Will Offer</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Empathetic Listening</h3>
                <p className="text-gray-600 text-sm">
                  A judgment-free space to express what you&apos;re going through, with responses designed
                  to make you feel heard and understood.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Evidence-Based Strategies</h3>
                <p className="text-gray-600 text-sm">
                  Coping techniques and strategies backed by the latest mental health research,
                  tailored to your situation.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Curated Resources</h3>
                <p className="text-gray-600 text-sm">
                  Access to our knowledge base with research summaries, guides, and practical
                  information relevant to your needs.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Professional Referrals</h3>
                <p className="text-gray-600 text-sm">
                  When appropriate, guidance on finding therapists, support groups, and professional
                  help in your area.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-8">
              <h3 className="font-medium text-amber-800 mb-4">Important: Not a Replacement for Professional Care</h3>
              <p className="text-amber-700 text-sm mb-4">
                Our AI chatbot is designed to be a first point of contact and ongoing companion, not a
                replacement for professional therapy or medical care. If you&apos;re in crisis or need
                professional help, please reach out to a qualified mental health provider.
              </p>
              <Link
                href="/crisis-support"
                className="inline-block bg-red-600 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
              >
                If You&apos;re in Crisis, Get Help Now
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-indigo-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-medium text-gray-800 mb-4">Get Notified When We Launch</h2>
            <p className="text-gray-600 mb-8">
              Be the first to know when our AI chatbot is ready to help.
            </p>
            <Link
              href="/get-involved"
              className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-md text-lg hover:bg-indigo-700 transition-colors"
            >
              Join the Waitlist
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

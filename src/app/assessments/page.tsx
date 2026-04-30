import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ClipboardCheck, AlertTriangle, Phone } from 'lucide-react';

export const metadata = {
  title: "Mental Health Self-Assessments | Faith Marie Foundation",
  description: "Free, anonymous mental health screening tools to help you understand your symptoms. These validated assessments are educational resources, not diagnoses.",
};

const assessments = [
  {
    id: 'depression',
    name: 'Depression Screening (PHQ-9)',
    description: 'A 9-question tool that screens for symptoms of depression. Takes about 2 minutes.',
    href: '/assessments/depression',
    color: 'bg-blue-50 border-blue-200 hover:border-blue-300',
    iconColor: 'text-blue-600',
  },
  {
    id: 'anxiety',
    name: 'Anxiety Screening (GAD-7)',
    description: 'A 7-question tool that screens for symptoms of generalized anxiety disorder. Takes about 2 minutes.',
    href: '/assessments/anxiety',
    color: 'bg-purple-50 border-purple-200 hover:border-purple-300',
    iconColor: 'text-purple-600',
  },
];

export default function AssessmentsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 bg-white">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-teal-50 to-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ClipboardCheck className="w-8 h-8 text-teal-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
              Mental Health Self-Assessments
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Free, anonymous screening tools to help you understand your symptoms
              and find relevant resources.
            </p>
          </div>
        </section>

        {/* Important Disclaimer */}
        <section className="py-6 bg-amber-50 border-y border-amber-200">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="font-semibold text-amber-800 mb-1">Important Disclaimer</h2>
                <p className="text-amber-700 text-sm">
                  These screening tools are <strong>educational resources, not medical diagnoses</strong>.
                  Only a licensed mental health professional can diagnose mental health conditions.
                  These assessments can help you understand your symptoms and decide whether to seek
                  professional support, but they are not a substitute for professional evaluation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Crisis Banner */}
        <section className="py-4 bg-red-50 border-b border-red-200">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-center gap-3 text-center">
              <Phone className="w-5 h-5 text-red-600" />
              <p className="text-red-700">
                <strong>In crisis?</strong> Call or text <strong>988</strong> (Suicide & Crisis Lifeline)
                or text <strong>HOME</strong> to <strong>741741</strong> (Crisis Text Line)
              </p>
            </div>
          </div>
        </section>

        {/* Assessments Grid */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-medium text-gray-800 mb-8 text-center">
              Choose an Assessment
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {assessments.map((assessment) => (
                <Link
                  key={assessment.id}
                  href={assessment.href}
                  className={`block p-6 rounded-xl border-2 transition-all ${assessment.color}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 bg-white rounded-lg ${assessment.iconColor}`}>
                      <ClipboardCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {assessment.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {assessment.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Coming Soon */}
            <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200 text-center">
              <p className="text-gray-600">
                <strong>Coming soon:</strong> PTSD screening (PCL-5) and Prolonged Grief assessment (PG-13)
              </p>
            </div>
          </div>
        </section>

        {/* About These Tools */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-medium text-gray-800 mb-8 text-center">
              About These Screening Tools
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-3">Validated & Research-Based</h3>
                <p className="text-gray-600 text-sm">
                  The PHQ-9 and GAD-7 are clinically validated screening tools developed by
                  researchers and used by healthcare providers worldwide. They&apos;ve been tested
                  in numerous studies for accuracy and reliability.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-3">Completely Anonymous</h3>
                <p className="text-gray-600 text-sm">
                  Your responses are anonymous by default. We don&apos;t collect any personally
                  identifying information. Aggregate data helps us understand what resources
                  our community needs most.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-3">Educational Purpose</h3>
                <p className="text-gray-600 text-sm">
                  These tools help you understand your symptoms and connect you with
                  research-backed information. They&apos;re a starting point for understanding,
                  not a replacement for professional care.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-3">Connected to Resources</h3>
                <p className="text-gray-600 text-sm">
                  After completing an assessment, you&apos;ll receive personalized recommendations
                  for research articles, coping strategies, and professional resources based
                  on your results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              Need Help Finding Support?
            </h2>
            <p className="text-gray-600 mb-8">
              If you&apos;re looking for professional mental health support, we&apos;ve curated
              resources to help you find the right care.
            </p>
            <Link
              href="/find-help"
              className="inline-block bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Find Help Resources
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

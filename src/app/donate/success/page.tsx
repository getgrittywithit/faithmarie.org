import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: "Thank You | Faith Marie Foundation",
  description: "Thank you for your donation to the Faith Marie Foundation.",
};

export default function DonateSuccessPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 py-24 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-4xl font-light text-gray-800 mb-6">
            Thank You for Your Donation
          </h1>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Your generosity helps us make mental health research accessible to everyone.
            Together, we&apos;re building tools and resources that support people navigating
            grief, trauma, depression, and anxiety.
          </p>

          <div className="bg-teal-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-medium text-gray-800 mb-2">What Your Donation Supports</h2>
            <ul className="text-gray-600 text-sm space-y-2">
              <li>Reviewing research and translating it into plain-language guidance</li>
              <li>Building tools like our resource guide and knowledge base</li>
              <li>Creating a searchable library of mental health resources</li>
              <li>Keeping all our tools free and accessible</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-teal-600 text-white px-8 py-3 rounded-md hover:bg-teal-700 transition-colors"
            >
              Return Home
            </Link>
            <Link
              href="/research"
              className="bg-white text-teal-600 border border-teal-600 px-8 py-3 rounded-md hover:bg-teal-50 transition-colors"
            >
              Explore Our Research
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-12">
            A receipt has been sent to your email. If you have any questions,
            contact us at{' '}
            <a href="mailto:info@faithmarie.org" className="text-teal-600 hover:underline">
              info@faithmarie.org
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

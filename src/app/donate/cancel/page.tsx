import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: "Donation Cancelled | Faith Marie Foundation",
  description: "Your donation was cancelled. You can try again anytime.",
};

export default function DonateCancelPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 py-24 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          <h1 className="text-4xl font-light text-gray-800 mb-6">
            Donation Cancelled
          </h1>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            No worries! Your donation was cancelled and no payment was processed.
            If you&apos;d like to support our mission another time, we&apos;d be grateful.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-involved"
              className="bg-teal-600 text-white px-8 py-3 rounded-md hover:bg-teal-700 transition-colors"
            >
              Try Again
            </Link>
            <Link
              href="/"
              className="bg-white text-gray-700 border border-gray-200 px-8 py-3 rounded-md hover:bg-gray-50 transition-colors"
            >
              Return Home
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-12">
            There are other ways to help too — spread the word, volunteer, or partner with us.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

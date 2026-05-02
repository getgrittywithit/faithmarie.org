import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MemorialWizard from '@/components/memorials/MemorialWizard';
import { Heart, Clock, Shield, Users } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Create a Memorial | Faith Marie Foundation',
  description: 'Create a free, lasting memorial for your loved one. A beautiful tribute that helps preserve their memory for generations.',
};

export default function CreateMemorialPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 bg-white">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-teal-50 to-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Heart className="w-12 h-12 text-teal-600 mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
              Create a Memorial
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A free memorial site that lasts. Built by the Faith Marie Foundation to help families
              honor and remember those they&apos;ve lost.
            </p>
          </div>
        </section>

        {/* What You Get Section */}
        <section className="py-12 border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-8 text-center">
              What&apos;s Included
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">10+ Years of Hosting</h3>
                <p className="text-sm text-gray-600">
                  Your memorial stays online for at least 10 years, with free renewal
                </p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Archive Guarantee</h3>
                <p className="text-sm text-gray-600">
                  Download your memorial anytime. We&apos;ll always provide a copy
                </p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Collaborative Editing</h3>
                <p className="text-sm text-gray-600">
                  Invite family members to contribute photos and stories
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Example Preview */}
        <section className="py-12 border-b border-gray-100 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-sm text-gray-500 mb-4">SEE WHAT A MEMORIAL LOOKS LIKE</p>
            <Link
              href="/in-memory/faith-marie-moses"
              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
            >
              View Faith Marie&apos;s Memorial
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </section>

        {/* Wizard Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-2xl mx-auto px-4">
            <MemorialWizard />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-gray-50 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-8 text-center">
              Common Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Is it really free?</h3>
                <p className="text-gray-600 text-sm">
                  We suggest a $20 donation to cover hosting costs, but we have a hardship waiver
                  for anyone who needs it. No one is turned away for inability to pay.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">How long does approval take?</h3>
                <p className="text-gray-600 text-sm">
                  Most memorials are reviewed and published within 24-48 hours. You can continue
                  editing while your memorial is being reviewed.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Who can see the memorial?</h3>
                <p className="text-gray-600 text-sm">
                  You choose: public memorials can be found by anyone, while password-protected
                  memorials are only accessible to people you share the password with.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Can I remove the memorial later?</h3>
                <p className="text-gray-600 text-sm">
                  Yes. As the creator, you can take down the memorial at any time, no questions asked.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

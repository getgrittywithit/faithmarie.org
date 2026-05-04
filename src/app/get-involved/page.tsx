import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import DonateButton from '@/components/DonateButton';
import NewsletterForm from '@/components/NewsletterForm';
import VolunteerModal from '@/components/VolunteerModal';
import PartnerModal from '@/components/PartnerModal';
import SocialShareButtons from '@/components/SocialShareButtons';

export const metadata = {
  title: "Get Involved | Faith Marie Foundation",
  description: "Join our mission to make mental health research accessible to everyone. Donate, volunteer, or spread awareness.",
};

export default function GetInvolvedPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 bg-warm-cream">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-6xl text-stone-900 mb-6">
              Get involved
            </h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Help us make mental health resources accessible to every family. Your support directly powers
              the research, tools, and guidance that help people heal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg border border-stone-200">
              <div className="w-12 h-12 bg-soft-aqua/30 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-deep-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-stone-900 mb-4">Donate</h2>
              <p className="text-stone-600 mb-6">
                Your donation powers our research operations, content creation, and the development
                of tools that make mental health support accessible to everyone who needs it.
              </p>
              <DonateButton />
            </div>

            <div className="bg-white p-8 rounded-lg border border-stone-200">
              <div className="w-12 h-12 bg-vibrant-teal/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-vibrant-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-stone-900 mb-4">Stay updated</h2>
              <p className="text-stone-600 mb-6">
                Be the first to know when we launch new features, publish research digests, or need
                support. Join our community of people committed to mental health accessibility.
              </p>
              <NewsletterForm />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg border border-stone-200">
              <div className="w-12 h-12 bg-light-champagne/50 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-champagne-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-stone-900 mb-4">Volunteer</h2>
              <p className="text-stone-600 mb-6">
                We&apos;re looking for mental health professionals, researchers, writers, and tech
                volunteers to help review content, improve our tools, and expand our reach.
              </p>
              <VolunteerModal />
            </div>

            <div className="bg-white p-8 rounded-lg border border-stone-200">
              <div className="w-12 h-12 bg-forest-teal/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-forest-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-stone-900 mb-4">Partner with us</h2>
              <p className="text-stone-600 mb-6">
                Are you a mental health organization, university, or company interested in partnering?
                We&apos;d love to explore how we can work together to expand access to research.
              </p>
              <PartnerModal />
            </div>
          </div>

          {/* Sponsor a Memorial */}
          <div className="bg-white p-8 rounded-lg border border-stone-200 mb-12">
            <div className="md:flex md:items-center md:gap-8">
              <div className="flex-shrink-0 mb-6 md:mb-0">
                <div className="w-16 h-16 bg-light-champagne/50 rounded-full flex items-center justify-center mx-auto md:mx-0">
                  <svg className="w-8 h-8 text-champagne-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-serif text-2xl text-stone-900 mb-3">Sponsor a memorial</h2>
                <p className="text-stone-600 mb-4">
                  Help a grieving family create a lasting tribute when cost is a barrier. Your $20 donation
                  covers the full cost of a memorial site for a family experiencing hardship.
                </p>
                <Link
                  href="/donate?purpose=memorial-sponsorship"
                  className="inline-block bg-deep-teal text-white px-6 py-3 rounded-lg hover:bg-forest-teal transition-colors"
                >
                  Sponsor a family
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-soft-aqua/30 p-8 rounded-lg text-center mb-12">
            <h2 className="font-serif text-2xl text-stone-900 mb-4">Spread the word</h2>
            <p className="text-stone-600 mb-6 max-w-2xl mx-auto">
              Help others find the resources they need by sharing Faith Marie Foundation with your network.
              Every share helps someone discover accessible mental health research.
            </p>
            <SocialShareButtons />
          </div>

          {/* How Funds Are Used */}
          <div className="bg-white p-8 rounded-lg border border-stone-200">
            <h2 className="font-serif text-2xl text-stone-900 mb-6 text-center">How your support is used</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium text-stone-900 mb-4">Research & content</h3>
                <p className="text-stone-600 text-sm mb-4">
                  Reviewing studies, translating findings into plain language, and creating guides
                  families can actually use.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-stone-900 mb-4">Platform development</h3>
                <p className="text-stone-600 text-sm mb-4">
                  Building and maintaining faithmarie.org, the resource guide, knowledge base, and
                  other tools that help families find support.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-stone-900 mb-4">Operations & administration</h3>
                <p className="text-stone-600 text-sm mb-4">
                  Nonprofit administration, legal compliance, accounting, and keeping the foundation running smoothly.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-stone-900 mb-4">Outreach & awareness</h3>
                <p className="text-stone-600 text-sm mb-4">
                  Reaching people who need these tools and resources, and connecting with the mental health community.
                </p>
              </div>
            </div>
          </div>

          {/* Faith Marie Note */}
          <div className="mt-12 text-center">
            <p className="text-stone-500 italic max-w-2xl mx-auto">
              &quot;Every contribution, no matter how small, helps extend Faith Marie&apos;s legacy —
              ensuring that no one has to navigate mental health challenges without accessible, modern support.&quot;
            </p>
            <Link href="/our-story" className="inline-block mt-4 text-deep-teal hover:text-forest-teal">
              Read Faith Marie&apos;s story →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GriefSeriesSignup from '@/components/GriefSeriesSignup';
import Link from 'next/link';
import { Heart, Calendar, BookOpen, Shield, Mail } from 'lucide-react';

export const metadata = {
  title: "7-Day Grief Research Series | Faith Marie Foundation",
  description: "A free 7-day email series bringing you research-backed insights on grief, delivered with compassion. Understand what you're experiencing and learn you're not alone.",
};

const seriesOutline = [
  { day: 1, title: "You're Not Broken", description: "Understanding why grief feels so overwhelming" },
  { day: 2, title: "Why Grief Comes in Waves", description: "The Dual Process Model and healthy coping" },
  { day: 3, title: "There Is No Timeline", description: "What to do when people expect you to 'move on'" },
  { day: 4, title: "Grief vs. Depression", description: "Knowing when additional support might help" },
  { day: 5, title: "Surviving the Hard Moments", description: "Research-backed strategies for acute pain" },
  { day: 6, title: "Navigating Anniversaries", description: "Preparing for dates that bring grief back" },
  { day: 7, title: "Carrying Grief Forward", description: "Not moving on, but moving with" },
];

export default function GriefSeriesPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 bg-white">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Mail className="h-4 w-4" />
                Free 7-Day Email Series
              </div>
              <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
                Understanding Grief:<br />
                <span className="text-amber-700">A Research-Based Journey</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                One email a day for seven days. Research translated into plain language.
                Compassion in every word. Because you deserve to understand what you&apos;re going through.
              </p>
            </div>

            {/* Signup Box */}
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <GriefSeriesSignup />
            </div>
          </div>
        </section>

        {/* Why This Series */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-medium text-center text-gray-800 mb-12">
              What You&apos;ll Receive
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-amber-700" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Research-Backed</h3>
                <p className="text-gray-600 text-sm">
                  Every insight comes from peer-reviewed research on grief and bereavement,
                  translated into language anyone can understand.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-amber-700" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Compassionate</h3>
                <p className="text-gray-600 text-sm">
                  Written by people who understand loss firsthand. No clinical coldness —
                  just genuine care and understanding.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-amber-700" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Digestible</h3>
                <p className="text-gray-600 text-sm">
                  One email per day, each taking just a few minutes to read.
                  Designed for people who don&apos;t have the energy for more.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Series Outline */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-medium text-center text-gray-800 mb-12">
              The 7-Day Journey
            </h2>

            <div className="space-y-4">
              {seriesOutline.map((item) => (
                <div
                  key={item.day}
                  className="flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100"
                >
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-700 font-medium">{item.day}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-medium text-center text-gray-800 mb-8">
              This Series Is For You If...
            </h2>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="bg-amber-50 rounded-xl p-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    You&apos;ve lost someone and feel like you&apos;re drowning
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    You wonder if what you&apos;re feeling is &quot;normal&quot;
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    People keep telling you to &quot;move on&quot; and it hurts
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    You want to understand grief, not just endure it
                  </li>
                </ul>
              </div>
              <div className="bg-amber-50 rounded-xl p-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    You&apos;re supporting someone who is grieving
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    You&apos;re a therapist or counselor seeking resources
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    You want research without the academic jargon
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    You need something gentle, not overwhelming
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Origin Story Snippet */}
        <section className="py-16 bg-amber-50">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-medium text-gray-800 mb-6">
              Why We Created This
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              The Faith Marie Foundation was born from grief. Our founder lost his daughter,
              Faith Marie, when she was 21 days old. In the aftermath, he searched for
              resources that could help him understand what he was going through — and found
              that most grief research was locked behind paywalls and written in impenetrable
              academic language.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              This series is what we wish had existed for us. Research translated with
              compassion. Delivered gently, one day at a time.
            </p>
            <Link
              href="/our-story"
              className="text-amber-700 hover:text-amber-800 font-medium underline"
            >
              Read our full story →
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-white">
          <div className="max-w-md mx-auto px-4">
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-medium text-gray-800 mb-4">
                Ready to Begin?
              </h2>
              <p className="text-gray-600 mb-6">
                Your first email arrives within minutes of signing up.
              </p>
              <GriefSeriesSignup />
            </div>
          </div>
        </section>

        {/* Crisis Note */}
        <section className="py-8 bg-red-50 border-t border-red-100">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-red-800 font-medium mb-1">
                  If you&apos;re in crisis or having thoughts of self-harm
                </p>
                <p className="text-red-700 text-sm">
                  Please reach out to the 988 Suicide & Crisis Lifeline (call or text 988)
                  or the Crisis Text Line (text HOME to 741741). This email series is
                  educational, not a substitute for professional support.{' '}
                  <Link href="/crisis-support" className="underline font-medium">
                    More crisis resources →
                  </Link>
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

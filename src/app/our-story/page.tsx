import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PhotoGallery from '@/components/PhotoGallery';
import Link from 'next/link';

export const metadata = {
  title: "Our Story | Faith Marie Foundation",
  description: "The story of Faith Marie and how her legacy drives our mission to make mental health research accessible to everyone.",
};

export default function OurStoryPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-6xl font-light text-center text-gray-800 mb-16">
            Our Story
          </h1>

          <div className="prose prose-lg mx-auto text-gray-700 space-y-8">
            <p className="text-xl leading-relaxed font-light text-center text-gray-600 mb-12">
              A story of profound love, unwavering hope, and an enduring mission to help others heal.
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-medium text-gray-800 mb-4">Faith Marie</h2>
                <p className="leading-relaxed">
                  Faith Marie was born in 2019 as the 7th child of the Moses family. She came into the world
                  with a complicated heart condition, facing challenges that no baby should have to endure.
                  In her 21 precious days, she taught her family more about strength, hope, and unconditional
                  love than they could have ever imagined.
                </p>
                <p className="leading-relaxed">
                  Every moment with her was a gift. Her tiny fingers wrapped around theirs, her peaceful
                  moments of rest, and the way she fought with everything she had — these memories remain
                  a permanent mark on everyone who knew her.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-gray-800 mb-4">The Journey Through Grief</h2>
                <p className="leading-relaxed">
                  After Faith Marie passed, her family found themselves navigating an overwhelming landscape
                  of grief and mental health challenges. They searched for resources, for understanding, for
                  anything that could help them make sense of their loss.
                </p>
                <p className="leading-relaxed">
                  What they found was fragmented. Mental health research existed — groundbreaking studies on
                  grief, trauma, and healing — but it was locked behind academic paywalls, written in
                  impenetrable jargon, and disconnected from the people who needed it most.
                </p>
              </section>

              <section className="bg-teal-50 p-8 rounded-lg">
                <h2 className="text-2xl font-medium text-gray-800 mb-4">A New Mission</h2>
                <p className="leading-relaxed">
                  This realization sparked a question: What if the latest mental health research could be
                  made accessible to everyone? What if families dealing with grief, individuals struggling
                  with PTSD, and anyone facing depression or anxiety could have the same access to cutting-edge
                  findings as researchers themselves?
                </p>
                <p className="leading-relaxed">
                  The Faith Marie Foundation was born from this vision. Using autonomous AI agent teams, we
                  now continuously scan academic papers, synthesize findings, and publish accessible daily
                  digests and in-depth reports. We&apos;re building the tools and knowledge that help people
                  find their way through darkness.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-gray-800 mb-4">Why AI?</h2>
                <p className="leading-relaxed">
                  Every day, thousands of research papers are published on mental health topics. No human
                  could possibly read them all. But AI can. Our autonomous research teams scan, analyze,
                  and synthesize this flood of information, translating complex academic language into
                  insights that anyone can understand and apply.
                </p>
                <p className="leading-relaxed">
                  This isn&apos;t about replacing human connection or professional care. It&apos;s about
                  ensuring that the knowledge exists — accessible, searchable, and free — for anyone who
                  needs it. Because understanding is the first step toward healing.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-gray-800 mb-4">Her Legacy Lives On</h2>
                <p className="leading-relaxed">
                  Faith Marie lived for 21 days, but her impact continues to ripple outward. Every research
                  digest we publish, every person who finds understanding through our knowledge base, every
                  moment of comfort provided by our tools — these are all part of her legacy.
                </p>
                <p className="leading-relaxed font-medium text-teal-700">
                  No family should navigate grief, trauma, or mental health struggles without accessible,
                  modern support. In Faith Marie&apos;s name, we&apos;re making sure they don&apos;t have to.
                </p>
              </section>
            </div>
          </div>
        </div>

        {/* Photo Gallery Section */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-light text-center text-gray-800 mb-4">Memories of Faith Marie</h2>
            <p className="text-center text-gray-600 mb-12">Celebrating the precious moments we shared</p>
            <PhotoGallery />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-light text-gray-800 mb-8">Join Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8">
              Help us make mental health research accessible to everyone who needs it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/research"
                className="bg-teal-600 text-white px-8 py-4 rounded-md text-lg hover:bg-teal-700 transition-colors"
              >
                Explore Our Research
              </Link>
              <Link
                href="/get-involved"
                className="bg-gray-100 text-gray-700 px-8 py-4 rounded-md text-lg hover:bg-gray-200 transition-colors"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

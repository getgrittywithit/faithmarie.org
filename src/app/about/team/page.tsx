import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Users, Heart, Brain, DollarSign, Stethoscope, HandHeart } from 'lucide-react';

export const metadata = {
  title: "Our Team | Faith Marie Foundation",
  description: "Meet the team behind the Faith Marie Foundation - dedicated to making mental health research accessible to everyone.",
};

const founders = [
  {
    name: "Levi Moses",
    role: "Co-Founder",
    image: "/images/team/levi-placeholder.jpg",
    bio: `Levi Moses is a technologist and mental health advocate whose life was forever changed by the loss of his daughter, Faith Marie, in 2019. In the years following her passing, Levi navigated the overwhelming landscape of grief, depression, and trauma — and discovered firsthand how inaccessible mental health research was to those who needed it most.

Drawing on his background in software development, Levi envisioned a new approach: translating the flood of academic research into plain-language guidance that families could actually use. What began as a personal search for answers became a mission to ensure no one else has to struggle alone in the dark.

Levi leads the Foundation's technology and content strategy, working to build tools and resources that help families find the support they need.`,
    focus: "Technology & AI Operations",
  },
  {
    name: "Lola Moses",
    role: "Co-Founder",
    image: "/images/team/lola-placeholder.jpg",
    bio: `Lola Moses is a mother, advocate, and the heart of the Faith Marie Foundation. After losing Faith Marie, Lola experienced the full weight of grief, anxiety, and the isolating struggle of finding support that truly understood her pain. She spent countless hours searching for resources, only to find clinical jargon and paywalled studies instead of the compassionate guidance she needed.

That experience ignited her passion to create something different. Lola believes that healing begins with understanding, and that everyone deserves access to the latest research on mental health — written in language that speaks to the human experience, not just the academic one.

Lola oversees the Foundation's community engagement, outreach, and ensures that everything published maintains the compassionate, accessible voice that defines the organization's mission.`,
    focus: "Community & Outreach",
  },
];

const advisoryBoard = [
  {
    role: "Medical Advisor",
    icon: Stethoscope,
    status: "Seeking",
    description: "Licensed psychiatrist or psychologist to provide clinical oversight and ensure research accuracy.",
    color: "text-blue-600 bg-blue-50",
  },
  {
    role: "Financial Advisor",
    icon: DollarSign,
    status: "Seeking",
    description: "CPA or nonprofit finance professional to provide financial oversight and transparency.",
    color: "text-green-600 bg-green-50",
  },
  {
    role: "Community Advisor",
    icon: HandHeart,
    status: "Seeking",
    description: "Mental health advocate or social worker to represent the communities we serve.",
    color: "text-purple-600 bg-purple-50",
  },
];

export default function TeamPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 bg-white">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-6xl font-light text-center text-gray-800 mb-6">
            Our Team
          </h1>
          <p className="text-xl text-center text-gray-600 font-light max-w-2xl mx-auto">
            United by loss, driven by purpose. We&apos;re building the mental health resources
            we wished existed when we needed them most.
          </p>
        </div>

        {/* Founders Section */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-12">
              <Heart className="h-6 w-6 text-teal-600" />
              <h2 className="text-2xl font-medium text-gray-800">Founders</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {founders.map((founder) => (
                <div key={founder.name} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Placeholder for photo */}
                  <div className="h-64 bg-gradient-to-br from-teal-100 to-teal-50 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-teal-200 flex items-center justify-center">
                      <span className="text-4xl font-light text-teal-700">
                        {founder.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-medium text-gray-800">{founder.name}</h3>
                    <p className="text-teal-600 font-medium mb-2">{founder.role}</p>
                    <p className="text-sm text-gray-500 mb-4">{founder.focus}</p>

                    <div className="prose prose-sm text-gray-600">
                      {founder.bio.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className="mb-3 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why We Do This */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-teal-50 rounded-xl p-8 text-center">
              <Brain className="h-10 w-10 text-teal-600 mx-auto mb-4" />
              <h2 className="text-2xl font-medium text-gray-800 mb-4">Why We Do This</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We&apos;ve lived through grief. We&apos;ve battled anxiety and depression. We&apos;ve felt the
                isolation of trauma. And we&apos;ve experienced the frustration of searching for help,
                only to find research locked behind paywalls and written in language no one can understand.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The Faith Marie Foundation exists because we believe no one should have to navigate
                mental health challenges without access to the latest research and evidence-based
                insights. Our daughter&apos;s legacy drives us to make understanding accessible to all.
              </p>
            </div>
          </div>
        </section>

        {/* Advisory Board Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="h-6 w-6 text-teal-600" />
              <h2 className="text-2xl font-medium text-gray-800">Advisory Board</h2>
            </div>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              We&apos;re building an independent advisory board to ensure accountability,
              clinical accuracy, and financial transparency.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {advisoryBoard.map((advisor) => (
                <div
                  key={advisor.role}
                  className="bg-white rounded-xl p-6 border border-gray-200 border-dashed"
                >
                  <div className={`w-12 h-12 rounded-lg ${advisor.color} flex items-center justify-center mb-4`}>
                    <advisor.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">{advisor.role}</h3>
                  <span className="inline-block text-xs font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded mb-3">
                    {advisor.status}
                  </span>
                  <p className="text-sm text-gray-600">{advisor.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                Interested in joining our advisory board?
              </p>
              <Link
                href="/get-involved"
                className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>

        {/* Governance Note */}
        <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-xl font-medium text-gray-800 mb-4">Our Commitment to Governance</h2>
            <p className="text-gray-600 leading-relaxed">
              We&apos;re committed to building a board with independent majority oversight.
              With three advisory positions, our five-member board will ensure that decisions
              are made with accountability, diverse perspectives, and the best interests of
              our community at heart.
            </p>
            <Link
              href="/about"
              className="inline-block mt-6 text-teal-600 hover:text-teal-700 underline"
            >
              Learn more about how we work
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-light text-gray-800 mb-8">Join Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8">
              Whether you&apos;re a mental health professional, researcher, or simply
              someone who believes in accessible mental health resources — we&apos;d love to connect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-involved"
                className="bg-teal-600 text-white px-8 py-4 rounded-md text-lg hover:bg-teal-700 transition-colors"
              >
                Get Involved
              </Link>
              <Link
                href="/our-story"
                className="bg-gray-100 text-gray-700 px-8 py-4 rounded-md text-lg hover:bg-gray-200 transition-colors"
              >
                Read Our Story
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

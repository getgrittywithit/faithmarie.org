import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata = {
  title: "Crisis Support | Faith Marie Foundation",
  description: "Immediate mental health crisis resources and support. If you're in crisis, help is available 24/7.",
};

export default function CrisisSupportPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-light text-gray-800 mb-6">
              Crisis Support
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              You are not alone. If you&apos;re in crisis or struggling, help is available right now.
            </p>
          </div>

          {/* Emergency Resources */}
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-12">
            <h2 className="text-xl font-semibold text-red-800 mb-4">If You&apos;re in Immediate Danger</h2>
            <div className="space-y-3 text-red-700">
              <p><strong>Suicide & Crisis Lifeline:</strong> Call or text <span className="text-xl font-bold">988</span></p>
              <p><strong>Crisis Text Line:</strong> Text <span className="font-bold">HOME</span> to <span className="font-bold">741741</span></p>
              <p><strong>International Association for Suicide Prevention:</strong> <a href="https://www.iasp.info/resources/Crisis_Centres/" className="underline hover:text-red-900">Find your country&apos;s crisis line</a></p>
              <p><strong>Emergency Services:</strong> <span className="font-bold">911</span> (US) or your local emergency number</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Mental Health Crisis */}
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-medium text-gray-800 mb-6">Mental Health Crisis Resources</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium text-gray-800">SAMHSA National Helpline</h3>
                    <p className="text-gray-600">1-800-662-4357 — Free, confidential, 24/7 treatment referral service</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium text-gray-800">NAMI Helpline</h3>
                    <p className="text-gray-600">1-800-950-6264 — Support, information, and referrals</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium text-gray-800">Veterans Crisis Line</h3>
                    <p className="text-gray-600">1-800-273-8255, Press 1 — For veterans, service members, and families</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Specialized Support */}
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-medium text-gray-800 mb-6">Specialized Support</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium text-gray-800">Grief Support</h3>
                    <p className="text-gray-600">GriefShare: 1-800-395-5755 — Support groups and resources</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium text-gray-800">Postpartum Support</h3>
                    <p className="text-gray-600">PSI Warmline: 1-800-944-4773 — Postpartum depression support</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium text-gray-800">Child Loss Support</h3>
                    <p className="text-gray-600">The Compassionate Friends: 1-877-969-0010 — For bereaved parents</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* When to Get Help */}
          <div className="mt-12 bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-medium text-gray-800 mb-6 text-center">When to Reach Out</h2>
            <p className="text-gray-600 text-center mb-8">
              You don&apos;t have to be in a life-threatening emergency to seek help. Consider reaching out if you&apos;re experiencing:
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-4">💭</div>
                <h3 className="font-medium text-gray-800 mb-2">Overwhelming Thoughts</h3>
                <p className="text-gray-600 text-sm">Racing thoughts, thoughts of self-harm, or feeling like you can&apos;t cope</p>
              </div>
              <div>
                <div className="text-3xl mb-4">😔</div>
                <h3 className="font-medium text-gray-800 mb-2">Persistent Distress</h3>
                <p className="text-gray-600 text-sm">Depression, anxiety, or grief that won&apos;t lift after weeks</p>
              </div>
              <div>
                <div className="text-3xl mb-4">🆘</div>
                <h3 className="font-medium text-gray-800 mb-2">Daily Functioning</h3>
                <p className="text-gray-600 text-sm">Difficulty working, sleeping, eating, or maintaining relationships</p>
              </div>
            </div>
          </div>

          {/* Self-Care */}
          <div className="mt-12 bg-teal-50 p-8 rounded-lg">
            <h2 className="text-2xl font-medium text-gray-800 mb-6">While You Wait for Help</h2>
            <p className="text-gray-600 mb-6">
              If you&apos;ve reached out for help and are waiting, here are some things that might help:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-teal-500 mr-2">•</span>
                  <span>Take slow, deep breaths — inhale for 4 counts, hold for 4, exhale for 4</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-2">•</span>
                  <span>Ground yourself by naming 5 things you can see, 4 you can touch, 3 you can hear</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-2">•</span>
                  <span>Move to a safe, comfortable space if you can</span>
                </li>
              </ul>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-teal-500 mr-2">•</span>
                  <span>Reach out to a trusted friend or family member</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-2">•</span>
                  <span>Avoid alcohol and substances</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-2">•</span>
                  <span>Remember: This feeling will pass. Help is coming.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-500 mb-4">
              All crisis lines are free and confidential.
            </p>
            <p className="text-sm text-gray-400">
              If you&apos;re not in crisis but want to explore our mental health research and resources,
              visit our <a href="/research" className="text-teal-600 hover:text-teal-700">Research</a> or <a href="/knowledge-base" className="text-teal-600 hover:text-teal-700">Knowledge Base</a> pages.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

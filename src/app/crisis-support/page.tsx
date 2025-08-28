import Navigation from '@/components/Navigation';

export const metadata = {
  title: "Crisis Support | Faith Marie Foundation",
  description: "Immediate support and resources for families in crisis with infant heart conditions.",
};

export default function CrisisSupportPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-light text-gray-800 mb-6">
              Crisis Support
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              You are not alone. We&apos;re here to provide immediate support and resources when you need them most.
            </p>
          </div>
          
          {/* Emergency Resources */}
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-12">
            <h2 className="text-xl font-semibold text-red-800 mb-4">Emergency Resources</h2>
            <div className="space-y-3 text-red-700">
              <p><strong>National Suicide Prevention Lifeline:</strong> 988</p>
              <p><strong>Crisis Text Line:</strong> Text HOME to 741741</p>
              <p><strong>Postpartum Support International:</strong> 1-944-4-WARMLINE (1-944-492-7654)</p>
              <p><strong>Emergency Services:</strong> 911</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Immediate Support */}
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-medium text-gray-800 mb-6">Immediate Support</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium text-gray-800">24/7 Text Support</h3>
                    <p className="text-gray-600">Text FAITH to [number] for immediate support from trained counselors</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium text-gray-800">Virtual Support Groups</h3>
                    <p className="text-gray-600">Join other families in our secure, moderated online support groups</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium text-gray-800">Emergency Financial Aid</h3>
                    <p className="text-gray-600">Fast-track assistance for urgent medical and travel expenses</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Emotional Support */}
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-medium text-gray-800 mb-6">Emotional Support</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium text-gray-800">Grief Counseling</h3>
                    <p className="text-gray-600">Professional counselors specializing in infant loss and medical trauma</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium text-gray-800">Family Support</h3>
                    <p className="text-gray-600">Resources for partners, siblings, and extended family members</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium text-gray-800">Memorial Support</h3>
                    <p className="text-gray-600">Guidance for creating meaningful memorials and celebrating your baby&apos;s life</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* When to Reach Out */}
          <div className="mt-12 bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-medium text-gray-800 mb-6 text-center">When to Reach Out</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-4">🏥</div>
                <h3 className="font-medium text-gray-800 mb-2">New Diagnosis</h3>
                <p className="text-gray-600">Just received difficult news and feeling overwhelmed</p>
              </div>
              <div>
                <div className="text-3xl mb-4">💙</div>
                <h3 className="font-medium text-gray-800 mb-2">During Treatment</h3>
                <p className="text-gray-600">Navigating complex medical decisions and long hospital stays</p>
              </div>
              <div>
                <div className="text-3xl mb-4">🕊️</div>
                <h3 className="font-medium text-gray-800 mb-2">After Loss</h3>
                <p className="text-gray-600">Processing grief and finding ways to honor your baby&apos;s memory</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-rose-600 text-white px-8 py-4 rounded-md text-lg hover:bg-rose-700 transition-colors">
              Get Support Now
            </button>
            <p className="text-sm text-gray-500 mt-4">
              All support services are free and confidential
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
import Navigation from '@/components/Navigation';

export const metadata = {
  title: "Find Support | Faith Marie Foundation",
  description: "Find the support and community you need during your journey with infant heart conditions.",
};

export default function SupportPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-light text-gray-800 mb-6">
              Find Support
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Connect with other families, access professional support, and find the help you need.
            </p>
          </div>
          
          <div className="space-y-12">
            <div className="bg-rose-50 p-8 rounded-lg">
              <h2 className="text-2xl font-medium text-gray-800 mb-6">Get Personalized Support</h2>
              <p className="text-gray-700 mb-6">
                Every family&apos;s journey is unique. Let us match you with the specific resources and support 
                that fit your situation.
              </p>
              <button className="bg-rose-600 text-white px-6 py-3 rounded-md hover:bg-rose-700 transition-colors">
                Start Support Assessment
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Support Groups</h3>
                <p className="text-gray-600 mb-4">
                  Connect with other families who understand your journey.
                </p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>• Weekly virtual meetings</li>
                  <li>• Regional in-person groups</li>
                  <li>• Specialized groups by condition</li>
                  <li>• Bereavement support</li>
                </ul>
                <button className="text-rose-600 hover:text-rose-700 font-medium">
                  Find a Group →
                </button>
              </div>
              
              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Professional Counseling</h3>
                <p className="text-gray-600 mb-4">
                  Access trained professionals who specialize in medical trauma and grief.
                </p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>• Individual counseling</li>
                  <li>• Family therapy</li>
                  <li>• Couples counseling</li>
                  <li>• Crisis intervention</li>
                </ul>
                <button className="text-rose-600 hover:text-rose-700 font-medium">
                  Schedule Session →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
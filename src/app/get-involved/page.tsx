import Navigation from '@/components/Navigation';

export const metadata = {
  title: "Get Involved | Faith Marie Foundation",
  description: "Join our mission to support families facing infant heart conditions. Volunteer, donate, or spread awareness.",
};

export default function GetInvolvedPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-light text-gray-800 mb-6">
              Get Involved
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Help us extend Faith Marie&apos;s legacy of love by supporting families in their time of greatest need.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Donate</h2>
              <p className="text-gray-600 mb-6">
                100% of donations go directly to families in need. Help cover medical expenses, 
                travel costs, and emergency support.
              </p>
              <button className="bg-rose-600 text-white px-6 py-3 rounded-md hover:bg-rose-700 transition-colors">
                Make a Donation
              </button>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Volunteer</h2>
              <p className="text-gray-600 mb-6">
                Share your skills, time, or experience to support other families. 
                From administrative help to direct family support.
              </p>
              <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors">
                Apply to Volunteer
              </button>
            </div>
          </div>
          
          <div className="bg-rose-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-medium text-gray-800 mb-4">Spread Awareness</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Help other families find the support they need by sharing Faith Marie&apos;s story and our mission.
            </p>
            <div className="space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                Share on Facebook
              </button>
              <button className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors">
                Share on Twitter
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
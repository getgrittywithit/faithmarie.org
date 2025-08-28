import Navigation from '@/components/Navigation';

export const metadata = {
  title: "Resources | Faith Marie Foundation",
  description: "Comprehensive resources for families dealing with infant heart conditions.",
};

export default function ResourcesPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-light text-gray-800 mb-6">
              Resources
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Comprehensive support and information for families navigating infant heart conditions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Medical Resources</h2>
              <ul className="space-y-3 text-gray-600">
                <li>• Pediatric cardiology specialists directory</li>
                <li>• Hospital quality ratings and reviews</li>
                <li>• Medical terminology guide</li>
                <li>• Questions to ask your doctor</li>
                <li>• Second opinion resources</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Financial Support</h2>
              <ul className="space-y-3 text-gray-600">
                <li>• Emergency financial assistance</li>
                <li>• Insurance navigation help</li>
                <li>• Travel and lodging support</li>
                <li>• Medical bill advocacy</li>
                <li>• Prescription assistance programs</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Emotional Support</h2>
              <ul className="space-y-3 text-gray-600">
                <li>• Support groups (virtual & in-person)</li>
                <li>• Professional counseling</li>
                <li>• Grief resources</li>
                <li>• Family support materials</li>
                <li>• Memorial guidance</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <button className="bg-rose-600 text-white px-8 py-4 rounded-md text-lg hover:bg-rose-700 transition-colors">
              Request Resources
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
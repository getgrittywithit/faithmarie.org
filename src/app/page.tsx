'use client';

import Navigation from '@/components/Navigation';
import PhotoGallery from '@/components/PhotoGallery';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-rose-50 to-white">
          <div className="text-center space-y-8 px-4 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-light text-gray-800">
                Faith Marie&apos;s Legacy
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-light">
                Supporting families through their journey with infant heart conditions
              </p>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
                Every family deserves hope, guidance, and support during their most challenging moments.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Just Received a Diagnosis</h3>
                  <p className="text-gray-600 mb-6">Understanding your baby&apos;s condition and what comes next</p>
                  <button className="w-full bg-rose-100 text-rose-700 py-3 px-6 rounded-md hover:bg-rose-200 transition-colors">
                    Find Support
                  </button>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Currently in Treatment</h3>
                  <p className="text-gray-600 mb-6">Resources and community for families in the thick of it</p>
                  <button className="w-full bg-blue-100 text-blue-700 py-3 px-6 rounded-md hover:bg-blue-200 transition-colors">
                    Get Resources
                  </button>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Walking Through Loss</h3>
                  <p className="text-gray-600 mb-6">Grief support and ways to honor your baby&apos;s memory</p>
                  <button className="w-full bg-purple-100 text-purple-700 py-3 px-6 rounded-md hover:bg-purple-200 transition-colors">
                    Find Comfort
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-light text-center text-gray-800 mb-16">Faith Marie&apos;s Story</h2>
            
            <div className="prose prose-lg mx-auto text-gray-700 space-y-6">
              <p className="leading-relaxed">
                Faith Marie entered our world on a beautiful day, bringing with her a love so profound it transformed us forever. 
                In her 21 precious days, she taught us more about strength, hope, and unconditional love than we could have ever imagined.
              </p>
              
              <p className="leading-relaxed">
                Born with a complex heart condition, Faith Marie faced challenges that no baby should have to endure. 
                Yet through it all, she showed us what true courage looks like - in her peaceful moments, her tiny fingers wrapped around ours, 
                and the way she fought with everything she had.
              </p>
              
              <p className="leading-relaxed">
                While our time with Faith Marie was far too short, her impact continues to ripple outward. 
                Through this foundation, we honor her memory by ensuring that other families walking this difficult path 
                never have to walk it alone.
              </p>
              
              <p className="leading-relaxed font-medium text-rose-700">
                Every resource we provide, every family we support, and every moment of comfort we offer 
                is a testament to Faith Marie&apos;s enduring legacy of love.
              </p>
            </div>
          </div>
        </section>

        {/* Photo Gallery Section */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-light text-center text-gray-800 mb-4">Memories of Faith Marie</h2>
            <p className="text-center text-gray-600 mb-16 text-lg">Celebrating the precious moments we shared</p>
            
            <PhotoGallery />
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-light text-center text-gray-800 mb-16">Our Vision</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-medium text-gray-800">What We Do</h3>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    We provide comprehensive support to families navigating infant heart conditions, 
                    from diagnosis through treatment and beyond.
                  </p>
                  <ul className="space-y-3 ml-6">
                    <li className="flex items-start">
                      <span className="text-rose-500 mr-3">•</span>
                      <span>Connect families with specialized medical resources and second opinions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-rose-500 mr-3">•</span>
                      <span>Offer financial assistance for medical expenses, travel, and lodging</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-rose-500 mr-3">•</span>
                      <span>Provide emotional support through trained counselors and peer connections</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-rose-500 mr-3">•</span>
                      <span>Create educational resources to help families understand complex medical information</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-medium text-gray-800">Our Impact</h3>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    Through Faith Marie&apos;s legacy, we&apos;re building a world where no family faces infant heart conditions alone.
                  </p>
                  <div className="grid grid-cols-2 gap-6 mt-8">
                    <div className="text-center p-6 bg-rose-50 rounded-lg">
                      <div className="text-3xl font-light text-rose-700 mb-2">24/7</div>
                      <p className="text-sm text-gray-600">Support Available</p>
                    </div>
                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                      <div className="text-3xl font-light text-blue-700 mb-2">100%</div>
                      <p className="text-sm text-gray-600">Donation to Families</p>
                    </div>
                  </div>
                  <p className="leading-relaxed mt-6">
                    Every dollar donated goes directly to supporting families in need, 
                    ensuring that Faith Marie&apos;s love continues to touch lives every day.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-16">
              <button className="bg-rose-600 text-white px-8 py-4 rounded-md text-lg hover:bg-rose-700 transition-colors">
                Join Us in Making a Difference
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

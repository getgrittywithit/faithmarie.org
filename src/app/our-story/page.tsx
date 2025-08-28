import Navigation from '@/components/Navigation';
import Link from 'next/link';

export const metadata = {
  title: "Our Story | Faith Marie Foundation",
  description: "The story of Faith Marie and how her legacy continues to support families facing infant heart conditions.",
};

export default function OurStoryPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-6xl font-light text-center text-gray-800 mb-16">
            Faith Marie&apos;s Story
          </h1>
          
          <div className="prose prose-lg mx-auto text-gray-700 space-y-8">
            <p className="text-xl leading-relaxed font-light text-center text-gray-600 mb-12">
              A story of profound love, unwavering hope, and an enduring legacy that continues to touch lives.
            </p>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-medium text-gray-800 mb-4">The Beginning</h2>
                <p className="leading-relaxed">
                  Faith Marie entered our world on a beautiful day, bringing with her a love so profound it transformed us forever. 
                  From the moment we held her, we knew she was destined for something extraordinary—though we could never have 
                  imagined the depth of her impact.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-medium text-gray-800 mb-4">Her Journey</h2>
                <p className="leading-relaxed">
                  Born with a complex heart condition, Faith Marie faced challenges that no baby should have to endure. 
                  Yet through it all, she showed us what true courage looks like—in her peaceful moments, her tiny fingers 
                  wrapped around ours, and the way she fought with everything she had.
                </p>
                <p className="leading-relaxed">
                  In her 21 precious days, she taught us more about strength, hope, and unconditional love than we could 
                  have ever imagined. Every moment with her was a gift, every breath a miracle, every smile a blessing 
                  that we carry with us always.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-medium text-gray-800 mb-4">Her Legacy</h2>
                <p className="leading-relaxed">
                  While our time with Faith Marie was far too short, her impact continues to ripple outward. Through this 
                  foundation, we honor her memory by ensuring that other families walking this difficult path never have to walk it alone.
                </p>
                <p className="leading-relaxed font-medium text-rose-700">
                  Every resource we provide, every family we support, and every moment of comfort we offer is a testament 
                  to Faith Marie&apos;s enduring legacy of love.
                </p>
              </section>
              
              <section className="bg-rose-50 p-8 rounded-lg">
                <h2 className="text-2xl font-medium text-gray-800 mb-4">Why We Do This Work</h2>
                <p className="leading-relaxed">
                  No family should face the overwhelming complexity of infant heart conditions alone. The medical terminology, 
                  the endless appointments, the insurance battles, the sleepless nights—we remember it all. We also remember 
                  the incredible kindness of strangers, the hope that carried us through, and the love that sustains us still.
                </p>
                <p className="leading-relaxed">
                  Faith Marie&apos;s foundation exists to be that kindness, that hope, and that love for other families. 
                  We&apos;re here to navigate the complex medical systems, provide financial support when needed, and offer 
                  the kind of understanding that can only come from those who have walked this path.
                </p>
              </section>
            </div>
            
            <div className="text-center space-y-8 pt-12">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/photos"
                  className="bg-rose-600 text-white px-8 py-4 rounded-md text-lg hover:bg-rose-700 transition-colors"
                >
                  View Faith Marie&apos;s Photos
                </Link>
                <Link 
                  href="/get-involved"
                  className="bg-gray-100 text-gray-700 px-8 py-4 rounded-md text-lg hover:bg-gray-200 transition-colors"
                >
                  Join Our Mission
                </Link>
              </div>
              
              <p className="text-sm text-gray-500 italic max-w-md mx-auto">
                &quot;In loving memory of Faith Marie, whose light continues to guide us toward hope and healing.&quot;
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
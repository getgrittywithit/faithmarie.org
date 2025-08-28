import Navigation from '@/components/Navigation';
import PhotoGallery from '@/components/PhotoGallery';

export const metadata = {
  title: "Photos of Faith Marie | Faith Marie Foundation",
  description: "A collection of precious memories of Faith Marie's 21 beautiful days with us.",
};

export default function PhotosPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-light text-gray-800 mb-6">
              Memories of Faith Marie
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Each photo tells a story of love, hope, and the profound impact Faith Marie had on our lives 
              in her precious 21 days with us.
            </p>
          </div>
          
          <PhotoGallery />
          
          <div className="text-center mt-16 pt-16 border-t border-gray-200">
            <p className="text-gray-600 italic max-w-xl mx-auto">
              &quot;Though her time was brief, Faith Marie&apos;s legacy of love continues to touch hearts and inspire hope.&quot;
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
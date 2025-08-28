import Navigation from '@/components/Navigation';

export const metadata = {
  title: "Community | Faith Marie Foundation",
  description: "Join our community of families supporting each other through infant heart conditions.",
};

export default function CommunityPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-light text-gray-800 mb-6">
              Community
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              You belong here. Join a community of families who understand, support, and celebrate with you.
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 text-lg">
              Community features coming soon...
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
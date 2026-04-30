import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GriefAssessmentTool from '@/components/assessments/GriefAssessmentTool';

export const metadata = {
  title: "Grief Assessment (PG-13) | Faith Marie Foundation",
  description: "Free, anonymous grief screening to help distinguish between typical grief and prolonged grief disorder. Understand your experience and learn about grief-specific support.",
};

const relatedTopics = [
  { title: 'Understanding Grief vs. Depression', href: '/learn?section=grief' },
  { title: 'What Doctors Prescribe for Grief (And What Actually Helps)', href: '/learn?section=grief-treatment' },
  { title: 'Complicated Grief Treatment: What It Is', href: '/learn?section=therapy-types' },
  { title: 'Support Groups for Bereaved Parents', href: '/find-help' },
];

export default function GriefAssessmentPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 pb-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <GriefAssessmentTool relatedTopics={relatedTopics} />
        </div>
      </main>
      <Footer />
    </>
  );
}

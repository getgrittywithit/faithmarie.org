import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AssessmentTool from '@/components/assessments/AssessmentTool';
import type { Question, AssessmentOption, SeverityRange } from '@/components/assessments/AssessmentTool';

export const metadata = {
  title: "Anxiety Screening (GAD-7) | Faith Marie Foundation",
  description: "Free, anonymous anxiety screening using the GAD-7. Understand your symptoms and learn about treatment options.",
};

const questions: Question[] = [
  { id: 1, text: "Feeling nervous, anxious, or on edge" },
  { id: 2, text: "Not being able to stop or control worrying" },
  { id: 3, text: "Worrying too much about different things" },
  { id: 4, text: "Trouble relaxing" },
  { id: 5, text: "Being so restless that it's hard to sit still" },
  { id: 6, text: "Becoming easily annoyed or irritable" },
  { id: 7, text: "Feeling afraid as if something awful might happen" },
];

const options: AssessmentOption[] = [
  { value: 0, label: "Not at all", description: "0 days" },
  { value: 1, label: "Several days", description: "1-6 days" },
  { value: 2, label: "More than half the days", description: "7-11 days" },
  { value: 3, label: "Nearly every day", description: "12-14 days" },
];

const severityRanges: SeverityRange[] = [
  {
    min: 0,
    max: 4,
    level: 'minimal',
    label: 'Minimal Anxiety',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    description: 'Your responses suggest minimal or no symptoms of anxiety. This is within the normal range of emotional experience.',
    treatmentContext: 'At this level, clinical treatment is typically not recommended. Some anxiety is a normal part of life, especially during stressful periods like grief or major life transitions. If you\'re going through a difficult time, your feelings are valid even without a clinical diagnosis.',
    nextSteps: [
      'Continue healthy coping strategies: exercise, sleep, stress management',
      'Monitor your symptoms if you\'re in a stressful period',
      'Learn about anxiety as a normal response to grief or trauma',
      'Re-take this assessment if symptoms increase',
    ],
  },
  {
    min: 5,
    max: 9,
    level: 'mild',
    label: 'Mild Anxiety',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    description: 'Your responses suggest mild anxiety symptoms. You may be experiencing worry or nervousness that\'s noticeable but not severely impairing.',
    treatmentContext: 'Mild anxiety often responds well to self-help strategies and lifestyle changes. Healthcare providers may recommend monitoring symptoms, stress reduction techniques, or therapy. Medication is typically not the first recommendation at this level unless anxiety is persistent or worsening.',
    nextSteps: [
      'Learn evidence-based techniques: breathing exercises, grounding',
      'Consider talk therapy (CBT is highly effective for anxiety)',
      'Address lifestyle factors: caffeine, sleep, exercise',
      'If grieving: understand that anxiety often accompanies loss',
    ],
  },
  {
    min: 10,
    max: 14,
    level: 'moderate',
    label: 'Moderate Anxiety',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    description: 'Your responses suggest moderate anxiety symptoms. At this level, anxiety may be interfering with your daily activities, work, or relationships.',
    treatmentContext: 'Moderate anxiety often benefits from professional treatment. Cognitive Behavioral Therapy (CBT) is considered the gold standard for anxiety disorders. Some providers may discuss medication options like SSRIs or buspirone for persistent anxiety. Benzodiazepines are sometimes used short-term but carry dependence risks.',
    nextSteps: [
      'Schedule an appointment with a mental health professional',
      'Learn about CBT and exposure-based therapies',
      'Understand medication options: SSRIs, buspirone, and their differences',
      'Know the risks of benzodiazepines (Xanax, Ativan, etc.)',
    ],
  },
  {
    min: 15,
    max: 21,
    level: 'severe',
    label: 'Severe Anxiety',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    description: 'Your responses suggest severe anxiety symptoms. This level of anxiety can be debilitating and significantly impacts daily functioning.',
    treatmentContext: 'Severe anxiety typically requires professional treatment, often combining therapy and medication. First-line medications for anxiety disorders are usually SSRIs or SNRIs, not benzodiazepines (despite what some doctors prescribe). Understanding the evidence behind different treatments can help you advocate for appropriate care.',
    nextSteps: [
      'Seek professional evaluation soon',
      'If experiencing panic attacks or severe distress: crisis resources are available',
      'Learn about evidence-based treatments for severe anxiety',
      'Understand why SSRIs are preferred over benzos for long-term treatment',
      'Consider whether anxiety is primary or related to grief/trauma',
    ],
  },
];

const relatedTopics = [
  { title: 'Anxiety in Grief: What\'s Normal, What\'s Not', href: '/research/topics/anxiety' },
  { title: 'Medications for Anxiety: SSRIs vs. Benzos', href: '/learn#medications' },
  { title: 'How CBT Works for Anxiety', href: '/learn#therapy' },
  { title: 'Find a Therapist or Provider', href: '/find-help' },
];

export default function AnxietyAssessmentPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 pb-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <AssessmentTool
            title="Anxiety Screening (GAD-7)"
            subtitle="The Generalized Anxiety Disorder-7 is a validated tool used by healthcare providers to screen for anxiety symptoms."
            citation="Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke, and colleagues"
            timeframe="Over the last 2 weeks, how often have you been bothered by the following?"
            questions={questions}
            options={options}
            severityRanges={severityRanges}
            assessmentType="gad7"
            relatedTopics={relatedTopics}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

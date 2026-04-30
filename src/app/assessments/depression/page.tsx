import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AssessmentTool from '@/components/assessments/AssessmentTool';
import type { Question, AssessmentOption, SeverityRange } from '@/components/assessments/AssessmentTool';

export const metadata = {
  title: "Depression Screening (PHQ-9) | Faith Marie Foundation",
  description: "Free, anonymous depression screening using the PHQ-9. Understand your symptoms and learn about treatment options.",
};

const questions: Question[] = [
  { id: 1, text: "Little interest or pleasure in doing things" },
  { id: 2, text: "Feeling down, depressed, or hopeless" },
  { id: 3, text: "Trouble falling or staying asleep, or sleeping too much" },
  { id: 4, text: "Feeling tired or having little energy" },
  { id: 5, text: "Poor appetite or overeating" },
  { id: 6, text: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down" },
  { id: 7, text: "Trouble concentrating on things, such as reading the newspaper or watching television" },
  { id: 8, text: "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual" },
  { id: 9, text: "Thoughts that you would be better off dead, or of hurting yourself in some way" },
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
    label: 'Minimal Depression',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    description: 'Your responses suggest minimal or no symptoms of depression. This is within the normal range of emotional experience.',
    treatmentContext: 'At this level, clinical treatment is typically not recommended. However, if you\'re going through grief or a difficult life transition, your emotions are valid even without a clinical diagnosis. Monitoring your well-being and maintaining healthy habits is appropriate.',
    nextSteps: [
      'Continue healthy routines: sleep, exercise, social connection',
      'Monitor your mood if you\'re going through a difficult time',
      'Consider our grief resources if you\'re experiencing loss',
      'Re-take this assessment if symptoms increase',
    ],
  },
  {
    min: 5,
    max: 9,
    level: 'mild',
    label: 'Mild Depression',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    description: 'Your responses suggest mild depressive symptoms. These symptoms may be impacting your daily life but are not yet severe.',
    treatmentContext: 'For mild depression, providers often recommend "watchful waiting" combined with lifestyle changes. Some may suggest therapy (particularly CBT or behavioral activation) as a first-line approach. Antidepressants are typically not the first recommendation at this level unless symptoms persist or worsen.',
    nextSteps: [
      'Learn about talk therapy options (CBT, behavioral activation)',
      'Understand the difference between grief and clinical depression',
      'Consider lifestyle factors: sleep, exercise, social support',
      'Schedule a check-in with a healthcare provider if symptoms persist',
    ],
  },
  {
    min: 10,
    max: 14,
    level: 'moderate',
    label: 'Moderate Depression',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    description: 'Your responses suggest moderate depressive symptoms. At this level, symptoms are likely affecting your work, relationships, or daily functioning.',
    treatmentContext: 'Moderate depression often warrants professional treatment. Providers may recommend therapy, medication, or both. If you\'re also experiencing grief, it\'s important to distinguish whether symptoms are a normal grief response or have developed into clinical depression — different situations call for different approaches.',
    nextSteps: [
      'Schedule an appointment with a mental health professional',
      'Learn what to expect from therapy vs. medication',
      'Understand SSRIs, SNRIs, and how they differ',
      'If grieving: learn about grief vs. depression (they overlap but aren\'t identical)',
    ],
  },
  {
    min: 15,
    max: 19,
    level: 'moderately_severe',
    label: 'Moderately Severe Depression',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    description: 'Your responses suggest moderately severe depressive symptoms. These symptoms are significantly impacting your ability to function.',
    treatmentContext: 'At this level, active treatment is strongly recommended. Most guidelines suggest a combination of therapy and medication. Common first-line medications include SSRIs (like sertraline or escitalopram) or SNRIs (like venlafaxine). Understanding what these medications do and how long they take to work can help you make informed decisions.',
    nextSteps: [
      'Seek professional evaluation soon (primary care or mental health provider)',
      'Understand what antidepressants actually do and typical timelines',
      'Learn about therapy options: CBT, IPT, or other evidence-based approaches',
      'Build a support system while seeking treatment',
      'Know the crisis resources if symptoms worsen',
    ],
  },
  {
    min: 20,
    max: 27,
    level: 'severe',
    label: 'Severe Depression',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    description: 'Your responses suggest severe depressive symptoms. This level of depression requires prompt professional attention.',
    treatmentContext: 'Severe depression typically requires immediate professional intervention, often combining medication and therapy. In some cases, more intensive options like intensive outpatient programs (IOP) or partial hospitalization may be recommended. If you\'re having thoughts of self-harm, please reach out to a crisis line now.',
    nextSteps: [
      'Contact a mental health professional or your doctor this week',
      'If having thoughts of self-harm: call 988 or text HOME to 741741',
      'Learn about treatment options for severe depression',
      'Consider whether you need a higher level of care (IOP, etc.)',
      'Identify someone who can support you through the treatment process',
    ],
  },
];

const relatedTopics = [
  { title: 'Understanding Depression vs. Grief', href: '/research/topics/depression' },
  { title: 'What SSRIs Actually Do (And Don\'t Do)', href: '/learn#medications' },
  { title: 'Types of Therapy: CBT, DBT, and More', href: '/learn#therapy' },
  { title: 'Find a Therapist or Provider', href: '/find-help' },
];

export default function DepressionAssessmentPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 pb-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <AssessmentTool
            title="Depression Screening (PHQ-9)"
            subtitle="The Patient Health Questionnaire-9 is a validated tool used by healthcare providers to screen for depression symptoms."
            citation="Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, and Kurt Kroenke"
            timeframe="Over the last 2 weeks, how often have you been bothered by the following?"
            questions={questions}
            options={options}
            severityRanges={severityRanges}
            assessmentType="phq9"
            relatedTopics={relatedTopics}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

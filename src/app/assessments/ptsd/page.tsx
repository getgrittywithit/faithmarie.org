import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AssessmentTool from '@/components/assessments/AssessmentTool';
import type { Question, AssessmentOption, SeverityRange } from '@/components/assessments/AssessmentTool';

export const metadata = {
  title: "PTSD Screening (PCL-5) | Faith Marie Foundation",
  description: "Free, anonymous PTSD screening using the PCL-5. Understand your trauma symptoms and learn about evidence-based treatments for post-traumatic stress.",
};

// PCL-5 Questions - 20 items covering DSM-5 PTSD symptom clusters
const questions: Question[] = [
  // Cluster B: Intrusion symptoms (1-5)
  { id: 1, text: "Repeated, disturbing, and unwanted memories of the stressful experience?" },
  { id: 2, text: "Repeated, disturbing dreams of the stressful experience?" },
  { id: 3, text: "Suddenly feeling or acting as if the stressful experience were actually happening again (as if you were actually back there reliving it)?" },
  { id: 4, text: "Feeling very upset when something reminded you of the stressful experience?" },
  { id: 5, text: "Having strong physical reactions when something reminded you of the stressful experience (for example, heart pounding, trouble breathing, sweating)?" },

  // Cluster C: Avoidance symptoms (6-7)
  { id: 6, text: "Avoiding memories, thoughts, or feelings related to the stressful experience?" },
  { id: 7, text: "Avoiding external reminders of the stressful experience (for example, people, places, conversations, activities, objects, or situations)?" },

  // Cluster D: Negative alterations in cognition and mood (8-14)
  { id: 8, text: "Trouble remembering important parts of the stressful experience?" },
  { id: 9, text: "Having strong negative beliefs about yourself, other people, or the world (for example, having thoughts such as: I am bad, there is something seriously wrong with me, no one can be trusted, the world is completely dangerous)?" },
  { id: 10, text: "Blaming yourself or someone else for the stressful experience or what happened after it?" },
  { id: 11, text: "Having strong negative feelings such as fear, horror, anger, guilt, or shame?" },
  { id: 12, text: "Loss of interest in activities that you used to enjoy?" },
  { id: 13, text: "Feeling distant or cut off from other people?" },
  { id: 14, text: "Trouble experiencing positive feelings (for example, being unable to feel happiness or have loving feelings for people close to you)?" },

  // Cluster E: Alterations in arousal and reactivity (15-20)
  { id: 15, text: "Irritable behavior, angry outbursts, or acting aggressively?" },
  { id: 16, text: "Taking too many risks or doing things that could cause you harm?" },
  { id: 17, text: "Being 'superalert' or watchful or on guard?" },
  { id: 18, text: "Feeling jumpy or easily startled?" },
  { id: 19, text: "Having difficulty concentrating?" },
  { id: 20, text: "Trouble falling or staying asleep?" },
];

// PCL-5 uses 0-4 scale
const options: AssessmentOption[] = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "A little bit" },
  { value: 2, label: "Moderately" },
  { value: 3, label: "Quite a bit" },
  { value: 4, label: "Extremely" },
];

// PCL-5 severity ranges (total score 0-80)
// Clinical cutoff is typically 31-33; we use 33
const severityRanges: SeverityRange[] = [
  {
    min: 0,
    max: 20,
    level: 'minimal',
    label: 'Minimal or No Symptoms',
    description: 'Your responses suggest few or no PTSD symptoms. This is a good sign, but if you\'ve experienced trauma and are struggling, your experience is still valid.',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    treatmentContext: 'At this symptom level, formal PTSD treatment may not be necessary. However, if you\'ve experienced trauma and want support, talking to a therapist can still be valuable for processing the experience.',
    nextSteps: [
      'Continue with any current self-care practices that are working',
      'If you\'ve experienced trauma, know that it\'s okay to seek support even without a diagnosis',
      'Monitor for any changes in symptoms, especially around trauma anniversaries',
    ],
  },
  {
    min: 21,
    max: 32,
    level: 'mild',
    label: 'Subthreshold Symptoms',
    description: 'Your responses suggest some trauma-related symptoms that fall below the typical diagnostic threshold. These symptoms may still affect your daily life and are worth addressing.',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    treatmentContext: 'While your score is below the typical PTSD cutoff, trauma symptoms exist on a spectrum. Evidence-based trauma therapies can help even at this level. Some people find that symptoms fluctuate over time.',
    nextSteps: [
      'Consider speaking with a therapist who specializes in trauma',
      'Learn about trauma-informed coping strategies',
      'Practice grounding techniques for moments of distress',
      'Monitor whether symptoms are increasing or affecting daily functioning',
    ],
  },
  {
    min: 33,
    max: 50,
    level: 'moderate',
    label: 'Probable PTSD - Moderate',
    description: 'Your responses suggest symptoms consistent with PTSD. This score indicates clinically significant symptoms that likely warrant professional evaluation and treatment.',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    treatmentContext: 'At this level, evidence-based trauma therapy is recommended. PTSD is highly treatable. The most effective approaches include Cognitive Processing Therapy (CPT), Prolonged Exposure (PE), and EMDR. These typically involve 8-16 sessions. Medication (usually SSRIs) can help but is generally considered second-line to trauma-focused therapy.',
    nextSteps: [
      'Seek evaluation from a mental health professional trained in trauma',
      'Ask specifically about trauma-focused therapies (CPT, PE, or EMDR)',
      'Know that PTSD responds well to treatment — most people improve significantly',
      'Consider whether your daily functioning is being affected and discuss this with a provider',
    ],
  },
  {
    min: 51,
    max: 65,
    level: 'moderately_severe',
    label: 'Probable PTSD - Moderately Severe',
    description: 'Your responses suggest significant PTSD symptoms that are likely affecting multiple areas of your life. Professional treatment is strongly recommended.',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    treatmentContext: 'PTSD at this severity level typically benefits from intensive trauma-focused therapy. You may need more than standard weekly sessions initially. Some people find that combining therapy with medication helps manage symptoms while doing the therapeutic work. The VA and community mental health centers often have specialized PTSD programs.',
    nextSteps: [
      'Prioritize connecting with a trauma specialist as soon as possible',
      'If you\'re a veteran, VA PTSD programs offer specialized, no-cost care',
      'Consider intensive outpatient programs if symptoms are significantly impairing daily life',
      'Discuss both therapy and medication options with a provider',
      'Ensure you have safety supports in place for difficult moments',
    ],
  },
  {
    min: 66,
    max: 80,
    level: 'severe',
    label: 'Probable PTSD - Severe',
    description: 'Your responses suggest severe PTSD symptoms. At this level, symptoms are likely causing significant distress and impairment. Please reach out for professional support.',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    treatmentContext: 'Severe PTSD symptoms warrant prompt professional care. This might include intensive outpatient programs, partial hospitalization, or inpatient stabilization if needed. Evidence-based trauma therapy remains the core treatment, but at this severity, additional supports are often helpful. Please know that even severe PTSD responds to treatment — it may take longer, but improvement is absolutely possible.',
    nextSteps: [
      'Contact a mental health provider or crisis line today',
      'If symptoms include thoughts of self-harm, please call 988 now',
      'Ask about intensive treatment programs designed for severe PTSD',
      'Consider whether your safety is at risk and discuss this honestly with providers',
      'Remember: severity of symptoms does not predict whether you can recover — you can',
    ],
  },
];

const relatedTopics = [
  { title: 'Understanding PTSD and Trauma', href: '/learn?section=ptsd' },
  { title: 'Trauma-Focused Therapies: CPT, PE, and EMDR', href: '/learn?section=therapy-types' },
  { title: 'SSRIs for PTSD: What to Know', href: '/learn?section=ssris' },
  { title: 'Find a Trauma Specialist', href: '/find-help' },
];

export default function PTSDAssessmentPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 pb-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <AssessmentTool
            title="PTSD Screening (PCL-5)"
            subtitle="The PCL-5 is a 20-question measure that assesses the symptoms of post-traumatic stress disorder according to DSM-5 criteria."
            citation="Based on the PTSD Checklist for DSM-5 (PCL-5) by Weathers, Litz, et al."
            timeframe="In the past month, how much have you been bothered by:"
            questions={questions}
            options={options}
            severityRanges={severityRanges}
            assessmentType="pcl5"
            relatedTopics={relatedTopics}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

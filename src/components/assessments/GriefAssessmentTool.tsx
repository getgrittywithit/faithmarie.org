'use client';

import { useState } from 'react';
import { AlertTriangle, Phone, ArrowRight, ArrowLeft, CheckCircle, Heart } from 'lucide-react';
import Link from 'next/link';

interface GriefAssessmentToolProps {
  relatedTopics: { title: string; href: string }[];
}

type Step = 'intro' | 'context' | 'questions' | 'results';

interface ContextAnswers {
  monthsSinceLoss: number | null;
  relationship: string | null;
}

const symptomQuestions = [
  {
    id: 'yearning',
    text: 'In the past month, how often have you felt yourself longing or yearning for the person you lost?',
    category: 'separation_distress',
  },
  {
    id: 'intense_emotions',
    text: 'In the past month, how often have you had intense feelings of emotional pain, sorrow, or pangs of grief related to the lost relationship?',
    category: 'separation_distress',
  },
  {
    id: 'preoccupation',
    text: 'In the past month, how often have you tried to avoid reminders that the person you lost is gone?',
    category: 'cognitive',
  },
  {
    id: 'stunned',
    text: 'In the past month, how often have you felt stunned, shocked, or dazed by your loss?',
    category: 'cognitive',
  },
  {
    id: 'confused_role',
    text: 'In the past month, how often have you felt confused about your role in life or felt like you don\'t know who you are (i.e., feeling that a part of yourself has died)?',
    category: 'identity',
  },
  {
    id: 'accept_loss',
    text: 'In the past month, how often have you had trouble accepting the loss?',
    category: 'cognitive',
  },
  {
    id: 'trust_others',
    text: 'In the past month, how often have you felt it\'s hard to trust others since your loss?',
    category: 'social',
  },
  {
    id: 'bitterness',
    text: 'In the past month, how often have you felt bitter over your loss?',
    category: 'emotional',
  },
  {
    id: 'moving_on',
    text: 'In the past month, how often have you felt that moving on (e.g., making new friends, pursuing new interests) would be difficult?',
    category: 'behavioral',
  },
  {
    id: 'emotionally_numb',
    text: 'In the past month, how often have you felt emotionally numb since your loss?',
    category: 'emotional',
  },
  {
    id: 'life_meaningless',
    text: 'In the past month, how often have you felt that life is unfulfilling, empty, or meaningless since your loss?',
    category: 'existential',
  },
];

const frequencyOptions = [
  { value: 1, label: 'Not at all' },
  { value: 2, label: 'At least once' },
  { value: 3, label: 'At least once a week' },
  { value: 4, label: 'At least once a day' },
  { value: 5, label: 'Several times a day' },
];

const impairmentQuestion = {
  id: 'impairment',
  text: 'Have these experiences of grief significantly interfered with your ability to work, socialize, or function in other important areas of your life?',
};

export default function GriefAssessmentTool({ relatedTopics }: GriefAssessmentToolProps) {
  const [step, setStep] = useState<Step>('intro');
  const [context, setContext] = useState<ContextAnswers>({ monthsSinceLoss: null, relationship: null });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [impairment, setImpairment] = useState<boolean | null>(null);
  const [saving, setSaving] = useState(false);

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const calculateResults = () => {
    // PG-13 scoring criteria (simplified for screening purposes)
    // Separation distress: yearning OR intense emotions must be daily (4+)
    const separationDistress = (answers['yearning'] >= 4 || answers['intense_emotions'] >= 4);

    // Cognitive/emotional/behavioral symptoms: at least 5 symptoms at "at least once a day" (4+)
    const symptomCount = Object.entries(answers)
      .filter(([key]) => key !== 'yearning' && key !== 'intense_emotions')
      .filter(([, value]) => value >= 4)
      .length;

    const hasSymptomCriteria = symptomCount >= 5;
    const hasTimeRequirement = (context.monthsSinceLoss ?? 0) >= 6;
    const hasImpairment = impairment === true;

    // Overall score (sum of all symptom responses)
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);

    // Determine result category
    if (hasTimeRequirement && separationDistress && hasSymptomCriteria && hasImpairment) {
      return {
        level: 'elevated' as const,
        label: 'Elevated Grief Symptoms',
        totalScore,
        separationDistress,
        symptomCount,
        hasTimeRequirement,
        hasImpairment,
      };
    } else if (separationDistress || symptomCount >= 3) {
      return {
        level: 'moderate' as const,
        label: 'Moderate Grief Symptoms',
        totalScore,
        separationDistress,
        symptomCount,
        hasTimeRequirement,
        hasImpairment,
      };
    } else {
      return {
        level: 'typical' as const,
        label: 'Typical Grief Response',
        totalScore,
        separationDistress,
        symptomCount,
        hasTimeRequirement,
        hasImpairment,
      };
    }
  };

  const handleComplete = async () => {
    setSaving(true);
    const results = calculateResults();

    try {
      await fetch('/api/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assessment_type: 'pg13',
          score: results.totalScore,
          severity: results.level === 'elevated' ? 'severe' : results.level === 'moderate' ? 'moderate' : 'minimal',
          answers: {
            ...answers,
            context,
            impairment,
          },
        }),
      });
    } catch (error) {
      console.error('Failed to save assessment:', error);
    }

    setSaving(false);
    setStep('results');
  };

  const progress = ((currentQuestion + 1) / symptomQuestions.length) * 100;

  // Intro screen
  if (step === 'intro') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-amber-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Grief Assessment (PG-13)</h2>
          </div>
          <p className="text-gray-600 mb-6">
            This assessment helps distinguish between typical grief and prolonged grief disorder.
            It can help you understand your grief experience and whether professional support might be helpful.
          </p>

          {/* Key distinction */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-amber-800 mb-2">Why This Matters</h3>
            <p className="text-amber-700 text-sm">
              Grief and depression share some symptoms but are <strong>not the same thing</strong>.
              Many people experiencing grief are prescribed antidepressants, but antidepressants
              are not first-line treatment for grief. Understanding what you&apos;re experiencing
              helps you get the right support.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-gray-800 mb-1">Important</p>
                <p className="text-gray-600">
                  This is a <strong>screening tool, not a diagnosis</strong>. It&apos;s based on the
                  PG-13 developed by Dr. Holly Prigerson and colleagues. Only a licensed mental
                  health professional can diagnose prolonged grief disorder.
                </p>
              </div>
            </div>
          </div>

          {/* Crisis warning */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <Phone className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-red-800 mb-1">If You&apos;re in Crisis</p>
                <p className="text-red-700">
                  If you&apos;re having thoughts of suicide or self-harm, please reach out:
                </p>
                <ul className="text-red-700 mt-2 space-y-1">
                  <li><strong>988</strong> - Suicide & Crisis Lifeline</li>
                  <li>Text <strong>HOME</strong> to <strong>741741</strong></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500 mb-6">
            <p>• 13 questions, takes about 5 minutes</p>
            <p>• Completely anonymous</p>
          </div>

          <button
            onClick={() => setStep('context')}
            className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors font-medium"
          >
            Begin Assessment
          </button>
        </div>
      </div>
    );
  }

  // Context questions (about the loss)
  if (step === 'context') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-amber-50 border-b border-amber-100">
            <p className="text-sm text-amber-800 font-medium">About Your Loss</p>
            <p className="text-xs text-amber-600 mt-1">This helps us provide appropriate context for your results</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Time since loss */}
            <div>
              <label className="block text-gray-800 font-medium mb-3">
                How long ago did your loss occur?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 1, label: 'Less than 1 month' },
                  { value: 3, label: '1-3 months' },
                  { value: 6, label: '3-6 months' },
                  { value: 12, label: '6-12 months' },
                  { value: 24, label: '1-2 years' },
                  { value: 36, label: 'More than 2 years' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setContext((prev) => ({ ...prev, monthsSinceLoss: option.value }))}
                    className={`p-3 text-left rounded-lg border-2 transition-all ${
                      context.monthsSinceLoss === option.value
                        ? 'border-amber-600 bg-amber-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Relationship */}
            <div>
              <label className="block text-gray-800 font-medium mb-3">
                Who did you lose?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'child', label: 'Child' },
                  { value: 'spouse', label: 'Spouse/Partner' },
                  { value: 'parent', label: 'Parent' },
                  { value: 'sibling', label: 'Sibling' },
                  { value: 'friend', label: 'Close Friend' },
                  { value: 'other', label: 'Other' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setContext((prev) => ({ ...prev, relationship: option.value }))}
                    className={`p-3 text-left rounded-lg border-2 transition-all ${
                      context.relationship === option.value
                        ? 'border-amber-600 bg-amber-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between">
            <button
              onClick={() => setStep('intro')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={() => setStep('questions')}
              disabled={!context.monthsSinceLoss || !context.relationship}
              className="flex items-center gap-2 bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (step === 'results') {
    const results = calculateResults();

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className={`p-6 ${
            results.level === 'elevated' ? 'bg-amber-100' :
            results.level === 'moderate' ? 'bg-yellow-50' : 'bg-green-50'
          }`}>
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className={`w-6 h-6 ${
                results.level === 'elevated' ? 'text-amber-700' :
                results.level === 'moderate' ? 'text-yellow-700' : 'text-green-700'
              }`} />
              <span className="text-sm font-medium text-gray-600">Assessment Complete</span>
            </div>
            <h2 className={`text-2xl font-semibold ${
              results.level === 'elevated' ? 'text-amber-800' :
              results.level === 'moderate' ? 'text-yellow-800' : 'text-green-800'
            }`}>
              {results.label}
            </h2>
          </div>

          {/* Reminder */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Remember:</strong> This is a screening tool, not a diagnosis.
              It can help you understand your experience and decide whether to seek support.
            </p>
          </div>

          {/* Results interpretation */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">What This Means</h3>

            {results.level === 'typical' && (
              <div className="space-y-4">
                <p className="text-gray-600">
                  Your responses suggest a <strong>typical grief response</strong>. Grief is painful,
                  but what you&apos;re experiencing appears to be within the range of normal grief.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 mb-2">This is important to know because:</h4>
                  <ul className="text-sm text-green-700 space-y-2">
                    <li>• Normal grief, while painful, typically doesn&apos;t require clinical treatment</li>
                    <li>• Antidepressants are <strong>not recommended</strong> for normal grief</li>
                    <li>• Support groups and grief counseling can still be helpful</li>
                    <li>• Grief has no timeline — what you&apos;re feeling is valid</li>
                  </ul>
                </div>
              </div>
            )}

            {results.level === 'moderate' && (
              <div className="space-y-4">
                <p className="text-gray-600">
                  Your responses suggest <strong>moderate grief symptoms</strong>. You&apos;re experiencing
                  significant distress, though it may not meet criteria for prolonged grief disorder.
                </p>
                {(context.monthsSinceLoss ?? 0) < 6 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">Time Since Loss</h4>
                    <p className="text-sm text-blue-700">
                      Your loss is recent (less than 6 months). Intense grief symptoms are
                      <strong> expected and normal</strong> in the early period after loss.
                      Prolonged grief disorder is typically not diagnosed until at least 6-12 months
                      have passed.
                    </p>
                  </div>
                )}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-800 mb-2">Consider:</h4>
                  <ul className="text-sm text-yellow-700 space-y-2">
                    <li>• Grief support groups (like The Compassionate Friends for child loss)</li>
                    <li>• Grief counseling with a therapist experienced in bereavement</li>
                    <li>• Monitoring symptoms — if they worsen or persist, reassess</li>
                  </ul>
                </div>
              </div>
            )}

            {results.level === 'elevated' && (
              <div className="space-y-4">
                <p className="text-gray-600">
                  Your responses suggest <strong>elevated grief symptoms</strong> that may be consistent
                  with prolonged grief disorder (PGD). This doesn&apos;t mean something is wrong with
                  you — it means you may benefit from specialized support.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-medium text-amber-800 mb-2">What is Prolonged Grief Disorder?</h4>
                  <p className="text-sm text-amber-700 mb-3">
                    PGD was recognized as a formal diagnosis in 2022. It&apos;s characterized by
                    intense, persistent grief that significantly impairs daily functioning beyond
                    6-12 months after loss. It affects roughly 10% of bereaved people.
                  </p>
                  <p className="text-sm text-amber-700 font-medium">
                    PGD is <strong>not the same as depression</strong>, and treatments differ.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Grief vs Depression - Key content */}
          <div className="p-6 border-b border-gray-200 bg-slate-50">
            <h3 className="font-semibold text-gray-800 mb-4">Grief vs. Depression: Why It Matters</h3>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="font-medium text-gray-800 mb-2">Grief</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Sadness tied to thoughts of the deceased</li>
                  <li>• Can experience moments of joy</li>
                  <li>• Self-esteem usually intact</li>
                  <li>• Yearning for the person lost</li>
                  <li>• Antidepressants often not effective</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="font-medium text-gray-800 mb-2">Depression</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Pervasive sadness, not tied to specific thoughts</li>
                  <li>• Persistent inability to feel pleasure</li>
                  <li>• Feelings of worthlessness</li>
                  <li>• General hopelessness</li>
                  <li>• Antidepressants may help</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              <strong>Why this matters:</strong> If a doctor prescribes antidepressants for grief
              without distinguishing it from depression, you may not get the most effective treatment.
              Grief-specific therapies like Complicated Grief Treatment (CGT) have better evidence
              for prolonged grief than antidepressants alone.
            </p>
          </div>

          {/* Treatment context */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">Treatment Considerations</h3>

            {results.level === 'elevated' ? (
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Evidence-Based Options for Prolonged Grief:</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Complicated Grief Treatment (CGT)</strong> — A specific therapy designed for prolonged grief, with strong research support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Prolonged Exposure for PGD</strong> — Helps process avoided memories and situations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Group therapy for grief</strong> — Especially groups specific to your type of loss (child loss, spouse, etc.)</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-medium text-amber-800 mb-2">What About Medication?</h4>
                  <p className="text-sm text-amber-700">
                    Antidepressants alone are <strong>not recommended as first-line treatment</strong> for
                    prolonged grief. Research shows CGT is more effective. However, if you also have
                    clinical depression alongside grief (they can co-occur), medication may be part of
                    a treatment plan. Ask your provider about the distinction.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Supportive Options:</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Support groups</strong> — The Compassionate Friends (child loss), GriefShare, local hospice groups</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Grief counseling</strong> — Even without PGD, talking with a grief-informed therapist can help</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Self-care and social support</strong> — Grief is exhausting; rest is not weakness</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* If child loss */}
          {context.relationship === 'child' && (
            <div className="p-6 border-b border-gray-200 bg-purple-50">
              <h3 className="font-semibold text-purple-800 mb-3">Losing a Child</h3>
              <p className="text-sm text-purple-700 mb-4">
                The loss of a child is often considered the most difficult grief to bear. Research shows
                bereaved parents have higher rates of prolonged grief, and grief after child loss can
                last longer than other types of bereavement. This doesn&apos;t mean something is wrong
                with you — it reflects the profound nature of this loss.
              </p>
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <h4 className="font-medium text-purple-800 mb-2">Resources for Bereaved Parents:</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• <strong>The Compassionate Friends</strong> — Support for families after child loss</li>
                  <li>• <strong>Bereaved Parents of the USA</strong> — Peer support network</li>
                  <li>• <strong>MISS Foundation</strong> — Support for grieving families</li>
                </ul>
              </div>
            </div>
          )}

          {/* Related resources */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">Learn More</h3>
            <div className="space-y-2">
              {relatedTopics.map((topic) => (
                <Link
                  key={topic.href}
                  href={topic.href}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium text-gray-800">{topic.title}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </Link>
              ))}
            </div>
          </div>

          {/* Crisis resources for elevated scores */}
          {results.level === 'elevated' && (
            <div className="px-6 py-4 bg-red-50 border-b border-red-200">
              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-red-800 mb-1">If You&apos;re Struggling</p>
                  <p className="text-sm text-red-700 mb-2">
                    Grief can be overwhelming. If you&apos;re having thoughts of harming yourself
                    or joining your loved one, please reach out.
                  </p>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li><strong>988</strong> - Suicide & Crisis Lifeline</li>
                    <li>Text <strong>HOME</strong> to <strong>741741</strong></li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="p-6 bg-amber-50">
            <h3 className="font-semibold text-gray-800 mb-2">Find Support</h3>
            <p className="text-sm text-gray-600 mb-4">
              Whether you need grief-specific therapy, support groups, or crisis resources,
              we&apos;ve curated options to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/find-help"
                className="flex-1 bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors text-center font-medium"
              >
                Find Help Resources
              </Link>
              <Link
                href="/assessments"
                className="flex-1 bg-white text-gray-700 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-center"
              >
                Take Another Assessment
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Question screen
  const question = symptomQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === symptomQuestions.length - 1;
  const showImpairmentQuestion = isLastQuestion && answers[question.id] !== undefined;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Progress bar */}
        <div className="h-2 bg-gray-100">
          <div
            className="h-full bg-amber-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <p className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {symptomQuestions.length}
          </p>
        </div>

        {/* Question */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-6">{question.text}</h3>

          <div className="space-y-3">
            {frequencyOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(question.id, option.value)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  answers[question.id] === option.value
                    ? 'border-amber-600 bg-amber-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="font-medium text-gray-800">{option.label}</span>
              </button>
            ))}
          </div>

          {/* Impairment question (shown after last symptom question is answered) */}
          {showImpairmentQuestion && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-800 mb-4">{impairmentQuestion.text}</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => setImpairment(true)}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    impairment === true
                      ? 'border-amber-600 bg-amber-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium text-gray-800">Yes</span>
                </button>
                <button
                  onClick={() => setImpairment(false)}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    impairment === false
                      ? 'border-amber-600 bg-amber-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium text-gray-800">No</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between">
          <button
            onClick={() => {
              if (currentQuestion > 0) {
                setCurrentQuestion((prev) => prev - 1);
              } else {
                setStep('context');
              }
            }}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          {isLastQuestion ? (
            <button
              onClick={handleComplete}
              disabled={answers[question.id] === undefined || impairment === null || saving}
              className="flex items-center gap-2 bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? 'Saving...' : 'See Results'}
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion((prev) => prev + 1)}
              disabled={answers[question.id] === undefined}
              className="flex items-center gap-2 bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

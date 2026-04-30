'use client';

import { useState } from 'react';
import { AlertTriangle, Phone, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export interface Question {
  id: number;
  text: string;
}

export interface AssessmentOption {
  value: number;
  label: string;
  description?: string;
}

export interface SeverityRange {
  min: number;
  max: number;
  level: 'minimal' | 'mild' | 'moderate' | 'moderately_severe' | 'severe';
  label: string;
  description: string;
  color: string;
  bgColor: string;
  treatmentContext: string;
  nextSteps: string[];
}

interface AssessmentToolProps {
  title: string;
  subtitle: string;
  citation: string;
  timeframe: string;
  questions: Question[];
  options: AssessmentOption[];
  severityRanges: SeverityRange[];
  assessmentType: 'phq9' | 'gad7' | 'pcl5' | 'pg13';
  relatedTopics: { title: string; href: string }[];
}

export default function AssessmentTool({
  title,
  subtitle,
  citation,
  timeframe,
  questions,
  options,
  severityRanges,
  assessmentType,
  relatedTopics,
}: AssessmentToolProps) {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, val) => sum + val, 0);
  };

  const getSeverity = (score: number): SeverityRange => {
    return severityRanges.find((r) => score >= r.min && score <= r.max) || severityRanges[0];
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleComplete = async () => {
    setSaving(true);
    const score = calculateScore();
    const severity = getSeverity(score);

    try {
      await fetch('/api/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assessment_type: assessmentType,
          score,
          severity: severity.level,
          answers,
        }),
      });
    } catch (error) {
      console.error('Failed to save assessment:', error);
    }

    setSaving(false);
    setCompleted(true);
  };

  const score = calculateScore();
  const severity = getSeverity(score);
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQuestionAnswered = answers[questions[currentQuestion]?.id] !== undefined;

  // Pre-assessment disclaimer screen
  if (!started) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-600 mb-6">{subtitle}</p>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-amber-800 mb-1">Before You Begin</p>
                <p className="text-amber-700">
                  This is a <strong>screening tool, not a diagnosis</strong>. It can help you
                  understand your symptoms and decide whether to seek professional support.
                  Only a licensed mental health professional can diagnose mental health conditions.
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
                  If you&apos;re having thoughts of suicide or self-harm, please reach out now:
                </p>
                <ul className="text-red-700 mt-2 space-y-1">
                  <li><strong>988</strong> - Suicide & Crisis Lifeline (call or text)</li>
                  <li>Text <strong>HOME</strong> to <strong>741741</strong> - Crisis Text Line</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="text-sm text-gray-600 mb-6">
            <p className="mb-2"><strong>About this assessment:</strong></p>
            <ul className="space-y-1 text-gray-500">
              <li>• {questions.length} questions, takes about 2 minutes</li>
              <li>• Completely anonymous</li>
              <li>• {citation}</li>
            </ul>
          </div>

          <button
            onClick={() => setStarted(true)}
            className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors font-medium"
          >
            Begin Assessment
          </button>
        </div>
      </div>
    );
  }

  // Results screen
  if (completed) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Score header */}
          <div className={`p-6 ${severity.bgColor}`}>
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className={`w-6 h-6 ${severity.color}`} />
              <span className="text-sm font-medium text-gray-600">Assessment Complete</span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">
              Your Score: {score} out of {questions.length * (options.length - 1)}
            </h2>
            <p className={`text-lg font-medium ${severity.color}`}>{severity.label}</p>
          </div>

          {/* Reminder disclaimer */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Remember:</strong> This screening is educational, not diagnostic.
              It suggests possible symptoms but cannot determine if you have a clinical condition.
            </p>
          </div>

          {/* What this means */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">What This Score Suggests</h3>
            <p className="text-gray-600 mb-4">{severity.description}</p>

            <h4 className="font-medium text-gray-800 mb-2">Treatment Context</h4>
            <p className="text-gray-600 text-sm mb-4">{severity.treatmentContext}</p>

            <h4 className="font-medium text-gray-800 mb-2">Possible Next Steps</h4>
            <ul className="space-y-2">
              {severity.nextSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <ArrowRight className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {/* Crisis check for severe scores */}
          {(severity.level === 'severe' || severity.level === 'moderately_severe') && (
            <div className="px-6 py-4 bg-red-50 border-b border-red-200">
              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-red-800 mb-1">Please Consider Reaching Out</p>
                  <p className="text-sm text-red-700 mb-2">
                    Your responses suggest significant symptoms. Speaking with a professional can help.
                  </p>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li><strong>988</strong> - Suicide & Crisis Lifeline</li>
                    <li>Text <strong>HOME</strong> to <strong>741741</strong></li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Related resources */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">Understanding Your Options</h3>
            <p className="text-sm text-gray-600 mb-4">
              Learn what treatments are commonly considered for these symptoms, what each actually does,
              and how to have informed conversations with healthcare providers.
            </p>
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

          {/* Find help CTA */}
          <div className="p-6 bg-teal-50">
            <h3 className="font-semibold text-gray-800 mb-2">Ready to Find Support?</h3>
            <p className="text-sm text-gray-600 mb-4">
              We&apos;ve curated resources to help you find professional support, including
              affordable options and crisis services.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/find-help"
                className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors text-center font-medium"
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
  const question = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Progress bar */}
        <div className="h-2 bg-gray-100">
          <div
            className="h-full bg-teal-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <p className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <p className="text-xs text-gray-400 mt-1">{timeframe}</p>
        </div>

        {/* Question */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-6">{question.text}</h3>

          <div className="space-y-3">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(question.id, option.value)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  answers[question.id] === option.value
                    ? 'border-teal-600 bg-teal-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="font-medium text-gray-800">{option.label}</span>
                {option.description && (
                  <span className="block text-sm text-gray-500 mt-1">{option.description}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!currentQuestionAnswered || saving}
            className="flex items-center gap-2 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? (
              'Saving...'
            ) : currentQuestion === questions.length - 1 ? (
              'See Results'
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

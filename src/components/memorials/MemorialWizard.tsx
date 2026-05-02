'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import Step1Account from './wizard/Step1Account';
import Step2DeceasedInfo from './wizard/Step2DeceasedInfo';
import Step3ProofOfDeath from './wizard/Step3ProofOfDeath';
import Step4Attestation from './wizard/Step4Attestation';
import Step5Donation from './wizard/Step5Donation';
import Step6Review from './wizard/Step6Review';
import type { RelationshipType, ProofType } from '@/lib/supabase/types';

export type WizardStep = 'account' | 'deceased' | 'proof' | 'attestation' | 'donation' | 'review' | 'submitted';

export interface WizardData {
  // Account step
  email: string;
  fullName: string;
  phone: string;
  isAuthenticated: boolean;
  userId: string | null;

  // Deceased info step
  deceasedFullName: string;
  deceasedDob: string;
  deceasedDod: string;
  deceasedCity: string;
  deceasedState: string;
  deceasedCountry: string;
  relationship: RelationshipType;

  // Proof of death step
  proofType: ProofType;
  obituaryUrl: string;
  funeralHomeName: string;
  funeralHomeCity: string;
  newspaperUrl: string;
  hardshipNote: string;

  // Attestation step
  attestationAccepted: boolean;
  attestationIp: string;

  // Donation step
  donationAmount: number;
  isHardship: boolean;
  hardshipReason: string;
}

const initialData: WizardData = {
  email: '',
  fullName: '',
  phone: '',
  isAuthenticated: false,
  userId: null,
  deceasedFullName: '',
  deceasedDob: '',
  deceasedDod: '',
  deceasedCity: '',
  deceasedState: '',
  deceasedCountry: 'USA',
  relationship: 'other',
  proofType: 'obituary_url',
  obituaryUrl: '',
  funeralHomeName: '',
  funeralHomeCity: '',
  newspaperUrl: '',
  hardshipNote: '',
  attestationAccepted: false,
  attestationIp: '',
  donationAmount: 20,
  isHardship: false,
  hardshipReason: '',
};

const steps: { id: WizardStep; label: string }[] = [
  { id: 'account', label: 'Account' },
  { id: 'deceased', label: 'Your Loved One' },
  { id: 'proof', label: 'Verification' },
  { id: 'attestation', label: 'Attestation' },
  { id: 'donation', label: 'Donation' },
  { id: 'review', label: 'Review' },
];

export default function MemorialWizard() {
  const [currentStep, setCurrentStep] = useState<WizardStep>('account');
  const [data, setData] = useState<WizardData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [memorialSlug, setMemorialSlug] = useState('');
  const [availableCredits, setAvailableCredits] = useState(0);

  // Fetch available pay-it-forward credits on mount
  useEffect(() => {
    fetch('/api/memorials/credits')
      .then((res) => res.json())
      .then((data) => setAvailableCredits(data.count ?? 0))
      .catch(() => setAvailableCredits(0));
  }, []);

  const updateData = (updates: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const goNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id);
    }
  };

  const goBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/memorials/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMemorialSlug(result.slug);
        setCurrentStep('submitted');
      } else {
        setSubmitError(result.error || 'Failed to create memorial');
      }
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submitted success screen
  if (currentStep === 'submitted') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Memorial Submitted!
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Thank you. Your memorial for <strong>{data.deceasedFullName}</strong> is being reviewed.
            We&apos;ll publish it within 48 hours and email you the link.
          </p>
          <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-medium text-teal-800 mb-2">While you wait, you can:</h3>
            <ul className="text-sm text-teal-700 space-y-2">
              <li>• Start adding photos and stories to your memorial</li>
              <li>• Invite family members to contribute</li>
              <li>• Any edits you make will be visible to reviewers</li>
            </ul>
          </div>
          <a
            href={`/memorials/dashboard/${memorialSlug}`}
            className="inline-block bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-colors"
          >
            Continue to Memorial Editor
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Progress indicator */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">
            Step {currentStepIndex + 1} of {steps.length}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {steps[currentStepIndex].label}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-teal-600 transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Pay-it-forward counter */}
      {availableCredits > 0 && currentStep === 'donation' && (
        <div className="px-6 py-3 bg-green-50 border-b border-green-100">
          <p className="text-sm text-green-700 text-center">
            <strong>{availableCredits}</strong> free memorial{availableCredits === 1 ? '' : 's'} available through pay-it-forward donations
          </p>
        </div>
      )}

      {/* Step content */}
      <div className="p-6">
        {currentStep === 'account' && (
          <Step1Account data={data} updateData={updateData} onNext={goNext} />
        )}
        {currentStep === 'deceased' && (
          <Step2DeceasedInfo data={data} updateData={updateData} />
        )}
        {currentStep === 'proof' && (
          <Step3ProofOfDeath data={data} updateData={updateData} />
        )}
        {currentStep === 'attestation' && (
          <Step4Attestation data={data} updateData={updateData} />
        )}
        {currentStep === 'donation' && (
          <Step5Donation
            data={data}
            updateData={updateData}
            availableCredits={availableCredits}
          />
        )}
        {currentStep === 'review' && (
          <Step6Review data={data} />
        )}

        {/* Error message */}
        {submitError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{submitError}</p>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      {currentStep !== 'account' && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {currentStep === 'review' ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit for Review'
              )}
            </button>
          ) : (
            <button
              onClick={goNext}
              disabled={!isStepValid(currentStep, data)}
              className="flex items-center gap-2 bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Validation logic for each step
function isStepValid(step: WizardStep, data: WizardData): boolean {
  switch (step) {
    case 'account':
      return data.isAuthenticated && !!data.fullName;

    case 'deceased':
      return (
        !!data.deceasedFullName &&
        !!data.deceasedDob &&
        !!data.deceasedDod &&
        !!data.relationship
      );

    case 'proof':
      if (data.proofType === 'obituary_url') return !!data.obituaryUrl;
      if (data.proofType === 'funeral_home') return !!data.funeralHomeName && !!data.funeralHomeCity;
      if (data.proofType === 'newspaper_link') return !!data.newspaperUrl;
      if (data.proofType === 'hardship_attestation') return !!data.hardshipNote;
      return false;

    case 'attestation':
      return data.attestationAccepted;

    case 'donation':
      return data.isHardship || data.donationAmount >= 0;

    case 'review':
      return true;

    default:
      return false;
  }
}

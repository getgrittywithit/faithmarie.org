'use client';

import { Check } from 'lucide-react';
import type { WizardData } from '../MemorialWizard';

interface Step5DonationProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

type PlanTier = 'standard' | 'founder' | 'hardship';

export default function Step5Donation({ data, updateData }: Step5DonationProps) {
  const currentTier: PlanTier = data.isHardship ? 'hardship' : (data.donationAmount === 99 ? 'founder' : 'standard');

  const handleTierSelect = (tier: PlanTier) => {
    if (tier === 'standard') {
      updateData({ donationAmount: 20, isHardship: false });
    } else if (tier === 'founder') {
      updateData({ donationAmount: 99, isHardship: false });
    } else {
      updateData({ donationAmount: 0, isHardship: true });
    }
  };

  return (
    <div>
      <h2 className="font-serif text-xl text-stone-900 mb-2">
        Choose your plan
      </h2>
      <p className="text-stone-600 mb-6">
        Select a hosting plan for your memorial. Both paid options include the same features.
      </p>

      {/* Plan options */}
      <div className="space-y-3 mb-6">
        {/* Standard */}
        <button
          type="button"
          onClick={() => handleTierSelect('standard')}
          className={`w-full p-5 text-left rounded-xl border-2 transition-all ${
            currentTier === 'standard'
              ? 'border-deep-teal bg-soft-aqua/20'
              : 'border-stone-200 hover:border-stone-300 bg-white'
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-semibold text-stone-900">Standard</span>
                <span className="text-lg font-semibold text-deep-teal">$20</span>
              </div>
              <p className="text-sm text-stone-600">
                Memorial hosted for 10 years
              </p>
            </div>
            {currentTier === 'standard' && (
              <div className="w-6 h-6 bg-deep-teal rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        </button>

        {/* Founder */}
        <button
          type="button"
          onClick={() => handleTierSelect('founder')}
          className={`w-full p-5 text-left rounded-xl border-2 transition-all ${
            currentTier === 'founder'
              ? 'border-deep-teal bg-soft-aqua/20'
              : 'border-stone-200 hover:border-stone-300 bg-white'
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-semibold text-stone-900">Founder</span>
                <span className="text-lg font-semibold text-deep-teal">$99</span>
              </div>
              <p className="text-sm text-stone-600">
                Lifetime hosting*
              </p>
            </div>
            {currentTier === 'founder' && (
              <div className="w-6 h-6 bg-deep-teal rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        </button>

        {/* Hardship waiver */}
        <button
          type="button"
          onClick={() => handleTierSelect('hardship')}
          className={`w-full p-5 text-left rounded-xl border-2 transition-all ${
            currentTier === 'hardship'
              ? 'border-deep-teal bg-soft-aqua/20'
              : 'border-stone-200 hover:border-stone-300 bg-white'
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-semibold text-stone-900">Hardship waiver</span>
                <span className="text-sm font-medium text-stone-500">No charge</span>
              </div>
              <p className="text-sm text-stone-600">
                If cost is a barrier, we&apos;ll never turn you away
              </p>
            </div>
            {currentTier === 'hardship' && (
              <div className="w-6 h-6 bg-deep-teal rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Hardship reason field */}
      {data.isHardship && (
        <div className="mb-6">
          <label htmlFor="hardshipReason" className="block text-sm font-medium text-stone-700 mb-1">
            Anything you&apos;d like us to know? <span className="text-stone-400">(optional)</span>
          </label>
          <textarea
            id="hardshipReason"
            value={data.hardshipReason}
            onChange={(e) => updateData({ hardshipReason: e.target.value })}
            rows={2}
            className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-deep-teal resize-none bg-warm-cream"
            placeholder="This is optional and confidential"
          />
        </div>
      )}

      {/* Asterisk note */}
      <p className="text-xs text-stone-500 leading-relaxed">
        *If Faith Marie Foundation ever discontinues this service, you&apos;ll receive a downloadable
        archive and your memorial will be preserved on the Internet Archive.
      </p>

      {/* Service fee note */}
      {!data.isHardship && (
        <div className="mt-4 p-4 bg-stone-50 border border-stone-200 rounded-lg">
          <p className="text-xs text-stone-600">
            This is a service fee for memorial hosting, not a charitable donation.
            A separate receipt will be provided for your records.
          </p>
        </div>
      )}
    </div>
  );
}

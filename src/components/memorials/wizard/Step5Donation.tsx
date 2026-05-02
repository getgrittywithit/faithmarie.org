'use client';

import { Heart, Gift } from 'lucide-react';
import type { WizardData } from '../MemorialWizard';

interface Step5DonationProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
  availableCredits: number;
}

const presetAmounts = [10, 20, 50, 100];

export default function Step5Donation({ data, updateData, availableCredits }: Step5DonationProps) {
  const handleAmountSelect = (amount: number) => {
    updateData({ donationAmount: amount, isHardship: false });
  };

  const handleHardshipToggle = () => {
    updateData({ isHardship: !data.isHardship, donationAmount: 0 });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Support This Work
      </h2>
      <p className="text-gray-600 mb-6">
        Your donation helps us maintain memorials and provide this service to other grieving families.
      </p>

      {/* Suggested amounts */}
      {!data.isHardship && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Choose an amount
          </label>
          <div className="grid grid-cols-4 gap-3 mb-4">
            {presetAmounts.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => handleAmountSelect(amount)}
                className={`py-3 px-4 rounded-lg border-2 transition-all ${
                  data.donationAmount === amount && !data.isHardship
                    ? 'border-teal-600 bg-teal-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-lg font-medium text-gray-800">${amount}</span>
              </button>
            ))}
          </div>

          {/* Custom amount */}
          <div>
            <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700 mb-1">
              Or enter a custom amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                id="customAmount"
                min="0"
                value={data.donationAmount || ''}
                onChange={(e) => updateData({ donationAmount: parseInt(e.target.value) || 0, isHardship: false })}
                className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="0"
              />
            </div>
          </div>

          {/* $20 suggestion note */}
          {data.donationAmount === 20 && (
            <div className="mt-3 flex items-start gap-2 text-teal-700 bg-teal-50 p-3 rounded-lg">
              <Heart className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                <strong>$20 covers 10 years of hosting</strong> and funds a free memorial for
                another family through our pay-it-forward program.
              </p>
            </div>
          )}

          {/* Pay-it-forward note for larger donations */}
          {data.donationAmount > 20 && (
            <div className="mt-3 flex items-start gap-2 text-teal-700 bg-teal-50 p-3 rounded-lg">
              <Gift className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                Your generous donation will fund <strong>{Math.floor(data.donationAmount / 20)} free memorial{Math.floor(data.donationAmount / 20) > 1 ? 's' : ''}</strong> for
                families who can&apos;t afford to pay.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Hardship waiver option */}
      <div className="border-t border-gray-200 pt-6">
        <button
          type="button"
          onClick={handleHardshipToggle}
          className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
            data.isHardship
              ? 'border-teal-600 bg-teal-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <span className="font-medium text-gray-800 block">I need a hardship waiver</span>
          <span className="text-sm text-gray-500">
            We&apos;ll never turn anyone away for inability to pay
          </span>
        </button>

        {data.isHardship && (
          <div className="mt-4">
            <label htmlFor="hardshipReason" className="block text-sm font-medium text-gray-700 mb-1">
              Anything you&apos;d like us to know? <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              id="hardshipReason"
              value={data.hardshipReason}
              onChange={(e) => updateData({ hardshipReason: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
              placeholder="This is optional and confidential"
            />

            {availableCredits > 0 && (
              <p className="mt-2 text-sm text-green-600">
                Good news! There are <strong>{availableCredits} pay-it-forward credits</strong> available,
                so your memorial can be approved without additional review.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Note about tax deductibility */}
      {!data.isHardship && data.donationAmount > 0 && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Note:</strong> Faith Marie Foundation is a pending 501(c)(3) nonprofit.
            Your donation receipt will note &quot;tax-exempt status pending.&quot; Once approved,
            donations are retroactively tax-deductible.
          </p>
        </div>
      )}
    </div>
  );
}

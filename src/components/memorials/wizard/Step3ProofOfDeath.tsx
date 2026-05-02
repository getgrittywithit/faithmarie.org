'use client';

import { AlertTriangle } from 'lucide-react';
import type { WizardData } from '../MemorialWizard';
import type { ProofType } from '@/lib/supabase/types';

interface Step3ProofOfDeathProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

const proofOptions: { value: ProofType; label: string; description: string }[] = [
  {
    value: 'obituary_url',
    label: 'Online obituary or memorial notice',
    description: 'Link to Legacy.com, funeral home website, newspaper, etc.',
  },
  {
    value: 'funeral_home',
    label: 'Funeral home information',
    description: 'Name and location of the funeral home that handled services',
  },
  {
    value: 'newspaper_link',
    label: 'Newspaper death notice',
    description: 'Link to a published death notice',
  },
  {
    value: 'hardship_attestation',
    label: 'No online record available',
    description: 'For recent deaths or cases where no online record exists yet',
  },
];

export default function Step3ProofOfDeath({ data, updateData }: Step3ProofOfDeathProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Verification
      </h2>
      <p className="text-gray-600 mb-6">
        To protect families, we verify that all memorials are for real people who have passed away.
        Please provide one of the following:
      </p>

      {/* Proof type selection */}
      <div className="space-y-3 mb-6">
        {proofOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => updateData({ proofType: option.value })}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
              data.proofType === option.value
                ? 'border-teal-600 bg-teal-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="font-medium text-gray-800 block">{option.label}</span>
            <span className="text-sm text-gray-500">{option.description}</span>
          </button>
        ))}
      </div>

      {/* Conditional input fields based on selection */}
      <div className="space-y-4">
        {data.proofType === 'obituary_url' && (
          <div>
            <label htmlFor="obituaryUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Obituary URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="obituaryUrl"
              value={data.obituaryUrl}
              onChange={(e) => updateData({ obituaryUrl: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="https://..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Paste the full URL to the online obituary
            </p>
          </div>
        )}

        {data.proofType === 'funeral_home' && (
          <>
            <div>
              <label htmlFor="funeralHomeName" className="block text-sm font-medium text-gray-700 mb-1">
                Funeral Home Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="funeralHomeName"
                value={data.funeralHomeName}
                onChange={(e) => updateData({ funeralHomeName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter funeral home name"
              />
            </div>
            <div>
              <label htmlFor="funeralHomeCity" className="block text-sm font-medium text-gray-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="funeralHomeCity"
                value={data.funeralHomeCity}
                onChange={(e) => updateData({ funeralHomeCity: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="City where the funeral home is located"
              />
            </div>
          </>
        )}

        {data.proofType === 'newspaper_link' && (
          <div>
            <label htmlFor="newspaperUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Newspaper Link <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="newspaperUrl"
              value={data.newspaperUrl}
              onChange={(e) => updateData({ newspaperUrl: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="https://..."
            />
          </div>
        )}

        {data.proofType === 'hardship_attestation' && (
          <div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">This option takes longer to verify</p>
                  <p>
                    Without an online record, your memorial may take 24-48 hours longer to publish
                    as we verify through alternative means.
                  </p>
                </div>
              </div>
            </div>

            <label htmlFor="hardshipNote" className="block text-sm font-medium text-gray-700 mb-1">
              Please explain <span className="text-red-500">*</span>
            </label>
            <textarea
              id="hardshipNote"
              value={data.hardshipNote}
              onChange={(e) => updateData({ hardshipNote: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
              placeholder="Why is there no online record? (e.g., recent death, rural area, private services)"
            />
          </div>
        )}
      </div>

      {/* Warning about false information */}
      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Important:</strong> Providing false information to create a memorial for a living person
          or for someone you don&apos;t have permission to memorialize may result in permanent removal
          of the memorial and potential legal consequences.
        </p>
      </div>
    </div>
  );
}

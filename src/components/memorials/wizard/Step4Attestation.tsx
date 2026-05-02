'use client';

import { useEffect } from 'react';
import { Shield } from 'lucide-react';
import type { WizardData } from '../MemorialWizard';

interface Step4AttestationProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

const ATTESTATION_TEXT = `I am the {relationship} of {deceasedName}, or I have explicit permission from immediate family to create this memorial. I understand that the Faith Marie Foundation may email immediate family members named in the obituary before this memorial is published, giving them an opportunity to respond. I understand that knowingly providing false information may result in permanent removal and potential legal consequences.`;

export default function Step4Attestation({ data, updateData }: Step4AttestationProps) {
  // Get IP address on mount
  useEffect(() => {
    if (!data.attestationIp) {
      fetch('/api/ip')
        .then((res) => res.json())
        .then((result) => updateData({ attestationIp: result.ip }))
        .catch(() => updateData({ attestationIp: 'unknown' }));
    }
  }, [data.attestationIp, updateData]);

  const relationshipLabels: Record<string, string> = {
    parent: 'parent',
    spouse: 'spouse/partner',
    child: 'child',
    sibling: 'sibling',
    grandchild: 'grandchild',
    other_family: 'family member',
    close_friend: 'close friend',
    other: 'authorized representative',
  };

  const personalizedText = ATTESTATION_TEXT
    .replace('{relationship}', relationshipLabels[data.relationship] || 'authorized representative')
    .replace('{deceasedName}', data.deceasedFullName || '[deceased name]');

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Standing Attestation
      </h2>
      <p className="text-gray-600 mb-6">
        Please read and confirm the following statement to proceed.
      </p>

      {/* Attestation box */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <Shield className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
          <p className="text-gray-700 leading-relaxed">
            {personalizedText}
          </p>
        </div>
      </div>

      {/* Checkbox */}
      <label className="flex items-start gap-3 cursor-pointer group">
        <div className="flex items-center justify-center w-6 h-6 mt-0.5">
          <input
            type="checkbox"
            checked={data.attestationAccepted}
            onChange={(e) => updateData({ attestationAccepted: e.target.checked })}
            className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500 cursor-pointer"
          />
        </div>
        <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
          I have read and agree to the above statement
        </span>
      </label>

      {/* Recording notice */}
      <div className="mt-6 p-4 bg-teal-50 border border-teal-100 rounded-lg">
        <p className="text-sm text-teal-800">
          <strong>Your attestation will be recorded</strong> with your name ({data.fullName}),
          email ({data.email}), IP address, and timestamp for verification purposes.
        </p>
      </div>
    </div>
  );
}

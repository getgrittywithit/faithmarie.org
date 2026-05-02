'use client';

import { Calendar, MapPin, User, Link2, DollarSign, CheckCircle } from 'lucide-react';
import type { WizardData } from '../MemorialWizard';

interface Step6ReviewProps {
  data: WizardData;
}

const relationshipLabels: Record<string, string> = {
  parent: 'Parent',
  spouse: 'Spouse/Partner',
  child: 'Child',
  sibling: 'Sibling',
  grandchild: 'Grandchild',
  other_family: 'Other family',
  close_friend: 'Close friend',
  other: 'Other',
};

const proofTypeLabels: Record<string, string> = {
  obituary_url: 'Online obituary',
  funeral_home: 'Funeral home',
  newspaper_link: 'Newspaper notice',
  hardship_attestation: 'No online record (manual review)',
};

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function Step6Review({ data }: Step6ReviewProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Review Your Memorial
      </h2>
      <p className="text-gray-600 mb-6">
        Please review the information below before submitting. You can go back to make changes.
      </p>

      <div className="space-y-6">
        {/* Your Information */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
            <User className="w-4 h-4" />
            Your Information
          </h3>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <dt className="text-gray-500">Name</dt>
            <dd className="text-gray-800">{data.fullName}</dd>
            <dt className="text-gray-500">Email</dt>
            <dd className="text-gray-800">{data.email}</dd>
            {data.phone && (
              <>
                <dt className="text-gray-500">Phone</dt>
                <dd className="text-gray-800">{data.phone}</dd>
              </>
            )}
            <dt className="text-gray-500">Relationship</dt>
            <dd className="text-gray-800">{relationshipLabels[data.relationship]}</dd>
          </dl>
        </div>

        {/* Deceased Information */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Memorial For
          </h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Name</dt>
              <dd className="text-gray-800 font-medium">{data.deceasedFullName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Born</dt>
              <dd className="text-gray-800">{formatDate(data.deceasedDob)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Died</dt>
              <dd className="text-gray-800">{formatDate(data.deceasedDod)}</dd>
            </div>
            {(data.deceasedCity || data.deceasedState) && (
              <div className="flex justify-between items-center">
                <dt className="text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Location
                </dt>
                <dd className="text-gray-800">
                  {[data.deceasedCity, data.deceasedState].filter(Boolean).join(', ')}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Verification */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
            <Link2 className="w-4 h-4" />
            Verification
          </h3>
          <dl className="text-sm">
            <dt className="text-gray-500 mb-1">Method</dt>
            <dd className="text-gray-800">{proofTypeLabels[data.proofType]}</dd>
            {data.proofType === 'obituary_url' && data.obituaryUrl && (
              <dd className="text-teal-600 text-xs mt-1 truncate">{data.obituaryUrl}</dd>
            )}
            {data.proofType === 'funeral_home' && (
              <dd className="text-gray-600 text-xs mt-1">
                {data.funeralHomeName}, {data.funeralHomeCity}
              </dd>
            )}
            {data.proofType === 'newspaper_link' && data.newspaperUrl && (
              <dd className="text-teal-600 text-xs mt-1 truncate">{data.newspaperUrl}</dd>
            )}
          </dl>
        </div>

        {/* Attestation */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-700">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Attestation accepted</span>
          </div>
        </div>

        {/* Donation */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Donation
          </h3>
          {data.isHardship ? (
            <p className="text-sm text-gray-600">
              Hardship waiver requested
              {data.hardshipReason && (
                <span className="block text-gray-500 mt-1 italic">
                  &quot;{data.hardshipReason}&quot;
                </span>
              )}
            </p>
          ) : (
            <p className="text-sm text-gray-800">
              <span className="text-lg font-medium">${data.donationAmount}</span>
              {data.donationAmount >= 20 && (
                <span className="text-gray-500 ml-2">
                  (funds {Math.floor(data.donationAmount / 20)} pay-it-forward credit{Math.floor(data.donationAmount / 20) > 1 ? 's' : ''})
                </span>
              )}
            </p>
          )}
        </div>
      </div>

      {/* What happens next */}
      <div className="mt-6 p-4 bg-teal-50 border border-teal-100 rounded-lg">
        <h3 className="font-medium text-teal-800 mb-2">What happens next?</h3>
        <ol className="text-sm text-teal-700 space-y-1 list-decimal list-inside">
          <li>Your memorial will be reviewed within 24-48 hours</li>
          <li>We&apos;ll email you when it&apos;s published</li>
          <li>You can start adding photos and content while you wait</li>
          {!data.isHardship && data.donationAmount > 0 && (
            <li>You&apos;ll be redirected to complete your donation after submitting</li>
          )}
        </ol>
      </div>
    </div>
  );
}

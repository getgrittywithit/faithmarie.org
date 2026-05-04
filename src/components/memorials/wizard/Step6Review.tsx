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
      <h2 className="font-serif text-xl text-stone-900 mb-2">
        Review your memorial
      </h2>
      <p className="text-stone-600 mb-6">
        Please review the information below before submitting. You can go back to make changes.
      </p>

      <div className="space-y-6">
        {/* Your Information */}
        <div className="bg-stone-50 rounded-lg p-4">
          <h3 className="font-medium text-stone-900 mb-3 flex items-center gap-2">
            <User className="w-4 h-4" />
            Your information
          </h3>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <dt className="text-stone-500">Name</dt>
            <dd className="text-stone-800">{data.fullName}</dd>
            <dt className="text-stone-500">Email</dt>
            <dd className="text-stone-800">{data.email}</dd>
            {data.phone && (
              <>
                <dt className="text-stone-500">Phone</dt>
                <dd className="text-stone-800">{data.phone}</dd>
              </>
            )}
            <dt className="text-stone-500">Relationship</dt>
            <dd className="text-stone-800">{relationshipLabels[data.relationship]}</dd>
          </dl>
        </div>

        {/* Deceased Information */}
        <div className="bg-stone-50 rounded-lg p-4">
          <h3 className="font-medium text-stone-900 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Memorial for
          </h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-stone-500">Name</dt>
              <dd className="text-stone-800 font-medium">{data.deceasedFullName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Born</dt>
              <dd className="text-stone-800">{formatDate(data.deceasedDob)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Died</dt>
              <dd className="text-stone-800">{formatDate(data.deceasedDod)}</dd>
            </div>
            {(data.deceasedCity || data.deceasedState) && (
              <div className="flex justify-between items-center">
                <dt className="text-stone-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Location
                </dt>
                <dd className="text-stone-800">
                  {[data.deceasedCity, data.deceasedState].filter(Boolean).join(', ')}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Verification */}
        <div className="bg-stone-50 rounded-lg p-4">
          <h3 className="font-medium text-stone-900 mb-3 flex items-center gap-2">
            <Link2 className="w-4 h-4" />
            Verification
          </h3>
          <dl className="text-sm">
            <dt className="text-stone-500 mb-1">Method</dt>
            <dd className="text-stone-800">{proofTypeLabels[data.proofType]}</dd>
            {data.proofType === 'obituary_url' && data.obituaryUrl && (
              <dd className="text-deep-teal text-xs mt-1 truncate">{data.obituaryUrl}</dd>
            )}
            {data.proofType === 'funeral_home' && (
              <dd className="text-stone-600 text-xs mt-1">
                {data.funeralHomeName}, {data.funeralHomeCity}
              </dd>
            )}
            {data.proofType === 'newspaper_link' && data.newspaperUrl && (
              <dd className="text-deep-teal text-xs mt-1 truncate">{data.newspaperUrl}</dd>
            )}
          </dl>
        </div>

        {/* Attestation */}
        <div className="bg-soft-aqua/30 rounded-lg p-4">
          <div className="flex items-center gap-2 text-deep-teal">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Attestation accepted</span>
          </div>
        </div>

        {/* Plan */}
        <div className="bg-stone-50 rounded-lg p-4">
          <h3 className="font-medium text-stone-900 mb-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Plan
          </h3>
          {data.isHardship ? (
            <p className="text-sm text-stone-600">
              Hardship waiver requested
              {data.hardshipReason && (
                <span className="block text-stone-500 mt-1 italic">
                  &quot;{data.hardshipReason}&quot;
                </span>
              )}
            </p>
          ) : (
            <p className="text-sm text-stone-800">
              <span className="text-lg font-medium">${data.donationAmount}</span>
              <span className="text-stone-500 ml-2">
                {data.donationAmount === 99 ? '(Founder — lifetime hosting)' : '(Standard — 10 years)'}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* What happens next */}
      <div className="mt-6 p-4 bg-soft-aqua/20 border border-soft-aqua rounded-lg">
        <h3 className="font-medium text-stone-900 mb-2">What happens next?</h3>
        <ol className="text-sm text-stone-700 space-y-1 list-decimal list-inside">
          <li>Your memorial will be reviewed within 24-48 hours</li>
          <li>We&apos;ll email you when it&apos;s published</li>
          <li>You can start adding photos and content while you wait</li>
          {!data.isHardship && data.donationAmount > 0 && (
            <li>You&apos;ll be redirected to complete your payment after submitting</li>
          )}
        </ol>
      </div>
    </div>
  );
}

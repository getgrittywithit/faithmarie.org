'use client';

import type { WizardData } from '../MemorialWizard';
import type { RelationshipType } from '@/lib/supabase/types';

interface Step2DeceasedInfoProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

const relationships: { value: RelationshipType; label: string }[] = [
  { value: 'parent', label: 'Parent of the deceased' },
  { value: 'spouse', label: 'Spouse/Partner' },
  { value: 'child', label: 'Child of the deceased' },
  { value: 'sibling', label: 'Sibling' },
  { value: 'grandchild', label: 'Grandchild' },
  { value: 'other_family', label: 'Other family member' },
  { value: 'close_friend', label: 'Close friend' },
  { value: 'other', label: 'Other' },
];

const usStates = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
  'DC', 'PR', 'VI',
];

export default function Step2DeceasedInfo({ data, updateData }: Step2DeceasedInfoProps) {
  // Calculate max date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Tell Us About Your Loved One
      </h2>
      <p className="text-gray-600 mb-6">
        This information will be used to create the memorial page.
      </p>

      <div className="space-y-5">
        {/* Full Name */}
        <div>
          <label htmlFor="deceasedName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="deceasedName"
            value={data.deceasedFullName}
            onChange={(e) => updateData({ deceasedFullName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter their full name"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="dob"
              value={data.deceasedDob}
              onChange={(e) => updateData({ deceasedDob: e.target.value })}
              max={today}
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label htmlFor="dod" className="block text-sm font-medium text-gray-700 mb-1">
              Date of Death <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="dod"
              value={data.deceasedDod}
              onChange={(e) => updateData({ deceasedDod: e.target.value })}
              min={data.deceasedDob || undefined}
              max={today}
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              id="city"
              value={data.deceasedCity}
              onChange={(e) => updateData({ deceasedCity: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="City"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State <span className="text-gray-400">(optional)</span>
            </label>
            <select
              id="state"
              value={data.deceasedState}
              onChange={(e) => updateData({ deceasedState: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Select state</option>
              {usStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Relationship */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Relationship to the Deceased <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {relationships.map((rel) => (
              <button
                key={rel.value}
                type="button"
                onClick={() => updateData({ relationship: rel.value })}
                className={`p-3 text-left text-sm rounded-lg border-2 transition-all ${
                  data.relationship === rel.value
                    ? 'border-teal-600 bg-teal-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {rel.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

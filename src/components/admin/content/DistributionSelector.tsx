'use client';

import { Globe, Mail, Globe2 } from 'lucide-react';
import type { DistributionChannel } from '@/lib/supabase/types';

interface DistributionSelectorProps {
  value: DistributionChannel;
  onChange: (value: DistributionChannel) => void;
}

const options: {
  value: DistributionChannel;
  label: string;
  description: string;
  icon: typeof Globe;
}[] = [
  {
    value: 'website',
    label: 'Website',
    description: 'Publish to blog only',
    icon: Globe,
  },
  {
    value: 'newsletter',
    label: 'Newsletter',
    description: 'Send via email only',
    icon: Mail,
  },
  {
    value: 'both',
    label: 'Both',
    description: 'Publish and send email',
    icon: Globe2,
  },
];

export default function DistributionSelector({
  value,
  onChange,
}: DistributionSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Distribution
      </label>
      <div className="grid grid-cols-3 gap-3">
        {options.map((option) => {
          const isSelected = value === option.value;
          const Icon = option.icon;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`relative flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <Icon
                className={`h-6 w-6 mb-2 ${
                  isSelected ? 'text-teal-600' : 'text-gray-400'
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  isSelected ? 'text-teal-700' : 'text-gray-700'
                }`}
              >
                {option.label}
              </span>
              <span
                className={`text-xs mt-1 ${
                  isSelected ? 'text-teal-600' : 'text-gray-500'
                }`}
              >
                {option.description}
              </span>

              {isSelected && (
                <div className="absolute top-2 right-2">
                  <div className="h-4 w-4 bg-teal-500 rounded-full flex items-center justify-center">
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

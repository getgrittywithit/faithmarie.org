'use client';

import { Check } from 'lucide-react';

export const TOPICS = [
  { value: 'grief', label: 'Grief', color: 'bg-blue-100 text-blue-700' },
  { value: 'ptsd', label: 'PTSD', color: 'bg-purple-100 text-purple-700' },
  { value: 'depression', label: 'Depression', color: 'bg-orange-100 text-orange-700' },
  { value: 'anxiety', label: 'Anxiety', color: 'bg-green-100 text-green-700' },
] as const;

interface TopicSelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
  counts?: Record<string, number>;
}

export default function TopicSelector({
  value,
  onChange,
  counts,
}: TopicSelectorProps) {
  const toggleTopic = (topic: string) => {
    if (value.includes(topic)) {
      onChange(value.filter((t) => t !== topic));
    } else {
      onChange([...value, topic]);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Topics
      </label>
      <div className="flex flex-wrap gap-2">
        {TOPICS.map((topic) => {
          const isSelected = value.includes(topic.value);
          const count = counts?.[topic.value];

          return (
            <button
              key={topic.value}
              type="button"
              onClick={() => toggleTopic(topic.value)}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div
                className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${
                  isSelected
                    ? 'bg-teal-500 border-teal-500'
                    : 'border-gray-300'
                }`}
              >
                {isSelected && <Check className="h-3 w-3 text-white" />}
              </div>
              <span
                className={`text-sm font-medium ${
                  isSelected ? 'text-teal-700' : 'text-gray-700'
                }`}
              >
                {topic.label}
              </span>
              {count !== undefined && (
                <span
                  className={`text-xs px-1.5 py-0.5 rounded ${topic.color}`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {value.length === 0 && (
        <p className="mt-2 text-sm text-gray-500">
          No topics selected. Post will be sent to all subscribers.
        </p>
      )}
    </div>
  );
}

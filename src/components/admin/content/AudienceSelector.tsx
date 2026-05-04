'use client';

import { useState, useEffect } from 'react';
import { Check, Users } from 'lucide-react';
import { TOPICS } from './TopicSelector';

interface AudienceSelectorProps {
  selectedTopics: string[];
  onTopicsChange: (topics: string[]) => void;
  selectAll: boolean;
  onSelectAllChange: (selectAll: boolean) => void;
  topicCounts: Record<string, number>;
  totalSubscribers: number;
}

export default function AudienceSelector({
  selectedTopics,
  onTopicsChange,
  selectAll,
  onSelectAllChange,
  topicCounts,
  totalSubscribers,
}: AudienceSelectorProps) {
  const [estimatedReach, setEstimatedReach] = useState(totalSubscribers);

  useEffect(() => {
    if (selectAll) {
      setEstimatedReach(totalSubscribers);
    } else if (selectedTopics.length === 0) {
      setEstimatedReach(totalSubscribers);
    } else {
      // Estimate reach based on selected topics
      // This is a rough estimate since subscribers may have multiple topics
      const uniqueReach = selectedTopics.reduce(
        (sum, topic) => sum + (topicCounts[topic] || 0),
        0
      );
      // Cap at total subscribers and apply a de-duplication factor
      setEstimatedReach(Math.min(uniqueReach, totalSubscribers));
    }
  }, [selectAll, selectedTopics, topicCounts, totalSubscribers]);

  const toggleTopic = (topic: string) => {
    if (selectAll) {
      // Switch to topic selection mode
      onSelectAllChange(false);
      onTopicsChange([topic]);
    } else if (selectedTopics.includes(topic)) {
      onTopicsChange(selectedTopics.filter((t) => t !== topic));
    } else {
      onTopicsChange([...selectedTopics, topic]);
    }
  };

  const handleSelectAll = () => {
    onSelectAllChange(true);
    onTopicsChange([]);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Target Audience
      </label>

      {/* All Subscribers Option */}
      <button
        type="button"
        onClick={handleSelectAll}
        className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
          selectAll
            ? 'border-teal-500 bg-teal-50'
            : 'border-gray-200 hover:border-gray-300 bg-white'
        }`}
      >
        <div
          className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${
            selectAll ? 'bg-teal-500 border-teal-500' : 'border-gray-300'
          }`}
        >
          {selectAll && <Check className="h-3 w-3 text-white" />}
        </div>
        <Users className={`h-5 w-5 ${selectAll ? 'text-teal-600' : 'text-gray-400'}`} />
        <span className={`font-medium ${selectAll ? 'text-teal-700' : 'text-gray-700'}`}>
          All Subscribers
        </span>
        <span className={`ml-auto text-sm ${selectAll ? 'text-teal-600' : 'text-gray-500'}`}>
          ({totalSubscribers})
        </span>
      </button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or filter by topic</span>
        </div>
      </div>

      {/* Topic Filters */}
      <div className="space-y-2">
        {TOPICS.map((topic) => {
          const isSelected = !selectAll && selectedTopics.includes(topic.value);
          const count = topicCounts[topic.value] || 0;

          return (
            <button
              key={topic.value}
              type="button"
              onClick={() => toggleTopic(topic.value)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div
                className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-teal-500 border-teal-500' : 'border-gray-300'
                }`}
              >
                {isSelected && <Check className="h-3 w-3 text-white" />}
              </div>
              <span
                className={`font-medium ${
                  isSelected ? 'text-teal-700' : 'text-gray-700'
                }`}
              >
                {topic.label}
              </span>
              <span
                className={`ml-auto text-sm px-2 py-0.5 rounded ${topic.color}`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Estimated Reach */}
      <div className="bg-gray-50 rounded-lg p-4 mt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Estimated reach</span>
          <span className="text-lg font-semibold text-gray-800">
            {estimatedReach.toLocaleString()} subscribers
          </span>
        </div>
      </div>
    </div>
  );
}

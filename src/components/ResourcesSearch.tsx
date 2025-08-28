'use client';

import { useState } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
  onFilterChange: (filter: string) => void;
}

export default function ResourcesSearch({ onSearch, onFilterChange }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const filters = [
    { value: 'all', label: 'All Resources' },
    { value: 'new-diagnosis', label: 'New Diagnosis' },
    { value: 'treatment', label: 'During Treatment' },
    { value: 'financial', label: 'Financial Help' },
    { value: 'grief', label: 'Grief Support' },
    { value: 'emergency', label: 'Emergency Help' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Resources
          </label>
          <input
            id="search"
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search for specific help..."
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-lg"
          />
        </div>
        <div className="md:w-64">
          <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Situation
          </label>
          <select
            id="filter"
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-lg"
          >
            {filters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
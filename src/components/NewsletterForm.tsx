'use client';

import { useState, useEffect } from 'react';

type Topic = 'depression' | 'anxiety' | 'ptsd' | 'grief';

interface NewsletterFormProps {
  variant?: 'full' | 'compact';
  preselectedTopic?: Topic;
  className?: string;
}

const TOPICS: { id: Topic; label: string }[] = [
  { id: 'depression', label: 'Depression' },
  { id: 'anxiety', label: 'Anxiety' },
  { id: 'ptsd', label: 'PTSD' },
  { id: 'grief', label: 'Grief' },
];

export default function NewsletterForm({ variant = 'full', preselectedTopic, className = '' }: NewsletterFormProps) {
  const [isExpanded, setIsExpanded] = useState(variant === 'compact');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>(preselectedTopic ? [preselectedTopic] : []);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (preselectedTopic && !selectedTopics.includes(preselectedTopic)) {
      setSelectedTopics([preselectedTopic]);
    }
  }, [preselectedTopic, selectedTopics]);

  const toggleTopic = (topic: Topic) => {
    setSelectedTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      setStatus('error');
      return;
    }

    setIsLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName: firstName.trim() || undefined,
          topics: selectedTopics.length > 0 ? selectedTopics : undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setFirstName('');
        setSelectedTopics([]);
      } else {
        setErrorMessage(data.error || 'Failed to subscribe');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Something went wrong. Please try again.');
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'success') {
    return (
      <div className={`bg-teal-50 text-teal-700 px-6 py-3 rounded-md text-center ${className}`}>
        <svg className="w-5 h-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        You&apos;re subscribed! Check your email for confirmation.
      </div>
    );
  }

  // Compact variant - always expanded, no topics, inline form
  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className={`${className}`}>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-800"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-teal-600 text-white px-4 py-2 text-sm rounded-md hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isLoading ? '...' : 'Subscribe'}
          </button>
        </div>
        {status === 'error' && (
          <p className="text-red-600 text-xs mt-1">{errorMessage}</p>
        )}
      </form>
    );
  }

  // Full variant - expandable with topic selection
  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className={`bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-colors ${className}`}
      >
        Join the Newsletter
      </button>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name (optional)"
            className="sm:w-40 px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            disabled={isLoading}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="flex-1 px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            disabled={isLoading}
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      {/* Topic selection */}
      <div className="space-y-2">
        <p className="text-sm text-gray-600">Select topics you&apos;re interested in (optional):</p>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((topic) => (
            <button
              key={topic.id}
              type="button"
              onClick={() => toggleTopic(topic.id)}
              className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                selectedTopics.includes(topic.id)
                  ? 'bg-teal-600 text-white border-teal-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-teal-300'
              }`}
            >
              {topic.label}
            </button>
          ))}
        </div>
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm">{errorMessage}</p>
      )}
    </div>
  );
}

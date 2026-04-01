'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setEmail('');
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
      <div className="bg-indigo-50 text-indigo-700 px-6 py-3 rounded-md text-center">
        <svg className="w-5 h-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        You&apos;re subscribed!
      </div>
    );
  }

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Join the Newsletter
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap"
      >
        {isLoading ? 'Subscribing...' : 'Subscribe'}
      </button>
      {status === 'error' && (
        <p className="text-red-600 text-sm sm:absolute sm:bottom-0 sm:left-0 sm:translate-y-full sm:mt-1">
          {errorMessage}
        </p>
      )}
    </form>
  );
}

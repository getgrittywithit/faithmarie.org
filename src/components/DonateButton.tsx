'use client';

import { useState } from 'react';

const PRESET_AMOUNTS = [
  { value: 2500, label: '$25' },
  { value: 5000, label: '$50' },
  { value: 10000, label: '$100' },
  { value: 25000, label: '$250' },
];

export default function DonateButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDonate = async () => {
    const amount = selectedAmount || (customAmount ? Math.round(parseFloat(customAmount) * 100) : 0);

    if (!amount || amount < 100) {
      setError('Please enter a valid amount (minimum $1)');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Failed to start checkout');
        setIsLoading(false);
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-colors"
      >
        Make a Donation
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Make a Donation</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Your donation powers our AI research teams and helps make mental health support accessible to everyone.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {PRESET_AMOUNTS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => {
                    setSelectedAmount(value);
                    setCustomAmount('');
                  }}
                  className={`py-3 px-4 rounded-md border-2 font-medium transition-colors ${
                    selectedAmount === value
                      ? 'border-teal-600 bg-teal-50 text-teal-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or enter a custom amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  placeholder="Enter amount"
                  className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-sm mb-4">{error}</p>
            )}

            <button
              onClick={handleDonate}
              disabled={isLoading || (!selectedAmount && !customAmount)}
              className="w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Redirecting...' : 'Continue to Payment'}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              You&apos;ll be redirected to Stripe for secure payment processing.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

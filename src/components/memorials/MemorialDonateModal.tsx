'use client';

import { useState } from 'react';
import { Heart, X, Loader2 } from 'lucide-react';

interface MemorialDonateModalProps {
  memorialId: string;
  deceasedName: string;
  isOpen: boolean;
  onClose: () => void;
}

const suggestedAmounts = [20, 50, 100, 250];

export default function MemorialDonateModal({
  memorialId,
  deceasedName,
  isOpen,
  onClose,
}: MemorialDonateModalProps) {
  const [amount, setAmount] = useState<number | null>(20);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleAmountSelect = (value: number) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(value);
    setAmount(null);
  };

  const getFinalAmount = () => {
    if (amount) return amount * 100; // Convert to cents
    if (customAmount) return parseInt(customAmount) * 100;
    return 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = getFinalAmount();

    if (finalAmount < 100) {
      alert('Minimum donation is $1');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/memorials/${memorialId}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalAmount,
          donorName,
          donorEmail,
          message,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to create checkout');
      }
    } catch (error) {
      console.error('Donation error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between">
          <h2 className="font-serif text-xl text-stone-900">
            Donate in memory
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <p className="text-stone-600">
            Honor {deceasedName}&apos;s memory with a donation to Faith Marie Foundation.
            Your gift supports grieving families and mental health research accessibility.
          </p>

          {/* Amount Selection */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Donation amount
            </label>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {suggestedAmounts.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleAmountSelect(value)}
                  className={`py-3 rounded-md border transition-colors ${
                    amount === value
                      ? 'bg-deep-teal text-white border-deep-teal'
                      : 'border-stone-200 text-stone-700 hover:border-deep-teal'
                  }`}
                >
                  ${value}
                </button>
              ))}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
                $
              </span>
              <input
                type="text"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder="Custom amount"
                className={`w-full pl-7 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-deep-teal ${
                  customAmount ? 'border-deep-teal' : 'border-stone-200'
                }`}
              />
            </div>
          </div>

          {/* Donor Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Your name (optional)
              </label>
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-teal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Your email (for receipt)
              </label>
              <input
                type="email"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-teal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Message (optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share a memory or message of support..."
                rows={3}
                className="w-full px-4 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-teal resize-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || getFinalAmount() < 100}
            className="w-full flex items-center justify-center gap-2 py-3 bg-deep-teal text-white rounded-md hover:bg-forest-teal disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Heart className="w-5 h-5" />
                Donate ${(getFinalAmount() / 100) || 0}
              </>
            )}
          </button>

          <p className="text-xs text-stone-500 text-center">
            Faith Marie Foundation is a pending 501(c)(3) nonprofit.
            Secure payment via Stripe.
          </p>
        </form>
      </div>
    </div>
  );
}

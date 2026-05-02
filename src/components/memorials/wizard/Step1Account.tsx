'use client';

import { useState } from 'react';
import { Mail, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import type { WizardData } from '../MemorialWizard';

interface Step1AccountProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
  onNext: () => void;
}

export default function Step1Account({ data, updateData, onNext }: Step1AccountProps) {
  const [email, setEmail] = useState(data.email);
  const [fullName, setFullName] = useState(data.fullName);
  const [phone, setPhone] = useState(data.phone);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [isVerified, setIsVerified] = useState(data.isAuthenticated);

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setMagicLinkSent(true);
      } else {
        setError(result.error || 'Failed to send verification email');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (code: string) => {
    if (code.length !== 6) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsVerified(true);
        updateData({
          email,
          isAuthenticated: true,
          userId: result.userId,
        });
      } else {
        setError(result.error || 'Invalid verification code');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }

    updateData({
      email,
      fullName: fullName.trim(),
      phone: phone.trim(),
      isAuthenticated: isVerified,
    });
    onNext();
  };

  // Email entry form
  if (!magicLinkSent && !isVerified) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Create Your Account
        </h2>
        <p className="text-gray-600 mb-6">
          We&apos;ll send you a verification link to confirm your email.
        </p>

        <form onSubmit={handleSendMagicLink} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="you@example.com"
                disabled={isLoading}
                required
              />
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading || !email}
            className="w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Continue with Email
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    );
  }

  // Magic link sent - waiting for verification
  if (magicLinkSent && !isVerified) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Check Your Email
        </h2>
        <p className="text-gray-600 mb-6">
          We sent a 6-digit verification code to <strong>{email}</strong>
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              maxLength={6}
              onChange={(e) => {
                const code = e.target.value.replace(/\D/g, '');
                e.target.value = code;
                if (code.length === 6) {
                  handleVerifyCode(code);
                }
              }}
              className="w-full px-4 py-3 text-center text-2xl tracking-widest border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="000000"
              disabled={isLoading}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          {isLoading && (
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <Loader2 className="w-5 h-5 animate-spin" />
              Verifying...
            </div>
          )}

          <p className="text-sm text-gray-500 text-center">
            Didn&apos;t receive the email?{' '}
            <button
              onClick={() => setMagicLinkSent(false)}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Try again
            </button>
          </p>
        </div>
      </div>
    );
  }

  // Verified - collect name and phone
  return (
    <div>
      <div className="flex items-center gap-2 text-green-600 mb-4">
        <CheckCircle className="w-5 h-5" />
        <span className="font-medium">Email verified: {email}</span>
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Tell Us About Yourself
      </h2>
      <p className="text-gray-600 mb-6">
        This information helps us verify memorial creators and contact you if needed.
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Your Full Legal Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-gray-400">(optional but recommended)</span>
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="(555) 123-4567"
          />
          <p className="text-xs text-gray-500 mt-1">
            Used only for takedown requests or verification issues
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <button
          onClick={handleContinue}
          disabled={!fullName.trim()}
          className="w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Lock, Loader2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PasswordGateProps {
  slug: string;
  memorialName: string;
}

export default function PasswordGate({ slug, memorialName }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      setError('Please enter the password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/memorials/verify-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Redirect with verification token
        router.push(`/in-memory/${slug}?verified=true`);
      } else {
        setError('Incorrect password');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-stone-400" />
          </div>

          <h1 className="font-serif text-2xl text-stone-900 mb-2">
            Private memorial
          </h1>
          <p className="text-stone-600 mb-6">
            The memorial for <span className="font-serif italic">{memorialName}</span> is password protected.
            Please enter the password to view.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 text-center border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-deep-teal bg-warm-cream"
                placeholder="Enter password"
                autoFocus
              />
            </div>

            {error && (
              <div className="flex items-center justify-center gap-2 text-rose-900 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full bg-deep-teal text-white py-3 rounded-lg hover:bg-forest-teal disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                'View memorial'
              )}
            </button>
          </form>

          <p className="text-sm text-stone-500 mt-6">
            Don&apos;t have the password? Contact the memorial creator.
          </p>
        </div>
      </div>
    </div>
  );
}

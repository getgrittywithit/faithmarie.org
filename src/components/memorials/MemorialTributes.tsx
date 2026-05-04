'use client';

import { useState } from 'react';
import { Heart, Send, Loader2, CheckCircle, Flame, Flower2, Bird } from 'lucide-react';
import type { Tribute } from '@/lib/supabase/types';

const ICON_OPTIONS = [
  { id: 'none', label: 'None', icon: null },
  { id: 'candle', label: 'Candle', icon: Flame },
  { id: 'flower', label: 'Flower', icon: Flower2 },
  { id: 'dove', label: 'Dove', icon: Bird },
] as const;

type IconId = typeof ICON_OPTIONS[number]['id'];

interface MemorialTributesProps {
  memorialId: string;
  tributes: Tribute[];
  deceasedName: string;
}

export default function MemorialTributes({
  memorialId,
  tributes,
  deceasedName,
}: MemorialTributesProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [relationship, setRelationship] = useState('');
  const [message, setMessage] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<IconId>('none');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (honeypot) {
      setIsSubmitted(true);
      return;
    }

    if (!name || !email || !message) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`/api/memorials/${memorialId}/tributes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          relationship,
          message,
          icon: selectedIcon !== 'none' ? selectedIcon : undefined,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setName('');
        setEmail('');
        setRelationship('');
        setMessage('');
        setSelectedIcon('none');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to submit tribute');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Helper to get icon component for a tribute
  const getIconForTribute = (iconId: string | undefined) => {
    const option = ICON_OPTIONS.find(o => o.id === iconId);
    return option?.icon || null;
  };

  return (
    <section className="py-12 md:py-16 bg-warm-cream">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="font-serif text-3xl text-stone-900 mb-8 text-center">
          Tributes & memories
        </h2>

        {/* Tribute list */}
        {tributes.length > 0 ? (
          <div className="space-y-6 mb-8">
            {tributes.map((tribute) => {
              const TributeIcon = getIconForTribute((tribute as { icon?: string }).icon);
              return (
                <div
                  key={tribute.id}
                  className="bg-white rounded-lg p-5 border border-stone-200 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {TributeIcon && (
                        <TributeIcon className="w-4 h-4 text-champagne-gold" />
                      )}
                      <div>
                        <h3 className="font-medium text-stone-900">{tribute.visitor_name}</h3>
                        {tribute.visitor_relationship && (
                          <p className="text-sm text-stone-600">{tribute.visitor_relationship}</p>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-stone-500">
                      {formatDate(tribute.submitted_at)}
                    </span>
                  </div>
                  <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">
                    {tribute.message}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-lg mb-8 border border-stone-200">
            <Heart className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <p className="text-stone-600">No tributes yet</p>
            <p className="text-sm text-stone-500">Be the first to share a memory</p>
          </div>
        )}

        {/* Add tribute form */}
        {!isFormOpen && !isSubmitted && (
          <div className="text-center">
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center gap-2 bg-deep-teal text-white px-6 py-3 rounded-lg hover:bg-forest-teal transition-colors"
            >
              <Heart className="w-5 h-5" />
              Share a memory
            </button>
          </div>
        )}

        {isSubmitted && (
          <div className="bg-soft-aqua/30 border border-soft-aqua rounded-lg p-6 text-center">
            <CheckCircle className="w-10 h-10 text-deep-teal mx-auto mb-3" />
            <h3 className="font-medium text-stone-900 mb-2">Thank you</h3>
            <p className="text-stone-700 text-sm">
              Your tribute has been submitted and will appear after review.
            </p>
          </div>
        )}

        {isFormOpen && !isSubmitted && (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 space-y-4 border border-stone-200 shadow-sm">
            <h3 className="font-serif text-xl text-stone-900 mb-4">
              Share a memory of {deceasedName}
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="tributeName" className="block text-sm font-medium text-stone-700 mb-1">
                  Your name (required)
                </label>
                <input
                  type="text"
                  id="tributeName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-deep-teal bg-warm-cream"
                  required
                />
              </div>
              <div>
                <label htmlFor="tributeEmail" className="block text-sm font-medium text-stone-700 mb-1">
                  Email (required)
                </label>
                <input
                  type="email"
                  id="tributeEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-deep-teal bg-warm-cream"
                  required
                />
                <p className="text-xs text-stone-500 mt-1">Not displayed publicly</p>
              </div>
            </div>

            <div>
              <label htmlFor="tributeRelationship" className="block text-sm font-medium text-stone-700 mb-1">
                Relationship (optional)
              </label>
              <input
                type="text"
                id="tributeRelationship"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-deep-teal bg-warm-cream"
                placeholder="e.g., Friend, Coworker, Neighbor"
              />
            </div>

            <div>
              <label htmlFor="tributeMessage" className="block text-sm font-medium text-stone-700 mb-1">
                Your message (required)
              </label>
              <textarea
                id="tributeMessage"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-deep-teal resize-none bg-warm-cream"
                placeholder="Share a memory, kind words, or message of support..."
                required
              />
            </div>

            {/* Icon selector */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Add a symbol (optional)
              </label>
              <div className="flex gap-2">
                {ICON_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedIcon(option.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-colors ${
                      selectedIcon === option.id
                        ? 'border-deep-teal bg-soft-aqua/30 text-deep-teal'
                        : 'border-stone-200 bg-warm-cream text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    {option.icon && <option.icon className="w-4 h-4" />}
                    <span className="text-sm">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Honeypot */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {error && (
              <p className="text-sm text-rose-900">{error}</p>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="text-stone-600 hover:text-stone-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-deep-teal text-white px-6 py-2 rounded-lg hover:bg-forest-teal disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

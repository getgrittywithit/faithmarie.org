'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';

interface MemorialDonateProps {
  deceasedName: string;
  memorialId: string;
  accent: string;
}

export default function MemorialDonate({
  deceasedName,
  memorialId,
  accent,
}: MemorialDonateProps) {
  const accentClasses: Record<string, { bg: string; border: string; button: string; icon: string }> = {
    teal: {
      bg: 'bg-teal-900',
      border: 'border-teal-800',
      button: 'bg-white text-teal-900 hover:bg-teal-50',
      icon: 'text-teal-300',
    },
    amber: {
      bg: 'bg-amber-900',
      border: 'border-amber-800',
      button: 'bg-white text-amber-900 hover:bg-amber-50',
      icon: 'text-amber-300',
    },
    rose: {
      bg: 'bg-rose-900',
      border: 'border-rose-800',
      button: 'bg-white text-rose-900 hover:bg-rose-50',
      icon: 'text-rose-300',
    },
  };

  const colors = accentClasses[accent] || accentClasses.teal;

  return (
    <section className={`py-16 md:py-20 ${colors.bg}`}>
      <div className="max-w-2xl mx-auto px-4 text-center">
        <Heart className={`w-12 h-12 ${colors.icon} mx-auto mb-6`} />
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
          Honor {deceasedName}&apos;s Memory
        </h2>
        <p className="text-lg text-white/80 mb-8 leading-relaxed">
          A donation to Faith Marie Foundation helps grieving families access
          support and ensures memorial sites remain free for those in need.
        </p>
        <Link
          href={`/donate?in_memory=${memorialId}`}
          className={`inline-flex items-center gap-2 ${colors.button} px-8 py-4 rounded-lg text-lg font-medium transition-colors shadow-lg`}
        >
          <Heart className="w-5 h-5" />
          Donate in Memory
        </Link>
        <p className="text-sm text-white/60 mt-6">
          Faith Marie Foundation is a pending 501(c)(3) nonprofit organization
        </p>
      </div>
    </section>
  );
}

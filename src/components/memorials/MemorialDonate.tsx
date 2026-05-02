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
  const accentClasses: Record<string, { bg: string; border: string; button: string }> = {
    teal: {
      bg: 'bg-teal-50',
      border: 'border-teal-100',
      button: 'bg-teal-600 hover:bg-teal-700',
    },
    amber: {
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      button: 'bg-amber-600 hover:bg-amber-700',
    },
    rose: {
      bg: 'bg-rose-50',
      border: 'border-rose-100',
      button: 'bg-rose-600 hover:bg-rose-700',
    },
  };

  const colors = accentClasses[accent] || accentClasses.teal;

  return (
    <section className={`py-12 md:py-16 ${colors.bg} border-y ${colors.border}`}>
      <div className="max-w-2xl mx-auto px-4 text-center">
        <Heart className="w-10 h-10 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-light text-gray-800 mb-3">
          Honor {deceasedName}&apos;s Memory
        </h2>
        <p className="text-gray-600 mb-6">
          Make a donation to Faith Marie Foundation in {deceasedName}&apos;s memory.
          Your gift supports grieving families and funds free memorial sites for those in need.
        </p>
        <Link
          href={`/donate?in_memory=${memorialId}`}
          className={`inline-flex items-center gap-2 ${colors.button} text-white px-8 py-3 rounded-md transition-colors`}
        >
          <Heart className="w-5 h-5" />
          Donate in Memory
        </Link>
        <p className="text-sm text-gray-500 mt-4">
          Faith Marie Foundation is a pending 501(c)(3) nonprofit organization
        </p>
      </div>
    </section>
  );
}

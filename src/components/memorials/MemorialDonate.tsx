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
}: MemorialDonateProps) {
  return (
    <section className="py-16 md:py-20 bg-forest-teal">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <Heart className="w-12 h-12 text-champagne-gold mx-auto mb-6" />
        <h2 className="font-serif text-3xl md:text-4xl text-stone-50 mb-4">
          Honor {deceasedName}&apos;s memory
        </h2>
        <p className="text-lg text-stone-50/80 mb-8 leading-relaxed">
          A donation to Faith Marie Foundation helps grieving families access
          support and ensures memorial sites remain free for those in need.
        </p>
        <Link
          href={`/donate?in_memory=${memorialId}`}
          className="inline-flex items-center gap-2 bg-white text-forest-teal px-8 py-4 rounded-lg text-lg font-medium hover:bg-stone-50 transition-colors shadow-lg border-b-2 border-champagne-gold"
        >
          <Heart className="w-5 h-5" />
          Donate in memory
        </Link>
        <p className="text-sm text-stone-50/60 mt-6">
          Faith Marie Foundation is a pending 501(c)(3) nonprofit organization
        </p>
      </div>
    </section>
  );
}

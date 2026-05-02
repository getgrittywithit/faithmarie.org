'use client';

import { useEffect, useState } from 'react';
import { Heart, Loader2 } from 'lucide-react';

export default function PayItForwardCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch('/api/memorials/credits');
        const data = await response.json();
        setCount(data.availableCredits || 0);
      } catch (error) {
        console.error('Error fetching credits:', error);
        setCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCount();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 text-gray-400">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

  if (count === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-teal-50 to-amber-50 border border-teal-100 rounded-lg p-4 text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Heart className="w-5 h-5 text-teal-600" />
        <span className="text-2xl font-semibold text-gray-800">{count}</span>
      </div>
      <p className="text-sm text-gray-600">
        Free memorials available through Pay-it-Forward donations
      </p>
    </div>
  );
}

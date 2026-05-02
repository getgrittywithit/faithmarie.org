'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Loader2, AlertTriangle } from 'lucide-react';

interface ReportActionsProps {
  reportId: string;
  memorialId: string;
}

export default function ReportActions({ reportId, memorialId }: ReportActionsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resolution, setResolution] = useState('');
  const [takedownMemorial, setTakedownMemorial] = useState(false);
  const router = useRouter();

  const handleResolve = async (action: 'resolve' | 'dismiss') => {
    if (action === 'resolve' && !resolution.trim()) {
      alert('Please provide a resolution note');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/admin/reports/${reportId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          resolution,
          takedownMemorial: action === 'resolve' && takedownMemorial,
          memorialId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update report');
      }

      router.refresh();
    } catch (error) {
      console.error('Error resolving report:', error);
      alert('Failed to update report');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Resolution Notes
          </label>
          <textarea
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
            rows={2}
            placeholder="Describe the action taken or reason for dismissal..."
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm resize-none"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={takedownMemorial}
            onChange={(e) => setTakedownMemorial(e.target.checked)}
            className="rounded border-gray-300"
          />
          <AlertTriangle className="w-4 h-4 text-red-500" />
          Take down this memorial
        </label>

        <div className="flex gap-2">
          <button
            onClick={() => handleResolve('resolve')}
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                Mark Resolved
              </>
            )}
          </button>
          <button
            onClick={() => handleResolve('dismiss')}
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors text-sm"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <XCircle className="w-4 h-4" />
                Dismiss Report
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

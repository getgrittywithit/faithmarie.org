'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface ModerationActionsProps {
  memorialId: string;
  currentStatus: string;
}

export default function ModerationActions({
  memorialId,
  currentStatus,
}: ModerationActionsProps) {
  const [notes, setNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const router = useRouter();

  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/admin/memorials/${memorialId}/moderate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'approve',
          notes: notes || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to approve');
      }

      router.refresh();
    } catch (error) {
      console.error('Error approving memorial:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/admin/memorials/${memorialId}/moderate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reject',
          reason: rejectionReason,
          notes: notes || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to reject');
      }

      router.refresh();
    } catch (error) {
      console.error('Error rejecting memorial:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (currentStatus !== 'pending_moderation') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Status</h2>
        <div
          className={`flex items-center gap-2 ${
            currentStatus === 'published' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {currentStatus === 'published' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
          <span className="capitalize">{currentStatus.replace('_', ' ')}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-medium text-gray-800 mb-4">
        Moderation Actions
      </h2>

      <div className="space-y-4">
        {/* Internal Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Internal Notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Add internal notes..."
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm resize-none"
          />
        </div>

        {/* Approve Button */}
        <button
          onClick={handleApprove}
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              Approve & Publish
            </>
          )}
        </button>

        {/* Reject Section */}
        {!showRejectForm ? (
          <button
            onClick={() => setShowRejectForm(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-red-200 text-red-600 rounded-md hover:bg-red-50 transition-colors"
          >
            <XCircle className="w-5 h-5" />
            Reject
          </button>
        ) : (
          <div className="space-y-3 p-4 border border-red-200 rounded-md bg-red-50">
            <div>
              <label className="block text-sm font-medium text-red-700 mb-1">
                Rejection Reason (required)
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={3}
                placeholder="Explain why this memorial is being rejected..."
                className="w-full px-3 py-2 border border-red-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm resize-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleReject}
                disabled={isSubmitting || !rejectionReason.trim()}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Confirm Reject'
                )}
              </button>
              <button
                onClick={() => {
                  setShowRejectForm(false);
                  setRejectionReason('');
                }}
                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-md hover:bg-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

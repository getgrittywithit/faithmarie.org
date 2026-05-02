'use client';

import { useState } from 'react';
import { Check, X, Eye, EyeOff, Mail } from 'lucide-react';

interface Tribute {
  id: string;
  visitor_name: string;
  visitor_email: string;
  visitor_relationship: string | null;
  message: string;
  status: 'pending' | 'approved' | 'rejected' | 'hidden';
  submitted_at: string;
}

interface TributesManagerProps {
  memorialId: string;
  initialTributes: Tribute[];
}

export default function TributesManager({
  memorialId,
  initialTributes,
}: TributesManagerProps) {
  const [tributes, setTributes] = useState<Tribute[]>(initialTributes);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'hidden'>('all');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const filteredTributes = tributes.filter((t) => {
    if (filter === 'all') return true;
    if (filter === 'hidden') return t.status === 'hidden' || t.status === 'rejected';
    return t.status === filter;
  });

  const pendingCount = tributes.filter((t) => t.status === 'pending').length;

  const updateTributeStatus = async (tributeId: string, status: string) => {
    try {
      const response = await fetch(
        `/api/memorials/${memorialId}/tributes/moderate`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tributeId, status }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update tribute');
      }

      setTributes((prev) =>
        prev.map((t) => (t.id === tributeId ? { ...t, status: status as Tribute['status'] } : t))
      );
      setMessage({ type: 'success', text: 'Tribute updated' });
    } catch {
      setMessage({ type: 'error', text: 'Failed to update tribute' });
    }
  };

  const statusColors: Record<string, { bg: string; text: string }> = {
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    approved: { bg: 'bg-green-100', text: 'text-green-700' },
    rejected: { bg: 'bg-red-100', text: 'text-red-700' },
    hidden: { bg: 'bg-gray-100', text: 'text-gray-600' },
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-light text-gray-800">Tributes</h1>
        <p className="text-gray-600 mt-1">
          Manage messages left by visitors
        </p>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-md ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-md transition-colors ${
            filter === 'all'
              ? 'bg-teal-600 text-white'
              : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          All ({tributes.length})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-md transition-colors ${
            filter === 'pending'
              ? 'bg-yellow-500 text-white'
              : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          Pending ({pendingCount})
        </button>
        <button
          onClick={() => setFilter('approved')}
          className={`px-4 py-2 rounded-md transition-colors ${
            filter === 'approved'
              ? 'bg-green-600 text-white'
              : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          Approved
        </button>
        <button
          onClick={() => setFilter('hidden')}
          className={`px-4 py-2 rounded-md transition-colors ${
            filter === 'hidden'
              ? 'bg-gray-600 text-white'
              : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          Hidden
        </button>
      </div>

      {filteredTributes.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">
            {filter === 'pending'
              ? 'No pending tributes'
              : filter === 'approved'
              ? 'No approved tributes yet'
              : filter === 'hidden'
              ? 'No hidden tributes'
              : 'No tributes yet'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTributes.map((tribute) => {
            const colors = statusColors[tribute.status] || statusColors.pending;
            return (
              <div
                key={tribute.id}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium text-gray-800">
                        {tribute.visitor_name}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${colors.bg} ${colors.text}`}
                      >
                        {tribute.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      {tribute.visitor_relationship && (
                        <span>{tribute.visitor_relationship}</span>
                      )}
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {tribute.visitor_email}
                      </span>
                      <span>
                        {new Date(tribute.submitted_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {tribute.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateTributeStatus(tribute.id, 'approved')}
                          className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-sm"
                        >
                          <Check className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => updateTributeStatus(tribute.id, 'rejected')}
                          className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm"
                        >
                          <X className="w-4 h-4" />
                          Reject
                        </button>
                      </>
                    )}
                    {tribute.status === 'approved' && (
                      <button
                        onClick={() => updateTributeStatus(tribute.id, 'hidden')}
                        className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors text-sm"
                      >
                        <EyeOff className="w-4 h-4" />
                        Hide
                      </button>
                    )}
                    {(tribute.status === 'hidden' || tribute.status === 'rejected') && (
                      <button
                        onClick={() => updateTributeStatus(tribute.id, 'approved')}
                        className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        Show
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{tribute.message}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

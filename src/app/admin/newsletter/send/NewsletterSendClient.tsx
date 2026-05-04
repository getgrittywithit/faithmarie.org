'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AudienceSelector from '@/components/admin/content/AudienceSelector';
import {
  Send,
  Mail,
  AlertCircle,
  Check,
  FileText,
  Eye,
  TestTube,
  Loader2,
} from 'lucide-react';
import type { Post } from '@/lib/supabase/types';

interface Props {
  posts: Post[];
  drafts: Post[];
  topicCounts: Record<string, number>;
  totalSubscribers: number;
}

export default function NewsletterSendClient({
  posts,
  drafts,
  topicCounts,
  totalSubscribers,
}: Props) {
  const router = useRouter();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const selectedPost = posts.find((p) => p.id === selectedPostId);

  const handleSendTest = async () => {
    if (!selectedPostId || !testEmail) return;

    setIsSendingTest(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/admin/newsletter/send-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: selectedPostId,
          email: testEmail,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Failed to send test email');
      } else {
        setSuccess(`Test email sent to ${testEmail}`);
      }
    } catch {
      setError('Failed to send test email');
    } finally {
      setIsSendingTest(false);
    }
  };

  const handleSend = async () => {
    if (!selectedPostId) return;

    setIsSending(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: selectedPostId,
          targetTopics: selectAll ? [] : selectedTopics,
          targetAllSubscribers: selectAll,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Failed to send newsletter');
        setShowConfirm(false);
      } else {
        router.push(`/admin/newsletter/${result.sendId}`);
      }
    } catch {
      setError('Failed to send newsletter');
      setShowConfirm(false);
    } finally {
      setIsSending(false);
    }
  };

  const estimatedReach = selectAll
    ? totalSubscribers
    : selectedTopics.length === 0
    ? totalSubscribers
    : selectedTopics.reduce((sum, topic) => sum + (topicCounts[topic] || 0), 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Post Selection */}
      <div className="lg:col-span-2 space-y-6">
        {/* Published Posts */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-medium text-gray-800">Select Content to Send</h2>
            <p className="text-sm text-gray-500 mt-1">
              Choose from your published posts
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-2">No published posts available</p>
              <p className="text-sm text-gray-500 mb-4">
                Create and publish content with newsletter distribution enabled
              </p>
              <Link
                href="/admin/content/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
              >
                Create New Post
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {posts.map((post) => (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => setSelectedPostId(post.id)}
                  className={`w-full flex items-start gap-4 px-6 py-4 text-left transition-colors ${
                    selectedPostId === post.id
                      ? 'bg-teal-50'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div
                    className={`mt-1 h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedPostId === post.id
                        ? 'bg-teal-500 border-teal-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedPostId === post.id && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800">{post.title}</p>
                    {post.excerpt && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span>
                        Published{' '}
                        {post.published_at
                          ? new Date(post.published_at).toLocaleDateString()
                          : 'recently'}
                      </span>
                      {post.topics.length > 0 && (
                        <>
                          <span>•</span>
                          <span>{post.topics.join(', ')}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <Link
                    href={`/admin/content/${post.id}/preview`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Draft Posts Suggestion */}
        {drafts.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800">
                  You have {drafts.length} draft{drafts.length > 1 ? 's' : ''}{' '}
                  ready to publish
                </p>
                <p className="text-sm text-amber-700 mt-1">
                  Publish your drafts first to send them as newsletters.
                </p>
                <div className="flex gap-2 mt-3">
                  {drafts.slice(0, 3).map((draft) => (
                    <Link
                      key={draft.id}
                      href={`/admin/content/${draft.id}`}
                      className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded hover:bg-amber-200 transition-colors"
                    >
                      {draft.title || 'Untitled'}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Audience Selection */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <AudienceSelector
            selectedTopics={selectedTopics}
            onTopicsChange={setSelectedTopics}
            selectAll={selectAll}
            onSelectAllChange={setSelectAll}
            topicCounts={topicCounts}
            totalSubscribers={totalSubscribers}
          />
        </div>

        {/* Test Email */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Send Test Email
          </h3>
          <div className="flex gap-2">
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={handleSendTest}
              disabled={!selectedPostId || !testEmail || isSendingTest}
              className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm"
            >
              {isSendingTest ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <TestTube className="h-4 w-4" />
              )}
              Test
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            <Check className="h-4 w-4 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Send Button */}
        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          disabled={!selectedPostId || isSending}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 font-medium"
        >
          <Send className="h-5 w-5" />
          Send to {estimatedReach.toLocaleString()} Subscribers
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && selectedPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Confirm Send
                </h3>
                <p className="text-sm text-gray-500">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Post:</strong> {selectedPost.title}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Subject:</strong>{' '}
                {selectedPost.email_subject || selectedPost.title}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Recipients:</strong>{' '}
                {estimatedReach.toLocaleString()} subscribers
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                disabled={isSending}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSend}
                disabled={isSending}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
              >
                {isSending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Now
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

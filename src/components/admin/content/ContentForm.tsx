'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import ContentEditor from './ContentEditor';
import DistributionSelector from './DistributionSelector';
import TopicSelector from './TopicSelector';
import { Save, Eye, Send, Clock, AlertCircle } from 'lucide-react';
import type { Post, DistributionChannel, ContentStatus } from '@/lib/supabase/types';

interface ContentFormProps {
  initialData?: Partial<Post>;
  onSave: (data: PostFormData) => Promise<{ success: boolean; id?: string; error?: string }>;
  isNew?: boolean;
}

export interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  body_html: string;
  topics: string[];
  featured_image_url: string;
  distribution: DistributionChannel;
  status: ContentStatus;
  email_subject: string;
  email_preheader: string;
  reading_time_minutes: number;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).filter((w) => w.length > 0).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export default function ContentForm({
  initialData,
  onSave,
  isNew = false,
}: ContentFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const [formData, setFormData] = useState<PostFormData>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    body: initialData?.body || '',
    body_html: initialData?.body_html || '',
    topics: initialData?.topics || [],
    featured_image_url: initialData?.featured_image_url || '',
    distribution: initialData?.distribution || 'both',
    status: initialData?.status || 'draft',
    email_subject: initialData?.email_subject || '',
    email_preheader: initialData?.email_preheader || '',
    reading_time_minutes: initialData?.reading_time_minutes || 1,
  });

  // Auto-generate slug from title for new posts
  useEffect(() => {
    if (isNew && formData.title && !initialData?.slug) {
      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(prev.title),
      }));
    }
  }, [formData.title, isNew, initialData?.slug]);

  // Auto-populate email subject from title
  useEffect(() => {
    if (!formData.email_subject && formData.title) {
      setFormData((prev) => ({
        ...prev,
        email_subject: prev.title,
      }));
    }
  }, [formData.title, formData.email_subject]);

  // Mark as having changes
  useEffect(() => {
    setHasChanges(true);
  }, [formData]);

  // Auto-save draft every 30 seconds
  const autoSave = useCallback(async () => {
    if (!hasChanges || formData.status !== 'draft' || isSaving) return;

    setIsSaving(true);
    try {
      await onSave(formData);
      setLastSaved(new Date());
      setHasChanges(false);
    } catch {
      // Silent fail for auto-save
    } finally {
      setIsSaving(false);
    }
  }, [formData, hasChanges, isSaving, onSave]);

  useEffect(() => {
    const interval = setInterval(autoSave, 30000);
    return () => clearInterval(interval);
  }, [autoSave]);

  const handleContentChange = (text: string, html: string) => {
    setFormData((prev) => ({
      ...prev,
      body: text,
      body_html: html,
      reading_time_minutes: calculateReadingTime(text),
    }));
  };

  const handleSubmit = async (action: 'save' | 'publish' | 'schedule') => {
    setIsSaving(true);
    setError(null);

    const dataToSave = {
      ...formData,
      status:
        action === 'publish'
          ? ('published' as ContentStatus)
          : action === 'schedule'
          ? ('scheduled' as ContentStatus)
          : formData.status,
    };

    try {
      const result = await onSave(dataToSave);
      if (result.success) {
        setLastSaved(new Date());
        setHasChanges(false);
        if (action === 'publish') {
          router.push('/admin/content');
        } else if (isNew && result.id) {
          router.replace(`/admin/content/${result.id}`);
        }
      } else {
        setError(result.error || 'Failed to save');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  const showEmailFields =
    formData.distribution === 'newsletter' || formData.distribution === 'both';

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit('save');
      }}
      className="space-y-8"
    >
      {/* Status Bar */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3">
        <div className="flex items-center gap-4">
          <StatusBadge status={formData.status} />
          {lastSaved && (
            <span className="text-sm text-gray-500">
              Last saved: {lastSaved.toLocaleTimeString()}
            </span>
          )}
          {hasChanges && !isSaving && (
            <span className="text-sm text-amber-600">Unsaved changes</span>
          )}
          {isSaving && (
            <span className="text-sm text-gray-500">Saving...</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push(`/admin/content/${initialData?.id}/preview`)}
            disabled={isNew}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <Eye className="h-4 w-4" />
            Preview
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('save')}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('publish')}
            disabled={isSaving || !formData.title || !formData.body}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-teal-600 text-white hover:bg-teal-700 rounded-lg transition-colors disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            Publish
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-4 py-3 text-xl font-medium border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter a compelling title..."
            />
          </div>

          {/* Slug */}
          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              URL Slug
            </label>
            <div className="flex items-center">
              <span className="text-gray-500 text-sm mr-2">
                faithmarie.org/blog/
              </span>
              <input
                type="text"
                id="slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    slug: generateSlug(e.target.value),
                  }))
                }
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="url-friendly-slug"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label
              htmlFor="excerpt"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Excerpt
            </label>
            <textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
              }
              rows={2}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              placeholder="Brief summary for previews and SEO..."
            />
          </div>

          {/* Content Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <ContentEditor
              content={formData.body_html || formData.body}
              onChange={handleContentChange}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Distribution */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <DistributionSelector
              value={formData.distribution}
              onChange={(distribution) =>
                setFormData((prev) => ({ ...prev, distribution }))
              }
            />
          </div>

          {/* Topics */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <TopicSelector
              value={formData.topics}
              onChange={(topics) =>
                setFormData((prev) => ({ ...prev, topics }))
              }
            />
          </div>

          {/* Email Settings (conditional) */}
          {showEmailFields && (
            <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
              <h3 className="text-sm font-medium text-gray-700">
                Email Settings
              </h3>

              <div>
                <label
                  htmlFor="email_subject"
                  className="block text-sm text-gray-600 mb-1"
                >
                  Subject Line
                </label>
                <input
                  type="text"
                  id="email_subject"
                  value={formData.email_subject}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      email_subject: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  placeholder="Email subject line"
                />
              </div>

              <div>
                <label
                  htmlFor="email_preheader"
                  className="block text-sm text-gray-600 mb-1"
                >
                  Preheader Text
                </label>
                <input
                  type="text"
                  id="email_preheader"
                  value={formData.email_preheader}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      email_preheader: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  placeholder="Preview text in inbox"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Shows after subject in most email clients
                </p>
              </div>
            </div>
          )}

          {/* Featured Image */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <label
              htmlFor="featured_image"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Featured Image URL
            </label>
            <input
              type="url"
              id="featured_image"
              value={formData.featured_image_url}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  featured_image_url: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              placeholder="https://..."
            />
            {formData.featured_image_url && (
              <div className="mt-2">
                <img
                  src={formData.featured_image_url}
                  alt="Featured"
                  className="w-full h-32 object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Reading Time */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>
                Estimated reading time:{' '}
                <strong>{formData.reading_time_minutes} min</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

function StatusBadge({ status }: { status: ContentStatus }) {
  const styles: Record<ContentStatus, string> = {
    draft: 'bg-gray-100 text-gray-700',
    review: 'bg-yellow-100 text-yellow-700',
    scheduled: 'bg-blue-100 text-blue-700',
    published: 'bg-green-100 text-green-700',
    archived: 'bg-red-100 text-red-700',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

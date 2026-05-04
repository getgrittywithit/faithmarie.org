'use client';

import { useRouter } from 'next/navigation';
import ContentForm, { PostFormData } from '@/components/admin/content/ContentForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewContentPage() {
  const router = useRouter();

  const handleSave = async (data: PostFormData) => {
    try {
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, error: result.error || 'Failed to create post' };
      }

      return { success: true, id: result.id };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create post',
      };
    }
  };

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/content"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Content
        </Link>
      </div>

      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        Create New Post
      </h1>

      <ContentForm onSave={handleSave} isNew />
    </div>
  );
}

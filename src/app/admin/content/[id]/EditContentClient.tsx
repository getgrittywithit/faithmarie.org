'use client';

import ContentForm, { PostFormData } from '@/components/admin/content/ContentForm';
import type { Post } from '@/lib/supabase/types';

interface Props {
  post: Post;
}

export default function EditContentClient({ post }: Props) {
  const handleSave = async (data: PostFormData) => {
    try {
      const response = await fetch(`/api/admin/content/${post.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, error: result.error || 'Failed to update post' };
      }

      return { success: true, id: post.id };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update post',
      };
    }
  };

  return <ContentForm initialData={post} onSave={handleSave} />;
}

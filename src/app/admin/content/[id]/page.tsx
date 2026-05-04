import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import EditContentClient from './EditContentClient';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditContentPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !post) {
    notFound();
  }

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
        Edit Post
      </h1>

      <EditContentClient post={post} />
    </div>
  );
}

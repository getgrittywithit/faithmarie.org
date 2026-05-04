import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import NewsletterSendClient from './NewsletterSendClient';

export default async function NewsletterSendPage() {
  const supabase = await createClient();

  // Get posts that can be sent as newsletter
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .in('distribution', ['newsletter', 'both'])
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  // Get subscriber counts
  const { data: subscribers } = await supabase
    .from('subscribers')
    .select('id, topics')
    .is('unsubscribed_at', null);

  const activeSubscribers = subscribers || [];
  const totalSubscribers = activeSubscribers.length;

  // Count by topic
  const topicCounts: Record<string, number> = {};
  activeSubscribers.forEach((sub) => {
    (sub.topics || []).forEach((topic: string) => {
      topicCounts[topic] = (topicCounts[topic] || 0) + 1;
    });
  });

  // Get drafts that could be published
  const { data: drafts } = await supabase
    .from('posts')
    .select('*')
    .in('distribution', ['newsletter', 'both'])
    .eq('status', 'draft')
    .order('updated_at', { ascending: false })
    .limit(5);

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/newsletter"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Newsletter
        </Link>
      </div>

      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        Send Newsletter
      </h1>

      <NewsletterSendClient
        posts={posts || []}
        drafts={drafts || []}
        topicCounts={topicCounts}
        totalSubscribers={totalSubscribers}
      />
    </div>
  );
}

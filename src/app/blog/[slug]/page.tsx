import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';
import type { Post } from '@/lib/supabase/types';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: postData } = await supabase
    .from('posts')
    .select('title, excerpt, featured_image_url')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  const post = postData as Pick<Post, 'title' | 'excerpt' | 'featured_image_url'> | null;

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | Faith Marie Foundation`,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.featured_image_url ? [post.featured_image_url] : undefined,
    },
  };
}

export async function generateStaticParams() {
  // Skip static generation if env vars aren't available (build time)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return [];
  }

  // Use admin client since generateStaticParams runs at build time without cookies
  const supabase = createAdminClient();

  const { data: postsData } = await supabase
    .from('posts')
    .select('slug')
    .eq('status', 'published')
    .in('distribution', ['website', 'both']);

  const posts = (postsData || []) as Pick<Post, 'slug'>[];

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: postData, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .in('distribution', ['website', 'both'])
    .single();

  const post = postData as Post | null;

  if (error || !post) {
    notFound();
  }

  // Get related posts
  const { data: relatedPostsData } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, featured_image_url, reading_time_minutes')
    .eq('status', 'published')
    .in('distribution', ['website', 'both'])
    .neq('id', post.id)
    .overlaps('topics', post.topics)
    .limit(3);

  const relatedPosts = (relatedPostsData || []) as Pick<Post, 'id' | 'title' | 'slug' | 'excerpt' | 'featured_image_url' | 'reading_time_minutes'>[];

  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Article Header */}
      <article>
        {/* Hero Section */}
        <header className="max-w-3xl mx-auto px-6 pt-12 pb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Topics */}
          {post.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.topics.map((topic) => (
                <span
                  key={topic}
                  className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium capitalize"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
          )}

          <div className="flex items-center gap-4 text-gray-500 text-sm">
            {publishedDate && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {publishedDate}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.reading_time_minutes} min read
            </span>
          </div>
        </header>

        {/* Featured Image */}
        {post.featured_image_url && (
          <div className="max-w-4xl mx-auto px-6 mb-12">
            <img
              src={post.featured_image_url}
              alt=""
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
        )}

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6">
          <div
            className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.body_html || post.body }}
          />
        </div>

        {/* Share & Subscribe */}
        <div className="max-w-3xl mx-auto px-6 py-12 mt-12 border-t border-gray-200">
          <div className="bg-teal-50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Found this helpful?
            </h3>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter for more research-backed insights.
            </p>
            <Link
              href="/#newsletter"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              Subscribe to Newsletter
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
                >
                  {related.featured_image_url && (
                    <img
                      src={related.featured_image_url}
                      alt=""
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {related.title}
                    </h3>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {related.reading_time_minutes} min read
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Clock, ChevronRight } from 'lucide-react';
import type { Post } from '@/lib/supabase/types';

export const metadata = {
  title: 'Blog | Faith Marie Foundation',
  description:
    'Explore research-backed insights on mental health, grief, trauma, depression, and anxiety from Faith Marie Foundation.',
};

export default async function BlogPage() {
  const supabase = await createClient();

  const { data: postsData } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .in('distribution', ['website', 'both'])
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false });

  const posts = (postsData || []) as Post[];
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Research-backed insights and practical guidance for families
            navigating mental health challenges.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-12">
            <FeaturedPostCard post={featuredPost} />
          </div>
        )}

        {/* Post Grid */}
        {recentPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : !featuredPost ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-medium text-gray-800 mb-2">
              Coming Soon
            </h2>
            <p className="text-gray-600">
              We&apos;re working on new content. Check back soon!
            </p>
            <Link
              href="/"
              className="inline-block mt-4 text-teal-600 hover:text-teal-700"
            >
              Return home
            </Link>
          </div>
        ) : null}

        {/* Newsletter CTA */}
        <div className="mt-16 bg-teal-50 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Subscribe to our newsletter for research-backed insights delivered
            to your inbox.
          </p>
          <Link
            href="/#newsletter"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
          >
            Subscribe Now
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function FeaturedPostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
    >
      <div className="md:flex">
        {post.featured_image_url && (
          <div className="md:w-1/2">
            <img
              src={post.featured_image_url}
              alt=""
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
        )}
        <div
          className={`p-8 ${post.featured_image_url ? 'md:w-1/2' : 'w-full'}`}
        >
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
            {post.topics.map((topic) => (
              <span
                key={topic}
                className="px-2 py-1 bg-teal-50 text-teal-700 rounded capitalize"
              >
                {topic}
              </span>
            ))}
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.reading_time_minutes} min read
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
          )}
          <div className="flex items-center gap-2 text-teal-600 font-medium">
            Read more
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function BlogCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
    >
      {post.featured_image_url && (
        <img
          src={post.featured_image_url}
          alt=""
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          {post.topics.length > 0 && (
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded capitalize">
              {post.topics[0]}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.reading_time_minutes} min
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
        )}
        <p className="mt-4 text-sm text-teal-600 font-medium">Read more</p>
      </div>
    </Link>
  );
}

import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Globe, Mail } from 'lucide-react';
import type { Post } from '@/lib/supabase/types';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PreviewContentPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    notFound();
  }

  const post = data as Post;

  const showWebPreview = post.distribution === 'website' || post.distribution === 'both';
  const showEmailPreview = post.distribution === 'newsletter' || post.distribution === 'both';

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <Link
          href={`/admin/content/${id}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Editor
        </Link>
      </div>

      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        Preview: {post.title || 'Untitled'}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Web Preview */}
        {showWebPreview && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-5 w-5 text-teal-600" />
              <h2 className="text-lg font-medium text-gray-800">Website Preview</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 bg-red-400 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                  <div className="w-3 h-3 bg-green-400 rounded-full" />
                </div>
                <span className="text-sm text-gray-500 ml-2">
                  faithmarie.org/blog/{post.slug}
                </span>
              </div>
              <div className="p-8">
                {post.featured_image_url && (
                  <img
                    src={post.featured_image_url}
                    alt=""
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                )}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <span>{post.reading_time_minutes} min read</span>
                  {post.topics.length > 0 && (
                    <>
                      <span>•</span>
                      <span>{post.topics.join(', ')}</span>
                    </>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {post.title || 'Untitled'}
                </h1>
                {post.excerpt && (
                  <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
                )}
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.body_html || post.body }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Email Preview */}
        {showEmailPreview && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Mail className="h-5 w-5 text-teal-600" />
              <h2 className="text-lg font-medium text-gray-800">Email Preview</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                <div className="text-sm">
                  <div className="flex">
                    <span className="text-gray-500 w-16">From:</span>
                    <span className="text-gray-900">Faith Marie Foundation</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-16">Subject:</span>
                    <span className="text-gray-900 font-medium">
                      {post.email_subject || post.title}
                    </span>
                  </div>
                  {post.email_preheader && (
                    <div className="flex">
                      <span className="text-gray-500 w-16">Preview:</span>
                      <span className="text-gray-500 italic">
                        {post.email_preheader}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6" style={{ maxWidth: 600, margin: '0 auto' }}>
                {/* Email header */}
                <div className="text-center border-b border-gray-200 pb-6 mb-6">
                  <h1 className="text-2xl font-bold text-teal-600">
                    Faith Marie Foundation
                  </h1>
                </div>

                {/* Email content */}
                {post.featured_image_url && (
                  <img
                    src={post.featured_image_url}
                    alt=""
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                )}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {post.title || 'Untitled'}
                </h2>
                {post.excerpt && (
                  <p className="text-lg text-gray-600 mb-4">{post.excerpt}</p>
                )}
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.body_html || post.body }}
                />

                {/* Email footer */}
                <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
                  <p>
                    You&apos;re receiving this because you subscribed to Faith Marie
                    Foundation.
                  </p>
                  <p className="mt-2">
                    <a href="#" className="text-teal-600 underline">
                      Unsubscribe
                    </a>{' '}
                    •{' '}
                    <a href="#" className="text-teal-600 underline">
                      Manage preferences
                    </a>
                  </p>
                  <p className="mt-4 text-xs text-gray-400">
                    Faith Marie Foundation
                    <br />
                    Making mental health research accessible to every family.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

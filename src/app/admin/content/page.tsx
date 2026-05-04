import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Search, Edit, Trash2, Eye, Mail, Globe } from 'lucide-react';
import type { Post, ContentStatus, DistributionChannel } from '@/lib/supabase/types';

export default async function ContentListPage() {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error loading posts:', error);
  }

  const statusCounts = (posts || []).reduce(
    (acc, post) => {
      acc[post.status] = (acc[post.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Content</h1>
          <p className="text-gray-600 mt-1">
            Manage blog posts and newsletter content
          </p>
        </div>
        <Link
          href="/admin/content/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          New Post
        </Link>
      </div>

      {/* Status Filters */}
      <div className="flex items-center gap-4 mb-6">
        <StatusFilter label="All" count={posts?.length || 0} active />
        <StatusFilter label="Draft" count={statusCounts.draft || 0} />
        <StatusFilter label="Published" count={statusCounts.published || 0} />
        <StatusFilter label="Scheduled" count={statusCounts.scheduled || 0} />
        <StatusFilter label="Archived" count={statusCounts.archived || 0} />
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="search"
          placeholder="Search content..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>

      {/* Content List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {!posts || posts.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Edit className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              No content yet
            </h3>
            <p className="text-gray-600 mb-4">
              Get started by creating your first post.
            </p>
            <Link
              href="/admin/content/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              Create Post
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Distribution
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Updated
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {posts.map((post) => (
                <ContentRow key={post.id} post={post} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function StatusFilter({
  label,
  count,
  active = false,
}: {
  label: string;
  count: number;
  active?: boolean;
}) {
  return (
    <button
      className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
        active
          ? 'bg-teal-100 text-teal-700'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {label}{' '}
      <span
        className={`${
          active ? 'text-teal-600' : 'text-gray-400'
        }`}
      >
        ({count})
      </span>
    </button>
  );
}

function ContentRow({ post }: { post: Post }) {
  const statusStyles: Record<ContentStatus, string> = {
    draft: 'bg-gray-100 text-gray-700',
    review: 'bg-yellow-100 text-yellow-700',
    scheduled: 'bg-blue-100 text-blue-700',
    published: 'bg-green-100 text-green-700',
    archived: 'bg-red-100 text-red-700',
  };

  const distributionIcons: Record<DistributionChannel, typeof Globe> = {
    website: Globe,
    newsletter: Mail,
    both: Globe,
  };

  const DistIcon = distributionIcons[post.distribution];

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <Link
          href={`/admin/content/${post.id}`}
          className="font-medium text-gray-900 hover:text-teal-600"
        >
          {post.title || 'Untitled'}
        </Link>
        {post.topics.length > 0 && (
          <div className="flex gap-1 mt-1">
            {post.topics.map((topic) => (
              <span
                key={topic}
                className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
              >
                {topic}
              </span>
            ))}
          </div>
        )}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5 text-gray-600">
          <DistIcon className="h-4 w-4" />
          <span className="text-sm capitalize">{post.distribution}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[post.status]}`}
        >
          {post.status}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {new Date(post.updated_at).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/admin/content/${post.id}/preview`}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
            title="Preview"
          >
            <Eye className="h-4 w-4" />
          </Link>
          <Link
            href={`/admin/content/${post.id}`}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
            title="Edit"
          >
            <Edit className="h-4 w-4" />
          </Link>
          <button
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, FileText, Eye, Edit } from 'lucide-react';
import type { Database } from '@/lib/supabase/types';

type ResearchDigest = Database['public']['Tables']['research_digests']['Row'] & {
  admin_users: { name: string } | null;
};

export default async function ResearchDigestsPage() {
  const supabase = await createClient();

  const { data: digestsData } = await supabase
    .from('research_digests')
    .select('*, admin_users(name)')
    .order('created_at', { ascending: false });

  const digests = digestsData as ResearchDigest[] | null;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Research Digests</h1>
          <p className="text-gray-600 mt-1">Manage research summaries and publications</p>
        </div>
        <Link
          href="/admin/research/new"
          className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          New Digest
        </Link>
      </div>

      {digests && digests.length > 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Title</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Topic</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Author</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Date</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {digests.map((digest) => (
                <tr key={digest.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <span className="font-medium text-gray-800">{digest.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
                      {digest.topic}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {digest.published ? (
                      <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                        Published
                      </span>
                    ) : (
                      <span className="inline-block bg-amber-100 text-amber-700 px-2 py-1 rounded text-sm">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {digest.admin_users?.name ?? 'Unknown'}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {new Date(digest.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {digest.published && (
                        <Link
                          href={`/research/digests/${digest.slug}`}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                          title="View published"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                      )}
                      <Link
                        href={`/admin/research/${digest.id}`}
                        className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">No research digests yet</h3>
          <p className="text-gray-600 mb-6">Create your first research summary to get started.</p>
          <Link
            href="/admin/research/new"
            className="inline-flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Create First Digest
          </Link>
        </div>
      )}
    </div>
  );
}

import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import { Clock, CheckCircle, XCircle, Eye, AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'Memorial Moderation | Admin Dashboard',
};

export default async function MemorialModerationPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createAdminClient() as any;

  // Get pending memorials
  const { data: pendingMemorials } = await supabase
    .from('memorials')
    .select('*')
    .eq('status', 'pending_moderation')
    .order('created_at', { ascending: true });

  // Get recently moderated
  const { data: recentlyModerated } = await supabase
    .from('memorials')
    .select('*')
    .in('status', ['published', 'rejected'])
    .order('updated_at', { ascending: false })
    .limit(10);

  // Get stats
  const { count: pendingCount } = await supabase
    .from('memorials')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending_moderation');

  const { count: publishedCount } = await supabase
    .from('memorials')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published');

  const { count: rejectedCount } = await supabase
    .from('memorials')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'rejected');

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Memorial Moderation
        </h1>
        <p className="text-gray-600 mt-1">
          Review and moderate submitted memorials
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <span className="text-3xl font-semibold text-gray-800">
              {pendingCount || 0}
            </span>
          </div>
          <p className="text-gray-600">Pending Review</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-3xl font-semibold text-gray-800">
              {publishedCount || 0}
            </span>
          </div>
          <p className="text-gray-600">Published</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-3xl font-semibold text-gray-800">
              {rejectedCount || 0}
            </span>
          </div>
          <p className="text-gray-600">Rejected</p>
        </div>
      </div>

      {/* Pending Queue */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-yellow-500" />
          Pending Review ({pendingMemorials?.length || 0})
        </h2>

        {!pendingMemorials || pendingMemorials.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <p className="text-gray-600">All caught up! No memorials pending review.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingMemorials.map((memorial: {
              id: string;
              deceased_full_name: string;
              deceased_dod: string;
              created_at: string;
              funded_by: string;
            }) => (
              <div
                key={memorial.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      {memorial.deceased_full_name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span>Passed {formatDate(memorial.deceased_dod)}</span>
                      <span>Submitted {formatDate(memorial.created_at)}</span>
                      {memorial.funded_by === 'hardship' && (
                        <span className="flex items-center gap-1 text-orange-600">
                          <AlertTriangle className="w-3 h-3" />
                          Hardship waiver
                        </span>
                      )}
                    </div>
                  </div>
                  <Link
                    href={`/admin/memorials/${memorial.id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recently Moderated */}
      <div>
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          Recently Moderated
        </h2>

        {!recentlyModerated || recentlyModerated.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <p className="text-gray-500">No recently moderated memorials</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Memorial
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Moderated
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentlyModerated.map((memorial: {
                  id: string;
                  slug: string;
                  deceased_full_name: string;
                  status: string;
                  updated_at: string;
                }) => (
                  <tr key={memorial.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-800">
                        {memorial.deceased_full_name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                          memorial.status === 'published'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {memorial.status === 'published' ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        {memorial.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                      {formatDate(memorial.updated_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Link
                        href={`/admin/memorials/${memorial.id}`}
                        className="text-teal-600 hover:text-teal-700 text-sm"
                      >
                        View Details
                      </Link>
                      {memorial.status === 'published' && (
                        <>
                          <span className="mx-2 text-gray-300">|</span>
                          <Link
                            href={`/in-memory/${memorial.slug}`}
                            target="_blank"
                            className="text-gray-500 hover:text-gray-700 text-sm"
                          >
                            View Public
                          </Link>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Plus, Eye, Edit, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'My Memorials | Faith Marie Foundation',
  description: 'Manage your memorial pages',
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/memorials/create');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: memorials, error } = await (supabase as any)
    .from('memorials')
    .select('*')
    .eq('creator_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching memorials:', error);
  }

  const statusConfig: Record<
    string,
    { icon: React.ElementType; color: string; bg: string; label: string }
  > = {
    draft: {
      icon: Edit,
      color: 'text-gray-600',
      bg: 'bg-gray-100',
      label: 'Draft',
    },
    pending_moderation: {
      icon: Clock,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
      label: 'Pending Review',
    },
    published: {
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-100',
      label: 'Published',
    },
    rejected: {
      icon: AlertCircle,
      color: 'text-red-600',
      bg: 'bg-red-100',
      label: 'Rejected',
    },
    taken_down: {
      icon: AlertCircle,
      color: 'text-red-600',
      bg: 'bg-red-100',
      label: 'Taken Down',
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-light text-gray-800">My Memorials</h1>
            <p className="text-gray-600 mt-1">
              Manage and edit your memorial pages
            </p>
          </div>
          <Link
            href="/memorials/create"
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Memorial
          </Link>
        </div>

        {!memorials || memorials.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No memorials yet
            </h2>
            <p className="text-gray-600 mb-6">
              Create your first memorial to honor your loved one&apos;s memory.
            </p>
            <Link
              href="/memorials/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Your First Memorial
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {memorials.map((memorial: {
              id: string;
              slug: string;
              deceased_full_name: string;
              deceased_dod: string;
              status: string;
              created_at: string;
            }) => {
              const config = statusConfig[memorial.status] || statusConfig.draft;
              const StatusIcon = config.icon;
              const fullName = memorial.deceased_full_name;
              const deathDate = new Date(
                memorial.deceased_dod
              ).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <div
                  key={memorial.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-semibold text-gray-800">
                          {fullName}
                        </h2>
                        <span
                          className={`flex items-center gap-1 px-2 py-1 text-xs rounded-full ${config.bg} ${config.color}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {config.label}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Passed {deathDate}
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Created{' '}
                        {new Date(memorial.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {memorial.status === 'published' && (
                        <Link
                          href={`/in-memory/${memorial.slug}`}
                          target="_blank"
                          className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Link>
                      )}
                      <Link
                        href={`/memorials/dashboard/${memorial.id}`}
                        className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

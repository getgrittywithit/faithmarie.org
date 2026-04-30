import { createClient } from '@/lib/supabase/server';
import { FileText, DollarSign, Users, MessageSquare, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch stats
  const [
    { count: digestsCount },
    { count: publishedDigestsCount },
    { data: recentDonationsData },
    { count: subscribersCount },
    { count: newSubmissionsCount },
  ] = await Promise.all([
    supabase.from('research_digests').select('*', { count: 'exact', head: true }),
    supabase.from('research_digests').select('*', { count: 'exact', head: true }).eq('published', true),
    supabase.from('donations').select('amount_cents').order('created_at', { ascending: false }).limit(30),
    supabase.from('subscribers').select('*', { count: 'exact', head: true }).is('unsubscribed_at', null),
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).eq('status', 'new'),
  ]);

  const recentDonations = recentDonationsData as { amount_cents: number }[] | null;
  const totalDonations = recentDonations?.reduce((sum, d) => sum + d.amount_cents, 0) ?? 0;

  const stats = [
    {
      label: 'Research Digests',
      value: digestsCount ?? 0,
      subtext: `${publishedDigestsCount ?? 0} published`,
      icon: FileText,
      color: 'bg-blue-50 text-blue-600',
      href: '/admin/research',
    },
    {
      label: 'Recent Donations',
      value: `$${(totalDonations / 100).toFixed(0)}`,
      subtext: 'Last 30 days',
      icon: DollarSign,
      color: 'bg-green-50 text-green-600',
      href: '/admin/donations',
    },
    {
      label: 'Subscribers',
      value: subscribersCount ?? 0,
      subtext: 'Active subscribers',
      icon: Users,
      color: 'bg-purple-50 text-purple-600',
      href: '/admin/subscribers',
    },
    {
      label: 'New Submissions',
      value: newSubmissionsCount ?? 0,
      subtext: 'Awaiting review',
      icon: MessageSquare,
      color: 'bg-amber-50 text-amber-600',
      href: '/admin/submissions',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-3xl font-semibold text-gray-800 mt-1">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.subtext}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/admin/research/new"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="p-2 bg-teal-50 rounded-lg">
              <FileText className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">New Research Digest</p>
              <p className="text-sm text-gray-500">Create a new research summary</p>
            </div>
          </Link>

          <Link
            href="/admin/submissions"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="p-2 bg-amber-50 rounded-lg">
              <MessageSquare className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Review Submissions</p>
              <p className="text-sm text-gray-500">
                {newSubmissionsCount ? `${newSubmissionsCount} pending` : 'All caught up'}
              </p>
            </div>
          </Link>

          <Link
            href="/admin/subscribers"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="p-2 bg-purple-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">View Subscribers</p>
              <p className="text-sm text-gray-500">Manage email list</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

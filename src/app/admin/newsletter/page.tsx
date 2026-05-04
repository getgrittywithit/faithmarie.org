import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import {
  Send,
  Users,
  Mail,
  BarChart3,
  Eye,
  MousePointer,
  AlertCircle,
  Clock,
} from 'lucide-react';
import type { Subscriber, NewsletterSend } from '@/lib/supabase/types';

interface SendWithPost extends NewsletterSend {
  post: { title: string; slug: string } | null;
}

export default async function NewsletterDashboardPage() {
  const supabase = await createClient();

  // Get subscriber stats
  const { data: subscribersData } = await supabase
    .from('subscribers')
    .select('id, topics, unsubscribed_at');

  const subscribers = (subscribersData || []) as Pick<Subscriber, 'id' | 'topics' | 'unsubscribed_at'>[];
  const activeSubscribers = subscribers.filter((s) => !s.unsubscribed_at);
  const totalSubscribers = activeSubscribers.length;

  // Count by topic
  const topicCounts: Record<string, number> = {};
  activeSubscribers.forEach((sub) => {
    (sub.topics || []).forEach((topic: string) => {
      topicCounts[topic] = (topicCounts[topic] || 0) + 1;
    });
  });

  // Get recent sends
  const { data: recentSendsData } = await supabase
    .from('newsletter_sends')
    .select(`
      *,
      post:posts(title, slug)
    `)
    .order('created_at', { ascending: false })
    .limit(5);

  const recentSends = (recentSendsData || []) as unknown as SendWithPost[];

  // Calculate aggregate stats from recent sends
  const { data: allSendsData } = await supabase
    .from('newsletter_sends')
    .select('sent_count, delivered_count, opened_count, clicked_count, bounced_count')
    .eq('status', 'sent');

  const allSends = (allSendsData || []) as Pick<NewsletterSend, 'sent_count' | 'delivered_count' | 'opened_count' | 'clicked_count' | 'bounced_count'>[];

  const aggregateStats = allSends.reduce(
    (acc, send) => ({
      totalSent: acc.totalSent + (send.sent_count || 0),
      totalDelivered: acc.totalDelivered + (send.delivered_count || 0),
      totalOpened: acc.totalOpened + (send.opened_count || 0),
      totalClicked: acc.totalClicked + (send.clicked_count || 0),
      totalBounced: acc.totalBounced + (send.bounced_count || 0),
    }),
    { totalSent: 0, totalDelivered: 0, totalOpened: 0, totalClicked: 0, totalBounced: 0 }
  );

  const openRate = aggregateStats.totalDelivered > 0
    ? ((aggregateStats.totalOpened / aggregateStats.totalDelivered) * 100).toFixed(1)
    : '0';
  const clickRate = aggregateStats.totalOpened > 0
    ? ((aggregateStats.totalClicked / aggregateStats.totalOpened) * 100).toFixed(1)
    : '0';

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Newsletter</h1>
          <p className="text-gray-600 mt-1">
            Send newsletters and track engagement
          </p>
        </div>
        <Link
          href="/admin/newsletter/send"
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          <Send className="h-5 w-5" />
          Send Newsletter
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Users}
          label="Active Subscribers"
          value={totalSubscribers}
          color="teal"
        />
        <StatCard
          icon={Mail}
          label="Total Emails Sent"
          value={aggregateStats.totalSent}
          color="blue"
        />
        <StatCard
          icon={Eye}
          label="Open Rate"
          value={`${openRate}%`}
          color="green"
        />
        <StatCard
          icon={MousePointer}
          label="Click Rate"
          value={`${clickRate}%`}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Sends */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-medium text-gray-800">Recent Sends</h2>
            <Link
              href="/admin/newsletter/history"
              className="text-sm text-teal-600 hover:text-teal-700"
            >
              View all
            </Link>
          </div>

          {!recentSends || recentSends.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-gray-600">No newsletters sent yet</p>
              <Link
                href="/admin/newsletter/send"
                className="inline-block mt-3 text-teal-600 hover:text-teal-700 text-sm"
              >
                Send your first newsletter
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {recentSends.map((send) => (
                <Link
                  key={send.id}
                  href={`/admin/newsletter/${send.id}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {send.post?.title || 'Untitled'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(send.created_at).toLocaleDateString()} •{' '}
                      {send.sent_count} sent
                    </p>
                  </div>
                  <SendStatusBadge status={send.status} />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Subscriber Topics */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-medium text-gray-800">Subscribers by Topic</h2>
          </div>
          <div className="p-6 space-y-4">
            {Object.entries(topicCounts).length === 0 ? (
              <p className="text-gray-500 text-sm">No topic data available</p>
            ) : (
              Object.entries(topicCounts)
                .sort((a, b) => b[1] - a[1])
                .map(([topic, count]) => (
                  <div key={topic}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {topic}
                      </span>
                      <span className="text-sm text-gray-500">{count}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-500 rounded-full"
                        style={{
                          width: `${(count / totalSubscribers) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof Users;
  label: string;
  value: string | number;
  color: 'teal' | 'blue' | 'green' | 'purple';
}) {
  const colorClasses = {
    teal: 'bg-teal-50 text-teal-600',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-2xl font-semibold text-gray-800">{value}</p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  );
}

function SendStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    sending: 'bg-blue-100 text-blue-700',
    sent: 'bg-green-100 text-green-700',
    failed: 'bg-red-100 text-red-700',
    cancelled: 'bg-gray-100 text-gray-700',
  };

  const icons: Record<string, typeof Send> = {
    pending: Clock,
    sending: Send,
    sent: Mail,
    failed: AlertCircle,
    cancelled: AlertCircle,
  };

  const Icon = icons[status] || Mail;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] || styles.sent}`}
    >
      <Icon className="h-3 w-3" />
      {status}
    </span>
  );
}

import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Mail,
  Users,
  Eye,
  MousePointer,
  AlertCircle,
  Check,
  Clock,
  Loader2,
} from 'lucide-react';

interface Props {
  params: Promise<{ sendId: string }>;
}

export default async function NewsletterSendDetailPage({ params }: Props) {
  const { sendId } = await params;
  const supabase = await createClient();

  const { data: send, error } = await supabase
    .from('newsletter_sends')
    .select(`
      *,
      post:posts(title, slug, excerpt),
      sent_by_user:admin_users!newsletter_sends_sent_by_fkey(name)
    `)
    .eq('id', sendId)
    .single();

  if (error || !send) {
    notFound();
  }

  // Get recipient details
  const { data: recipients } = await supabase
    .from('newsletter_recipients')
    .select(`
      *,
      subscriber:subscribers(email, name)
    `)
    .eq('send_id', sendId)
    .order('sent_at', { ascending: false })
    .limit(100);

  const openRate =
    send.delivered_count > 0
      ? ((send.opened_count / send.delivered_count) * 100).toFixed(1)
      : '0';
  const clickRate =
    send.opened_count > 0
      ? ((send.clicked_count / send.opened_count) * 100).toFixed(1)
      : '0';
  const bounceRate =
    send.sent_count > 0
      ? ((send.bounced_count / send.sent_count) * 100).toFixed(1)
      : '0';

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/newsletter/history"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to History
        </Link>
      </div>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            {send.post?.title || 'Newsletter Send'}
          </h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span>
              Sent {new Date(send.created_at).toLocaleDateString()} at{' '}
              {new Date(send.created_at).toLocaleTimeString()}
            </span>
            {send.sent_by_user && <span>by {send.sent_by_user.name}</span>}
          </div>
        </div>
        <SendStatusBadge status={send.status} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={Users}
          label="Recipients"
          value={send.total_recipients}
          color="gray"
        />
        <StatCard
          icon={Mail}
          label="Delivered"
          value={send.delivered_count}
          subvalue={`${send.sent_count} sent`}
          color="blue"
        />
        <StatCard
          icon={Eye}
          label="Opens"
          value={send.opened_count}
          subvalue={`${openRate}% rate`}
          color="green"
        />
        <StatCard
          icon={MousePointer}
          label="Clicks"
          value={send.clicked_count}
          subvalue={`${clickRate}% rate`}
          color="purple"
        />
      </div>

      {/* Progress Bar (for sending status) */}
      {send.status === 'sending' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
            <span className="text-blue-800 font-medium">
              Sending in progress...
            </span>
          </div>
          <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{
                width: `${
                  send.total_recipients > 0
                    ? (send.sent_count / send.total_recipients) * 100
                    : 0
                }%`,
              }}
            />
          </div>
          <p className="text-sm text-blue-600 mt-2">
            {send.sent_count} of {send.total_recipients} emails sent
          </p>
        </div>
      )}

      {/* Bounce Warning */}
      {send.bounced_count > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-800 font-medium">
                {send.bounced_count} email{send.bounced_count > 1 ? 's' : ''}{' '}
                bounced ({bounceRate}%)
              </p>
              <p className="text-sm text-amber-700 mt-1">
                These subscribers may have invalid email addresses and should be
                reviewed.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recipient List */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-medium text-gray-800">Recipients</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Sent
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {(recipients || []).map((recipient) => (
                  <tr key={recipient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="text-gray-800">
                        {recipient.subscriber?.email || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <RecipientStatus recipient={recipient} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {recipient.sent_at
                        ? new Date(recipient.sent_at).toLocaleTimeString()
                        : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Send Details */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="font-medium text-gray-800 mb-4">Send Details</h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm text-gray-500">Target Audience</dt>
              <dd className="mt-1 text-gray-800">
                {send.target_all_subscribers
                  ? 'All subscribers'
                  : send.target_topics?.length > 0
                  ? send.target_topics.join(', ')
                  : 'All subscribers'}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Started</dt>
              <dd className="mt-1 text-gray-800">
                {send.started_at
                  ? new Date(send.started_at).toLocaleString()
                  : '-'}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Completed</dt>
              <dd className="mt-1 text-gray-800">
                {send.completed_at
                  ? new Date(send.completed_at).toLocaleString()
                  : '-'}
              </dd>
            </div>
            {send.post && (
              <div className="pt-4 border-t border-gray-200">
                <Link
                  href={`/admin/content/${send.post_id}`}
                  className="text-teal-600 hover:text-teal-700 text-sm"
                >
                  View original post
                </Link>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  subvalue,
  color,
}: {
  icon: typeof Users;
  label: string;
  value: number;
  subvalue?: string;
  color: 'gray' | 'blue' | 'green' | 'purple';
}) {
  const colorClasses = {
    gray: 'bg-gray-50 text-gray-600',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xl font-semibold text-gray-800">{value}</p>
          <p className="text-xs text-gray-500">{label}</p>
          {subvalue && <p className="text-xs text-gray-400">{subvalue}</p>}
        </div>
      </div>
    </div>
  );
}

function SendStatusBadge({ status }: { status: string }) {
  const config: Record<string, { icon: typeof Mail; classes: string }> = {
    pending: { icon: Clock, classes: 'bg-yellow-100 text-yellow-700' },
    sending: { icon: Loader2, classes: 'bg-blue-100 text-blue-700' },
    sent: { icon: Check, classes: 'bg-green-100 text-green-700' },
    failed: { icon: AlertCircle, classes: 'bg-red-100 text-red-700' },
    cancelled: { icon: AlertCircle, classes: 'bg-gray-100 text-gray-700' },
  };

  const { icon: Icon, classes } = config[status] || config.sent;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${classes}`}
    >
      <Icon
        className={`h-4 w-4 ${status === 'sending' ? 'animate-spin' : ''}`}
      />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function RecipientStatus({ recipient }: { recipient: { bounced_at?: string | null; clicked_at?: string | null; opened_at?: string | null; delivered_at?: string | null; sent_at?: string | null } }) {
  if (recipient.bounced_at) {
    return (
      <span className="inline-flex items-center gap-1 text-red-600 text-sm">
        <AlertCircle className="h-3.5 w-3.5" />
        Bounced
      </span>
    );
  }
  if (recipient.clicked_at) {
    return (
      <span className="inline-flex items-center gap-1 text-purple-600 text-sm">
        <MousePointer className="h-3.5 w-3.5" />
        Clicked
      </span>
    );
  }
  if (recipient.opened_at) {
    return (
      <span className="inline-flex items-center gap-1 text-green-600 text-sm">
        <Eye className="h-3.5 w-3.5" />
        Opened
      </span>
    );
  }
  if (recipient.delivered_at) {
    return (
      <span className="inline-flex items-center gap-1 text-blue-600 text-sm">
        <Check className="h-3.5 w-3.5" />
        Delivered
      </span>
    );
  }
  if (recipient.sent_at) {
    return (
      <span className="inline-flex items-center gap-1 text-gray-500 text-sm">
        <Mail className="h-3.5 w-3.5" />
        Sent
      </span>
    );
  }
  return <span className="text-gray-400 text-sm">Pending</span>;
}

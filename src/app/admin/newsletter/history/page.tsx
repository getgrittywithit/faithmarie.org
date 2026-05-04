import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import {
  ArrowLeft,
  Mail,
  Eye,
  MousePointer,
  Clock,
  Check,
  AlertCircle,
  Loader2,
  ChevronRight,
} from 'lucide-react';

export default async function NewsletterHistoryPage() {
  const supabase = await createClient();

  const { data: sends } = await supabase
    .from('newsletter_sends')
    .select(`
      *,
      post:posts(title, slug)
    `)
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/newsletter"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Newsletter
        </Link>
      </div>

      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        Send History
      </h1>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {!sends || sends.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              No newsletters sent yet
            </h3>
            <p className="text-gray-600 mb-4">
              Your newsletter send history will appear here.
            </p>
            <Link
              href="/admin/newsletter/send"
              className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Send Newsletter
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipients
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">

                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sends.map((send) => {
                const openRate =
                  send.delivered_count > 0
                    ? ((send.opened_count / send.delivered_count) * 100).toFixed(
                        1
                      )
                    : '0';
                const clickRate =
                  send.opened_count > 0
                    ? ((send.clicked_count / send.opened_count) * 100).toFixed(1)
                    : '0';

                return (
                  <tr key={send.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/newsletter/${send.id}`}
                        className="font-medium text-gray-900 hover:text-teal-600"
                      >
                        {send.post?.title || 'Untitled'}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">
                        {send.target_all_subscribers
                          ? 'All subscribers'
                          : send.target_topics?.length > 0
                          ? send.target_topics.join(', ')
                          : 'All subscribers'}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <SendStatusBadge status={send.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <span className="font-medium text-gray-800">
                          {send.sent_count}
                        </span>
                        <span className="text-gray-500">
                          {' '}
                          / {send.total_recipients}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-green-600">
                          <Eye className="h-4 w-4" />
                          <span>{openRate}%</span>
                        </div>
                        <div className="flex items-center gap-1 text-purple-600">
                          <MousePointer className="h-4 w-4" />
                          <span>{clickRate}%</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(send.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/newsletter/${send.id}`}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded inline-flex"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
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
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${classes}`}
    >
      <Icon
        className={`h-3 w-3 ${status === 'sending' ? 'animate-spin' : ''}`}
      />
      {status}
    </span>
  );
}

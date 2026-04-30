import { createClient } from '@/lib/supabase/server';
import { Users, Mail, TrendingUp } from 'lucide-react';
import type { Database } from '@/lib/supabase/types';

type Subscriber = Database['public']['Tables']['subscribers']['Row'];

export default async function SubscribersPage() {
  const supabase = await createClient();

  const { data: subscribersData, count } = await supabase
    .from('subscribers')
    .select('*', { count: 'exact' })
    .is('unsubscribed_at', null)
    .order('subscribed_at', { ascending: false })
    .limit(100);

  const subscribers = subscribersData as Subscriber[] | null;

  // Calculate stats
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const newThisWeek = subscribers?.filter(s => new Date(s.subscribed_at) >= sevenDaysAgo).length ?? 0;

  // Topic distribution
  const topicCounts: Record<string, number> = {};
  subscribers?.forEach(sub => {
    sub.topics?.forEach(topic => {
      topicCounts[topic] = (topicCounts[topic] || 0) + 1;
    });
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Subscribers</h1>
        <p className="text-gray-600 mt-1">Manage your newsletter subscribers</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-sm text-gray-600">Total Subscribers</span>
          </div>
          <p className="text-3xl font-semibold text-gray-800">{count ?? 0}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-600">New This Week</span>
          </div>
          <p className="text-3xl font-semibold text-gray-800">{newThisWeek}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-sm text-gray-600">Top Interest</span>
          </div>
          <p className="text-xl font-semibold text-gray-800">
            {Object.entries(topicCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'None yet'}
          </p>
        </div>
      </div>

      {/* Topic Distribution */}
      {Object.keys(topicCounts).length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Interest Distribution</h2>
          <div className="flex flex-wrap gap-3">
            {Object.entries(topicCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([topic, count]) => (
                <span
                  key={topic}
                  className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full"
                >
                  <span className="text-gray-700">{topic}</span>
                  <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                    {count}
                  </span>
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Subscribers Table */}
      {subscribers && subscribers.length > 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Email</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Name</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Topics</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Source</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Subscribed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {subscriber.email}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {subscriber.name || '—'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {subscriber.topics?.map(topic => (
                        <span
                          key={topic}
                          className="inline-block bg-teal-50 text-teal-700 text-xs px-2 py-0.5 rounded"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {subscriber.source || '—'}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {new Date(subscriber.subscribed_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">No subscribers yet</h3>
          <p className="text-gray-600">
            Subscribers will appear here once they sign up through your newsletter forms.
          </p>
        </div>
      )}
    </div>
  );
}

import { createClient } from '@/lib/supabase/server';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import type { Database } from '@/lib/supabase/types';

type Donation = Database['public']['Tables']['donations']['Row'];

export default async function DonationsPage() {
  const supabase = await createClient();

  const { data: donationsData } = await supabase
    .from('donations')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  const donations = donationsData as Donation[] | null;

  // Calculate stats
  const totalAllTime = donations?.reduce((sum, d) => sum + d.amount_cents, 0) ?? 0;
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentDonations = donations?.filter(d => new Date(d.created_at) >= thirtyDaysAgo) ?? [];
  const totalRecent = recentDonations.reduce((sum, d) => sum + d.amount_cents, 0);
  const avgDonation = donations && donations.length > 0
    ? totalAllTime / donations.length
    : 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Donations</h1>
        <p className="text-gray-600 mt-1">Track donations received through Stripe</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-600">Total (All Time)</span>
          </div>
          <p className="text-3xl font-semibold text-gray-800">
            ${(totalAllTime / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-sm text-gray-600">Last 30 Days</span>
          </div>
          <p className="text-3xl font-semibold text-gray-800">
            ${(totalRecent / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-sm text-gray-600">Average Donation</span>
          </div>
          <p className="text-3xl font-semibold text-gray-800">
            ${(avgDonation / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Donations Table */}
      {donations && donations.length > 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Date</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Donor</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Email</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-gray-600">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {donations.map((donation) => (
                <tr key={donation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(donation.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {donation.donor_name || 'Anonymous'}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {donation.donor_email || '—'}
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-green-600">
                    ${(donation.amount_cents / 100).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <DollarSign className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">No donations yet</h3>
          <p className="text-gray-600">
            Donations will appear here once they&apos;re processed through Stripe.
          </p>
        </div>
      )}
    </div>
  );
}

import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import { AlertTriangle, CheckCircle, XCircle, Eye, Clock } from 'lucide-react';
import ReportActions from '@/components/admin/ReportActions';

export const metadata = {
  title: 'Memorial Reports | Admin Dashboard',
};

export default async function ReportsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createAdminClient() as any;

  // Get pending reports
  const { data: pendingReports } = await supabase
    .from('memorial_reports')
    .select(`
      *,
      memorials:memorial_id (
        id,
        slug,
        deceased_full_name,
        status
      )
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: true });

  // Get resolved reports
  const { data: resolvedReports } = await supabase
    .from('memorial_reports')
    .select(`
      *,
      memorials:memorial_id (
        id,
        slug,
        deceased_full_name,
        status
      )
    `)
    .in('status', ['resolved', 'dismissed'])
    .order('resolved_at', { ascending: false })
    .limit(20);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const reportTypeLabels: Record<string, string> = {
    unauthorized: 'Unauthorized Memorial',
    inaccurate: 'Inaccurate Information',
    inappropriate: 'Inappropriate Content',
    impersonation: 'Impersonation/Fraud',
    privacy: 'Privacy Violation',
    other: 'Other',
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Memorial Reports</h1>
        <p className="text-gray-600 mt-1">
          Review and respond to reported memorials
        </p>
      </div>

      {/* Pending Reports */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-500" />
          Pending Reports ({pendingReports?.length || 0})
        </h2>

        {!pendingReports || pendingReports.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <p className="text-gray-600">No pending reports.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingReports.map((report: {
              id: string;
              report_type: string;
              description: string;
              reporter_name: string;
              reporter_email: string;
              reporter_relationship: string | null;
              created_at: string;
              memorials: {
                id: string;
                slug: string;
                deceased_full_name: string;
                status: string;
              };
            }) => (
              <div
                key={report.id}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center gap-1 px-2 py-1 text-xs bg-amber-100 text-amber-700 rounded-full">
                        <AlertTriangle className="w-3 h-3" />
                        {reportTypeLabels[report.report_type] || report.report_type}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(report.created_at)}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">
                      Memorial: {report.memorials.deceased_full_name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span>
                        Reported by: {report.reporter_name} ({report.reporter_email})
                      </span>
                      {report.reporter_relationship && (
                        <span>Relationship: {report.reporter_relationship}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/in-memory/${report.memorials.slug}`}
                      target="_blank"
                      className="flex items-center gap-1 px-3 py-1 border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      View Memorial
                    </Link>
                    <Link
                      href={`/admin/memorials/${report.memorials.id}`}
                      className="flex items-center gap-1 px-3 py-1 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors text-sm"
                    >
                      Review
                    </Link>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {report.description}
                  </p>
                </div>
                <ReportActions reportId={report.id} memorialId={report.memorials.id} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resolved Reports */}
      <div>
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          Recently Resolved
        </h2>

        {!resolvedReports || resolvedReports.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <p className="text-gray-500">No resolved reports</p>
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
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Outcome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resolved
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {resolvedReports.map((report: {
                  id: string;
                  report_type: string;
                  status: string;
                  resolved_at: string;
                  memorials: {
                    deceased_full_name: string;
                  };
                }) => (
                  <tr key={report.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      {report.memorials.deceased_full_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">
                      {reportTypeLabels[report.report_type] || report.report_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                          report.status === 'resolved'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {report.status === 'resolved' ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        {report.status === 'resolved' ? 'Action Taken' : 'Dismissed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                      {report.resolved_at ? formatDate(report.resolved_at) : '-'}
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

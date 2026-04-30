import { createClient } from '@/lib/supabase/server';
import { MessageSquare, User, Building, Clock } from 'lucide-react';
import type { Database } from '@/lib/supabase/types';

type Submission = Database['public']['Tables']['contact_submissions']['Row'];

export default async function SubmissionsPage() {
  const supabase = await createClient();

  const { data: submissionsData } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  const submissions = submissionsData as Submission[] | null;

  const statusColors = {
    new: 'bg-amber-100 text-amber-700',
    reviewed: 'bg-blue-100 text-blue-700',
    responded: 'bg-green-100 text-green-700',
    archived: 'bg-gray-100 text-gray-600',
  };

  const typeColors = {
    volunteer: 'bg-purple-100 text-purple-700',
    partner: 'bg-indigo-100 text-indigo-700',
    general: 'bg-gray-100 text-gray-600',
  };

  const newCount = submissions?.filter(s => s.status === 'new').length ?? 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Contact Submissions</h1>
        <p className="text-gray-600 mt-1">
          Review volunteer applications and partnership inquiries
          {newCount > 0 && (
            <span className="ml-2 inline-block bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-sm">
              {newCount} new
            </span>
          )}
        </p>
      </div>

      {submissions && submissions.length > 0 ? (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-800">{submission.name}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <a
                    href={`mailto:${submission.email}`}
                    className="text-teal-600 hover:underline"
                  >
                    {submission.email}
                  </a>
                  {submission.organization && (
                    <>
                      <span className="text-gray-400">•</span>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Building className="h-4 w-4" />
                        {submission.organization}
                      </div>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${typeColors[submission.type]}`}>
                    {submission.type}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[submission.status]}`}>
                    {submission.status}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{submission.message}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  {new Date(submission.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${submission.email}?subject=Re: Your inquiry to Faith Marie Foundation`}
                    className="text-sm text-teal-600 hover:text-teal-700 hover:underline"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>

              {submission.notes && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Notes:</span> {submission.notes}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">No submissions yet</h3>
          <p className="text-gray-600">
            Volunteer and partnership inquiries will appear here.
          </p>
        </div>
      )}
    </div>
  );
}

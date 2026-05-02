import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import { ArrowLeft, ExternalLink, Calendar, User, FileText, AlertTriangle } from 'lucide-react';
import ModerationActions from '@/components/admin/ModerationActions';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MemorialReviewPage({ params }: Props) {
  const { id } = await params;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createAdminClient() as any;

  // Get memorial with creator info
  const { data: memorial, error } = await supabase
    .from('memorials')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !memorial) {
    notFound();
  }

  // Get proof of death
  const { data: proof } = await supabase
    .from('proof_of_death')
    .select('*')
    .eq('memorial_id', id)
    .single();

  // Get attestation
  const { data: attestation } = await supabase
    .from('attestations')
    .select('*')
    .eq('memorial_id', id)
    .single();

  // Get creator info
  const { data: creator } = await supabase
    .from('memorial_users')
    .select('*')
    .eq('user_id', memorial.creator_id)
    .single();

  // Get photos
  const { data: photos } = await supabase
    .from('memorial_photos')
    .select('*')
    .eq('memorial_id', id)
    .order('display_order', { ascending: true })
    .limit(5);

  // Get moderation history
  const { data: moderationHistory } = await supabase
    .from('moderation_actions')
    .select('*')
    .eq('memorial_id', id)
    .order('action_at', { ascending: false });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const fullName = memorial.deceased_full_name;

  const proofTypeLabels: Record<string, string> = {
    obituary_url: 'Obituary URL',
    funeral_home: 'Funeral Home',
    newspaper_link: 'Newspaper Link',
    upload: 'Uploaded Document',
    hardship_attestation: 'Hardship Attestation',
  };

  const getPhotoUrl = (storagePath: string) => {
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/memorial-photos/${storagePath}`;
  };

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/memorials"
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Queue
        </Link>
      </div>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">{fullName}</h1>
          <p className="text-gray-500 mt-1">
            {formatDate(memorial.deceased_dob)} -{' '}
            {formatDate(memorial.deceased_dod)}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                memorial.status === 'pending_moderation'
                  ? 'bg-yellow-100 text-yellow-700'
                  : memorial.status === 'published'
                  ? 'bg-green-100 text-green-700'
                  : memorial.status === 'rejected'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {memorial.status.replace('_', ' ')}
            </span>
            {memorial.funded_by === 'hardship' && (
              <span className="flex items-center gap-1 px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded-full">
                <AlertTriangle className="w-3 h-3" />
                Hardship Waiver
              </span>
            )}
          </div>
        </div>

        {memorial.status === 'published' && (
          <Link
            href={`/in-memory/${memorial.slug}`}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Public Page
          </Link>
        )}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Creator Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-gray-400" />
              Creator Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Name</span>
                <p className="text-gray-800">{creator?.full_name || 'Unknown'}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Email</span>
                <p className="text-gray-800">{creator?.email || 'Unknown'}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Relationship</span>
                <p className="text-gray-800 capitalize">
                  {memorial.creator_relationship?.replace('_', ' ') || 'Not specified'}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Phone</span>
                <p className="text-gray-800">{creator?.phone || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Proof of Death */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-400" />
              Proof of Death
            </h2>
            {proof ? (
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Type</span>
                  <p className="text-gray-800">{proofTypeLabels[proof.proof_type] || proof.proof_type}</p>
                </div>
                {proof.obituary_url && (
                  <div>
                    <span className="text-sm text-gray-500">URL</span>
                    <a
                      href={proof.obituary_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-teal-600 hover:underline break-all"
                    >
                      {proof.obituary_url}
                    </a>
                  </div>
                )}
                {proof.funeral_home_name && (
                  <div>
                    <span className="text-sm text-gray-500">Funeral Home</span>
                    <p className="text-gray-800">{proof.funeral_home_name}</p>
                    {proof.funeral_home_phone && (
                      <p className="text-gray-600">{proof.funeral_home_phone}</p>
                    )}
                  </div>
                )}
                {proof.hardship_explanation && (
                  <div>
                    <span className="text-sm text-gray-500">Hardship Explanation</span>
                    <p className="text-gray-800 whitespace-pre-wrap">{proof.hardship_explanation}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">No proof of death submitted</p>
            )}
          </div>

          {/* Attestation */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              Attestation
            </h2>
            {attestation ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      attestation.attested ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />
                  <span className="text-gray-800">
                    {attestation.attested ? 'Attested' : 'Not attested'}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">IP Address</span>
                  <p className="text-gray-800">{attestation.ip_address || 'Unknown'}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">User Agent</span>
                  <p className="text-gray-600 text-sm break-all">
                    {attestation.user_agent || 'Unknown'}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Date</span>
                  <p className="text-gray-800">
                    {formatDate(attestation.attested_at)}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No attestation record</p>
            )}
          </div>

          {/* Obituary Preview */}
          {memorial.obituary_text && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Obituary</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{memorial.obituary_text}</p>
            </div>
          )}

          {/* Photos Preview */}
          {photos && photos.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                Photos ({photos.length})
              </h2>
              <div className="grid grid-cols-5 gap-2">
                {photos.map((photo: { id: string; storage_path: string }) => (
                  <img
                    key={photo.id}
                    src={getPhotoUrl(photo.storage_path)}
                    alt="Memorial photo"
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Moderation Actions */}
          <ModerationActions
            memorialId={memorial.id}
            currentStatus={memorial.status}
          />

          {/* Moderation History */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Moderation History
            </h2>
            {!moderationHistory || moderationHistory.length === 0 ? (
              <p className="text-gray-500 text-sm">No moderation actions yet</p>
            ) : (
              <div className="space-y-3">
                {moderationHistory.map((action: {
                  id: string;
                  action_type: string;
                  internal_notes: string | null;
                  action_at: string;
                }) => (
                  <div
                    key={action.id}
                    className="pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-800 capitalize">
                        {action.action_type.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(action.action_at)}
                      </span>
                    </div>
                    {action.internal_notes && (
                      <p className="text-sm text-gray-600 mt-1">
                        {action.internal_notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

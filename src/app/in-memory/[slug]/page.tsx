import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { createAdminClient } from '@/lib/supabase/admin';
import MemorialNavigation from '@/components/memorials/MemorialNavigation';
import MemorialHero from '@/components/memorials/MemorialHero';
import MemorialObituary from '@/components/memorials/MemorialObituary';
import MemorialTimeline from '@/components/memorials/MemorialTimeline';
import MemorialPhotos from '@/components/memorials/MemorialPhotos';
import MemorialTributes from '@/components/memorials/MemorialTributes';
import MemorialDonate from '@/components/memorials/MemorialDonate';
import PasswordGate from '@/components/memorials/PasswordGate';
import Link from 'next/link';
import { Flag } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getMemorial(slug: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createAdminClient() as any;

  const { data: memorial, error } = await supabase
    .from('memorials')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching memorial:', error);
    return null;
  }

  if (!memorial) {
    return null;
  }

  // Only show published memorials publicly
  if (memorial.status !== 'published') {
    return null;
  }

  // Get photos
  const { data: photos } = await supabase
    .from('memorial_photos')
    .select('*')
    .eq('memorial_id', memorial.id)
    .order('sort_order', { ascending: true });

  // Get life events
  const { data: lifeEvents } = await supabase
    .from('life_events')
    .select('*')
    .eq('memorial_id', memorial.id)
    .order('sort_order', { ascending: true });

  // Get approved tributes
  const { data: tributes } = await supabase
    .from('tributes')
    .select('*')
    .eq('memorial_id', memorial.id)
    .eq('status', 'approved')
    .order('submitted_at', { ascending: false });

  return {
    ...memorial,
    photos: photos || [],
    lifeEvents: lifeEvents || [],
    tributes: tributes || [],
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const memorial = await getMemorial(slug);

  if (!memorial) {
    return {
      title: 'Memorial Not Found | Faith Marie Foundation',
    };
  }

  const dob = new Date(memorial.deceased_dob);
  const dod = new Date(memorial.deceased_dod);
  const description = `In loving memory of ${memorial.deceased_full_name} (${dob.getFullYear()}-${dod.getFullYear()})`;

  // Private/password-protected memorials should not be indexed
  const isPrivate = memorial.privacy === 'password';

  return {
    title: `${memorial.deceased_full_name} | In Memory | Faith Marie Foundation`,
    description,
    robots: isPrivate ? { index: false, follow: false } : undefined,
    openGraph: isPrivate ? undefined : {
      title: `In Memory of ${memorial.deceased_full_name}`,
      description,
      type: 'profile',
    },
  };
}

export default async function MemorialPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const memorial = await getMemorial(slug);

  if (!memorial) {
    notFound();
  }

  // Check if password protected
  if (memorial.privacy === 'password') {
    const passwordVerified = resolvedSearchParams.verified === 'true';
    if (!passwordVerified) {
      return (
        <>
          <MemorialNavigation memorialName={memorial.deceased_full_name} />
          <main className="min-h-screen pt-14 bg-memorial-bg">
            <PasswordGate slug={slug} memorialName={memorial.deceased_full_name} />
          </main>
        </>
      );
    }
  }

  // Format dates
  const dob = new Date(memorial.deceased_dob + 'T00:00:00');
  const dod = new Date(memorial.deceased_dod + 'T00:00:00');

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const heroPhotoUrl = memorial.hero_photo?.storage_path
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/memorial-photos/${memorial.hero_photo.storage_path}`
    : null;

  // Get theme accent color
  const accentColors: Record<string, string> = {
    teal: 'teal',
    amber: 'amber',
    rose: 'rose',
  };
  const accent = accentColors[memorial.theme_accent] || 'teal';

  return (
    <>
      <MemorialNavigation memorialName={memorial.deceased_full_name} />
      <main className="min-h-screen pt-14 bg-memorial-bg">
        {/* Hero Section */}
        <MemorialHero
          name={memorial.deceased_full_name}
          birthDate={formatDate(dob)}
          deathDate={formatDate(dod)}
          epitaph={memorial.epitaph}
          heroPhotoUrl={heroPhotoUrl}
          accent={accent}
        />

        {/* Obituary */}
        {memorial.obituary_text && (
          <MemorialObituary text={memorial.obituary_text} accent={accent} />
        )}

        {/* Photo Gallery */}
        {memorial.photos.length > 0 && (
          <MemorialPhotos photos={memorial.photos} />
        )}

        {/* Life Events Timeline */}
        {memorial.lifeEvents.length > 0 && (
          <MemorialTimeline events={memorial.lifeEvents} accent={accent} />
        )}

        {/* Tributes/Guestbook */}
        <MemorialTributes
          memorialId={memorial.id}
          tributes={memorial.tributes}
          deceasedName={memorial.deceased_full_name}
        />

        {/* Donate in Memory */}
        <MemorialDonate
          deceasedName={memorial.deceased_full_name}
          memorialId={memorial.id}
          accent={accent}
        />

        {/* Footer */}
        <section className="py-8 border-t border-gray-200/50 bg-memorial-bg-alt">
          <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>
              Hosted with love by{' '}
              <Link href="/" className="text-teal-600 hover:text-teal-700">
                Faith Marie Foundation
              </Link>
              {' · '}
              <Link href="/donate" className="text-teal-600 hover:text-teal-700">
                Support our mission
              </Link>
            </p>
            <Link
              href={`/memorials/report?slug=${slug}`}
              className="flex items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Flag className="w-4 h-4" />
              Report this memorial
            </Link>
          </div>
        </section>

        {/* Sponsor credit if applicable */}
        {memorial.sponsor_show_credit && memorial.sponsor_display_name && (
          <div className="py-4 text-center text-sm text-gray-500 bg-memorial-bg-alt border-t border-gray-200/50">
            Sponsored by {memorial.sponsor_display_name}
          </div>
        )}
      </main>
    </>
  );
}

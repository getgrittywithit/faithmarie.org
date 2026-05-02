import { redirect, notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import DashboardSidebar from '@/components/memorials/dashboard/DashboardSidebar';
import PhotosManager from '@/components/memorials/dashboard/PhotosManager';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PhotosPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/memorials/create');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: memorial, error } = await (supabase as any)
    .from('memorials')
    .select('*')
    .eq('id', id)
    .eq('creator_id', user.id)
    .single();

  if (error || !memorial) {
    notFound();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: photos } = await (supabase as any)
    .from('memorial_photos')
    .select('*')
    .eq('memorial_id', id)
    .order('display_order', { ascending: true });

  const fullName = memorial.deceased_full_name;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar
        memorialId={memorial.id}
        memorialSlug={memorial.slug}
        memorialName={fullName}
        status={memorial.status}
      />
      <main className="flex-1 p-8">
        <PhotosManager
          memorialId={memorial.id}
          initialPhotos={photos || []}
          heroPhotoId={memorial.hero_photo_id}
        />
      </main>
    </div>
  );
}

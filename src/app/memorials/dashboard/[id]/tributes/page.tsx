import { redirect, notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import DashboardSidebar from '@/components/memorials/dashboard/DashboardSidebar';
import TributesManager from '@/components/memorials/dashboard/TributesManager';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function TributesPage({ params }: Props) {
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
  const { data: tributes } = await (supabase as any)
    .from('tributes')
    .select('*')
    .eq('memorial_id', id)
    .order('submitted_at', { ascending: false });

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
        <TributesManager memorialId={memorial.id} initialTributes={tributes || []} />
      </main>
    </div>
  );
}

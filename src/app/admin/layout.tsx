import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'Admin Dashboard | Faith Marie Foundation',
  robots: 'noindex, nofollow',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Allow login page to render without user
  // (middleware handles the actual redirect logic)
  if (!user) {
    return <>{children}</>;
  }

  // Get admin user info
  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('*')
    .eq('id', user.id)
    .single();

  // If user is authenticated but not an admin user, show error
  if (!adminUser) {
    redirect('/admin/login?error=not_authorized');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar user={adminUser} />
      <main className="flex-1 ml-64">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

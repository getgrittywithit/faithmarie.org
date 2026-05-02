'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  LayoutDashboard,
  FileText,
  DollarSign,
  Users,
  MessageSquare,
  LogOut,
  ExternalLink,
  Heart,
} from 'lucide-react';
import type { Database } from '@/lib/supabase/types';

type AdminUser = Database['public']['Tables']['admin_users']['Row'];

interface AdminSidebarProps {
  user: AdminUser;
}

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Overview' },
  { href: '/admin/memorials', icon: Heart, label: 'Memorials' },
  { href: '/admin/research', icon: FileText, label: 'Research Digests' },
  { href: '/admin/donations', icon: DollarSign, label: 'Donations' },
  { href: '/admin/subscribers', icon: Users, label: 'Subscribers' },
  { href: '/admin/submissions', icon: MessageSquare, label: 'Submissions' },
];

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  const roleColors = {
    admin: 'bg-red-100 text-red-700',
    board_member: 'bg-purple-100 text-purple-700',
    contributor: 'bg-blue-100 text-blue-700',
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-lg font-semibold text-gray-800">Faith Marie</h1>
        <p className="text-sm text-gray-500">Admin Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href));

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 pt-4 border-t border-gray-100">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:bg-gray-50 rounded-md transition-colors"
          >
            <ExternalLink className="h-5 w-5" />
            <span>View Site</span>
          </Link>
        </div>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
            <span className="text-teal-700 font-medium">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">{user.name}</p>
            <span className={`inline-block text-xs px-2 py-0.5 rounded ${roleColors[user.role]}`}>
              {user.role.replace('_', ' ')}
            </span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

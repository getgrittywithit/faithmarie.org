'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Image,
  Clock,
  MessageSquare,
  Settings,
  Eye,
  ArrowLeft,
} from 'lucide-react';

interface DashboardSidebarProps {
  memorialId: string;
  memorialSlug: string;
  memorialName: string;
  status: string;
}

export default function DashboardSidebar({
  memorialId,
  memorialSlug,
  memorialName,
  status,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const basePath = `/memorials/dashboard/${memorialId}`;

  const navItems = [
    { href: basePath, label: 'Overview', icon: Home, exact: true },
    { href: `${basePath}/photos`, label: 'Photos', icon: Image },
    { href: `${basePath}/timeline`, label: 'Timeline', icon: Clock },
    { href: `${basePath}/tributes`, label: 'Tributes', icon: MessageSquare },
    { href: `${basePath}/settings`, label: 'Settings', icon: Settings },
  ];

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const statusColors: Record<string, { bg: string; text: string }> = {
    draft: { bg: 'bg-gray-100', text: 'text-gray-600' },
    pending_moderation: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    published: { bg: 'bg-green-100', text: 'text-green-700' },
    rejected: { bg: 'bg-red-100', text: 'text-red-700' },
    taken_down: { bg: 'bg-red-100', text: 'text-red-700' },
  };

  const statusLabels: Record<string, string> = {
    draft: 'Draft',
    pending_moderation: 'Pending Review',
    published: 'Published',
    rejected: 'Rejected',
    taken_down: 'Taken Down',
  };

  const colors = statusColors[status] || statusColors.draft;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-4 border-b border-gray-200">
        <Link
          href="/memorials/dashboard"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          All Memorials
        </Link>
        <h2 className="font-semibold text-gray-800 truncate">{memorialName}</h2>
        <span
          className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${colors.bg} ${colors.text}`}
        >
          {statusLabels[status] || status}
        </span>
      </div>

      <nav className="p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href, item.exact);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    active
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {status === 'published' && (
        <div className="p-4 border-t border-gray-200">
          <Link
            href={`/in-memory/${memorialSlug}`}
            target="_blank"
            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            <Eye className="w-4 h-4" />
            View Public Page
          </Link>
        </div>
      )}
    </aside>
  );
}

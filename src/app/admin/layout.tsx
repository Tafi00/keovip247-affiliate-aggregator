import React from 'react';
import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // We allow the login page without auth check inside layout
  // Next.js layout runs for child routes. We can check auth here for protection
  const isAuth = await isAdminAuthenticated();

  return (
    <div className="min-h-screen bg-slate-950 flex text-slate-100 antialiased">
      {isAuth ? (
        <>
          <AdminSidebar />
          <div className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen">
            {children}
          </div>
        </>
      ) : (
        <div className="w-full">{children}</div>
      )}
    </div>
  );
}

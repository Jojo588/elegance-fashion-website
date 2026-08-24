'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-muted">
        <AdminSidebar />
        <main className="min-h-screen overflow-auto md:ml-64">
          <div className="p-4 md:p-8">{children}</div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

import React from 'react';
import { Sidebar } from './Sidebar';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto bg-gray-50 dark:bg-gray-900">
        {children}
      </main>
    </div>
  );
}

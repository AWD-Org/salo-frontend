'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { useAppSelector } from '@/redux/store';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);

  return (
    <div className="flex">
      <Sidebar />
      <main className={cn(
        'flex-1 min-h-[calc(100vh-3.5rem)] transition-all duration-300',
        sidebarOpen ? 'ml-64' : 'ml-0'
      )}>
        <div className="bg-background min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}

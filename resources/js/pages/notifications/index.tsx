import React from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

interface Notification {
  id: string;
  type: string;
  data: {
    title?: string;
    message?: string;
  };
  read_at: string | null;
  created_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Notifications', href: '/notifications' },
];

export default function Notifications({ notifications }: { notifications: Notification[] }) {
  const markAsRead = (id: string) => {
    router.post(`/notifications/${id}/read`);
  };

  const markAllAsRead = () => {
    router.post('/notifications/read-all');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Notifications" />
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <Button onClick={markAllAsRead}>Mark All as Read</Button>
        </div>

        {notifications.length === 0 ? (
          <p className="text-muted-foreground">No notifications yet.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((n) => (
              <li key={n.id} className="p-4 border rounded-md shadow-sm bg-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">
                      {n.data.title || 'Notification'}
                    </p>
                    <p className="text-sm">{n.data.message || 'No details provided.'}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(n.created_at).toLocaleString()}
                    </p>
                  </div>
                  {!n.read_at && (
                    <Button size="sm" onClick={() => markAsRead(n.id)}>
                      Mark as Read
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppLayout>
  );
}

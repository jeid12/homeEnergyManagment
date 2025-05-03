import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { type BreadcrumbItem } from '@/types';

interface Props {
  device: {
    id: number;
    name: string;
    type: string;
    status: string;
    serial_number?: string;
  };
  assignedUser: {
    id: number;
    name: string;
  } | null;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Devices', href: '/devices' },
  { title: 'Device Detail', href: '#' },
];

export default function ShowDevice({ device, assignedUser }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Device Details" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Device Details</CardTitle>
              <Link href="/devices">
                <Button variant="outline">Back to Devices</Button>
              </Link>
            </div>
            <CardDescription>View details about the selected device.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <strong>Name:</strong> {device.name}
            </div>
            <div>
              <strong>Type:</strong> {device.type}
            </div>
            <div>
              <strong>Status:</strong> {device.status}
            </div>
            {device.serial_number && (
              <div>
                <strong>Serial Number:</strong> {device.serial_number}
              </div>
            )}
            <div>
              <strong>Assigned User:</strong> {assignedUser?.name ?? 'Not Assigned'}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

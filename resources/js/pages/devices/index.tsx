import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { PlusIcon, EyeIcon, PencilIcon, TrashIcon } from 'lucide-react';

export interface Device {
  id: number;
  name: string;
  device_type: string;
  serial_number?: string;
  ip_address?: string;
  is_active: boolean;
  is_online: boolean;
  user?: {
    id: number;
    name: string;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Devices',
    href: '/devices',
  },
];

export default function DeviceIndex({ devices }: { devices: Device[] }) {
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to remove this device?')) {
      router.delete(`/devices/${id}`);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Devices" />
      <div className="flex h-full flex-1 flex-col gap-4 p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Devices</h1>
          <Link href="/devices/create">
            <Button>
              <PlusIcon className="w-4 h-4 mr-2" />
              Add New Device
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200 rounded-md text-sm">
            <thead className="bg-primary-100 text-left">
              <tr>
                <th className="p-3 border-b">#</th>
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Type</th>
                <th className="p-3 border-b">Serial</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">User</th>
                <th className="p-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {devices.length > 0 ? (
                devices.map((device, index) => (
                  <tr key={device.id}>
                    <td className="p-3 border-b">{index + 1}</td>
                    <td className="p-3 border-b">{device.name}</td>
                    <td className="p-3 border-b">{device.device_type}</td>
                    <td className="p-3 border-b">{device.serial_number || 'N/A'}</td>
                    <td className="p-3 border-b">
                      {device.is_active ? 'Active' : 'Inactive'} /{' '}
                      {device.is_online ? 'Online' : 'Offline'}
                    </td>
                    <td className="p-3 border-b">{device.user?.name || 'N/A'}</td>
                    <td className="p-3 border-b text-center">
                      <div className="flex justify-center gap-2">
                        <Link href={`/devices/${device.id}`}>
                          <Button variant="outline" size="sm">
                            <EyeIcon className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/devices/${device.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <PencilIcon className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(device.id)}
                          size="sm"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-muted-foreground">
                    No devices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}

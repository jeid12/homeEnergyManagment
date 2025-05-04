// SensorIndex.tsx
import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { PlusIcon, EyeIcon, PencilIcon, TrashIcon } from 'lucide-react';

export interface Sensor {
  id: number;
  name: string;
  type: string;
  location?: string;
  unit: string;
  status: 'active' | 'inactive' | 'error';
  last_reading?: number;
  device?: {
    id: number;
    name: string;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Sensors', href: '/sensors' },
];

export default function SensorIndex({ sensors }: { sensors: Sensor[] }) {
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this sensor?')) {
      router.delete(`/sensors/${id}`);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Sensors" />
      <div className="flex h-full flex-1 flex-col gap-4 p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Sensors</h1>
          <Link href="/sensors/create">
            <Button>
              <PlusIcon className="w-4 h-4 mr-2" />
              Add New Sensor
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
                <th className="p-3 border-b">Location</th>
                <th className="p-3 border-b">Unit</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Reading</th>
                <th className="p-3 border-b">Device</th>
                <th className="p-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sensors.length > 0 ? (
                sensors.map((sensor, index) => (
                  <tr key={sensor.id}>
                    <td className="p-3 border-b">{index + 1}</td>
                    <td className="p-3 border-b">{sensor.name}</td>
                    <td className="p-3 border-b">{sensor.type}</td>
                    <td className="p-3 border-b">{sensor.location || 'N/A'}</td>
                    <td className="p-3 border-b">{sensor.unit}</td>
                    <td className="p-3 border-b">{sensor.status}</td>
                    <td className="p-3 border-b">{sensor.last_reading ?? 'N/A'}</td>
                    <td className="p-3 border-b">{sensor.device?.name || 'N/A'}</td>
                    <td className="p-3 border-b text-center">
                      <div className="flex justify-center gap-2">
                        <Link href={`/sensors/${sensor.id}`}>
                          <Button variant="outline" size="sm">
                            <EyeIcon className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/sensors/${sensor.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <PencilIcon className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="destructive" onClick={() => handleDelete(sensor.id)} size="sm">
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="p-4 text-center text-muted-foreground">
                    No sensors found.
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

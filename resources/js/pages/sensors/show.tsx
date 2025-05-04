// SensorShow.tsx
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';

interface SensorShowProps {
  sensor: {
    id: number;
    name: string;
    type: string;
    location: string;
    unit: string;
    status: string;
    last_reading?: number;
    device_id: number;
  };
}

export default function SensorShow({ sensor }: SensorShowProps) {
  return (
    <AppLayout>
      <Head title={`Sensor ${sensor.name}`} />
      <div className="p-4 space-y-2">
        <h1 className="text-2xl font-bold">Sensor Details</h1>
        <div><strong>Name:</strong> {sensor.name}</div>
        <div><strong>Type:</strong> {sensor.type}</div>
        <div><strong>Location:</strong> {sensor.location}</div>
        <div><strong>Unit:</strong> {sensor.unit}</div>
        <div><strong>Status:</strong> {sensor.status}</div>
        <div><strong>Last Reading:</strong> {sensor.last_reading ?? 'N/A'}</div>
        <div><strong>Device ID:</strong> {sensor.device_id}</div>
        <Link href="/sensors">
          <Button className="mt-4">Back to Sensors</Button>
        </Link>
      </div>
    </AppLayout>
  );
}

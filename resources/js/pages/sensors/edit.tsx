// SensorEdit.tsx
import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SensorEditProps {
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

export default function SensorEdit({ sensor }: SensorEditProps) {
  const [form, setForm] = useState(sensor);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.put(`/sensors/${sensor.id}`, form);
  };

  return (
    <AppLayout>
      <Head title={`Edit Sensor - ${sensor.name}`} />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Edit Sensor</h1>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <Input id="type" name="type" value={form.type} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" value={form.location} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="unit">Unit</Label>
            <Input id="unit" name="unit" value={form.unit} onChange={handleChange} required />
          </div>
            <div>
                <Label htmlFor="last_reading">Last Reading</Label>
                <Input id="last_reading" name="last_reading" value={String(form.last_reading)} onChange={handleChange} required />
            </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Input id="status" name="status" value={form.status} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="device_id">Device ID</Label>
            <Input id="device_id" name="device_id" value={String(form.device_id)} onChange={handleChange} required />
          </div>
          <Button type="submit">Update Sensor</Button>
        </form>
      </div>
    </AppLayout>
  );
}

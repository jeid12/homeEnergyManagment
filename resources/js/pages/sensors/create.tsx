import React, { useState } from 'react';
import { Head,  router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SensorCreate() {
  const [form, setForm] = useState({
    name: '',
    type: '',
    location: '',
    unit: '',
    status: 'active',
    last_reading: 0,
    device_id: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.post('/sensors', form);
  };

  return (
    <AppLayout>
      <Head title="Add Sensor" />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Add New Sensor</h1>
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
            <Input id="last_reading" name="last_reading" value={form.unit} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="device_id">Device ID</Label>
            <Input id="device_id" name="device_id" value={form.device_id} onChange={handleChange} required />
          </div>
          <Button type="submit">Create Sensor</Button>
        </form>
      </div>
    </AppLayout>
  );
}

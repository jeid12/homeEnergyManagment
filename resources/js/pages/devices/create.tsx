import { useForm, Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface User {
  id: number;
  name: string;
}

interface Props {
  users: User[];
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Devices', href: '/devices' },
  { title: 'Create Device', href: '/devices/create' },
];

export default function CreateDevice({ users }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    user_id: '',
    name: '',
    device_type: '',
    serial_number: '',
    mac_address: '',
    ip_address: '',
    firmware_version: '',
    last_active_at: '',
    current_power_usage: '',
    total_energy_consumed: '',
    usage_log: [],
    predictions: [],
    anomaly_score: '',
    location: '',
    is_active: false as boolean,
    is_online: false as boolean,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/devices');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Device" />
      <div className="flex flex-col gap-4 p-4 rounded-xl">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Create Device</CardTitle>
              <Link href="/devices">
                <Button type="button" variant="outline">Back to Devices</Button>
              </Link>
            </div>
            <CardDescription>Add a new device and assign it to a user.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              {/* Assigned User */}
              <div className="grid gap-2">
                <label htmlFor="user_id" className="text-sm font-medium">Assigned User</label>
                <select
                  id="user_id"
                  className="border rounded-md p-2"
                  value={data.user_id}
                  onChange={e => setData('user_id', e.target.value)}
                >
                  <option value="">Select a user</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
                {errors.user_id && <span className="text-sm text-red-600">{errors.user_id}</span>}
              </div>

              {/* Name */}
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">Device Name</label>
                <input
                  type="text"
                  id="name"
                  className="border rounded-md p-2"
                  value={data.name}
                  onChange={e => setData('name', e.target.value)}
                />
                {errors.name && <span className="text-sm text-red-600">{errors.name}</span>}
              </div>

              {/* Device Type */}
              <div className="grid gap-2">
                <label htmlFor="device_type" className="text-sm font-medium">Device Type</label>
                <input
                  type="text"
                  id="device_type"
                  className="border rounded-md p-2"
                  value={data.device_type}
                  onChange={e => setData('device_type', e.target.value)}
                />
                {errors.device_type && <span className="text-sm text-red-600">{errors.device_type}</span>}
              </div>

              {/* Serial Number */}
              <div className="grid gap-2">
                <label htmlFor="serial_number" className="text-sm font-medium">Serial Number</label>
                <input
                  type="text"
                  id="serial_number"
                  className="border rounded-md p-2"
                  value={data.serial_number}
                  onChange={e => setData('serial_number', e.target.value)}
                />
                {errors.serial_number && <span className="text-sm text-red-600">{errors.serial_number}</span>}
              </div>

              {/* MAC Address */}
              <div className="grid gap-2">
                <label htmlFor="mac_address" className="text-sm font-medium">MAC Address</label>
                <input
                  type="text"
                  id="mac_address"
                  className="border rounded-md p-2"
                  value={data.mac_address}
                  onChange={e => setData('mac_address', e.target.value)}
                />
                {errors.mac_address && <span className="text-sm text-red-600">{errors.mac_address}</span>}
              </div>

              {/* IP Address */}
              <div className="grid gap-2">
                <label htmlFor="ip_address" className="text-sm font-medium">IP Address</label>
                <input
                  type="text"
                  id="ip_address"
                  className="border rounded-md p-2"
                  value={data.ip_address}
                  onChange={e => setData('ip_address', e.target.value)}
                />
                {errors.ip_address && <span className="text-sm text-red-600">{errors.ip_address}</span>}
              </div>

              {/* Firmware Version */}
              <div className="grid gap-2">
                <label htmlFor="firmware_version" className="text-sm font-medium">Firmware Version</label>
                <input
                  type="text"
                  id="firmware_version"
                  className="border rounded-md p-2"
                  value={data.firmware_version}
                  onChange={e => setData('firmware_version', e.target.value)}
                />
                {errors.firmware_version && <span className="text-sm text-red-600">{errors.firmware_version}</span>}
              </div>

              {/* Last Active At */}
              <div className="grid gap-2">
                <label htmlFor="last_active_at" className="text-sm font-medium">Last Active At</label>
                <input
                  type="date"
                  id="last_active_at"
                  className="border rounded-md p-2"
                  value={data.last_active_at}
                  onChange={e => setData('last_active_at', e.target.value)}
                />
                {errors.last_active_at && <span className="text-sm text-red-600">{errors.last_active_at}</span>}
              </div>

              {/* Current Power Usage */}
              <div className="grid gap-2">
                <label htmlFor="current_power_usage" className="text-sm font-medium">Current Power Usage (W)</label>
                <input
                  type="number"
                  id="current_power_usage"
                  className="border rounded-md p-2"
                  value={data.current_power_usage}
                  onChange={e => setData('current_power_usage', e.target.value)}
                />
                {errors.current_power_usage && <span className="text-sm text-red-600">{errors.current_power_usage}</span>}
              </div>

              {/* Total Energy Consumed */}
              <div className="grid gap-2">
                <label htmlFor="total_energy_consumed" className="text-sm font-medium">Total Energy Consumed (kWh)</label>
                <input
                  type="number"
                  id="total_energy_consumed"
                  className="border rounded-md p-2"
                  value={data.total_energy_consumed}
                  onChange={e => setData('total_energy_consumed', e.target.value)}
                />
                {errors.total_energy_consumed && <span className="text-sm text-red-600">{errors.total_energy_consumed}</span>}
              </div>

              {/* Anomaly Score */}
              <div className="grid gap-2">
                <label htmlFor="anomaly_score" className="text-sm font-medium">Anomaly Score</label>
                <input
                  type="number"
                  id="anomaly_score"
                  className="border rounded-md p-2"
                  value={data.anomaly_score}
                  onChange={e => setData('anomaly_score', e.target.value)}
                />
                {errors.anomaly_score && <span className="text-sm text-red-600">{errors.anomaly_score}</span>}
              </div>

              {/* Location */}
              <div className="grid gap-2">
                <label htmlFor="location" className="text-sm font-medium">Location</label>
                <input
                  type="text"
                  id="location"
                  className="border rounded-md p-2"
                  value={data.location}
                  onChange={e => setData('location', e.target.value)}
                />
                {errors.location && <span className="text-sm text-red-600">{errors.location}</span>}
              </div>

              {/* Booleans */}
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={data.is_active}
                    onChange={e => setData('is_active', e.target.checked)}
                  />
                  Active
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={data.is_online}
                    onChange={e => setData('is_online', e.target.checked)}
                  />
                  Online
                </label>
              </div>

              <Button type="submit" disabled={processing}>
                {processing ? 'Creating...' : 'Create Device'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

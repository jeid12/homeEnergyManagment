import { useForm, Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface User {
  id: number;
  name: string;
}

interface Device {
  id: number;
  user_id: number;
  name: string;
  device_type: string;
  serial_number?: string;
  mac_address?: string;
  ip_address?: string;
  firmware_version?: string;
  last_active_at?: string;
  current_power_usage?: number;
  total_energy_consumed?: number;
  location?: string;
  is_active: boolean;
  is_online: boolean;
}

interface Props {
  users: User[];
  device: Device;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Devices', href: '/devices' },
  { title: 'Edit Device', href: '#' },
];

export default function EditDevice({ device, users }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    user_id: device.user_id,
    name: device.name,
    device_type: device.device_type,
    serial_number: device.serial_number || '',
    mac_address: device.mac_address || '',
    ip_address: device.ip_address || '',
    firmware_version: device.firmware_version || '',
    last_active_at: device.last_active_at || '',
    current_power_usage: device.current_power_usage || '',
    total_energy_consumed: device.total_energy_consumed || '',
    location: device.location || '',
    is_active: device.is_active,
    is_online: device.is_online,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/devices/${device.id}`); // Laravel update route
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Device" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Edit Device</CardTitle>
              <Link href="/devices">
                <Button type="button" variant="outline">Back to Devices</Button>
              </Link>
            </div>
            <CardDescription>Update device information.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Device Name</label>
                <input
                  type="text"
                  className="border rounded-md p-2 w-full"
                  value={data.name}
                  onChange={e => setData('name', e.target.value)}
                />
                {errors.name && <span className="text-sm text-red-600">{errors.name}</span>}
              </div>

              <div>
                <label className="text-sm font-medium">Device Type</label>
                <input
                  type="text"
                  className="border rounded-md p-2 w-full"
                  value={data.device_type}
                  onChange={e => setData('device_type', e.target.value)}
                />
                {errors.device_type && <span className="text-sm text-red-600">{errors.device_type}</span>}
              </div>

              <div>
                <label className="text-sm font-medium">Assign to User</label>
                <select
                  className="border rounded-md p-2 w-full"
                  value={data.user_id}
                  onChange={e => setData('user_id', Number(e.target.value))}
                >
                  <option value="">Select a user</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
                {errors.user_id && <span className="text-sm text-red-600">{errors.user_id}</span>}
              </div>

              <div>
                <label className="text-sm font-medium">Serial Number</label>
                <input
                  type="text"
                  className="border rounded-md p-2 w-full"
                  value={data.serial_number}
                  onChange={e => setData('serial_number', e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium">MAC Address</label>
                <input
                  type="text"
                  className="border rounded-md p-2 w-full"
                  value={data.mac_address}
                  onChange={e => setData('mac_address', e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium">IP Address</label>
                <input
                  type="text"
                  className="border rounded-md p-2 w-full"
                  value={data.ip_address}
                  onChange={e => setData('ip_address', e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Firmware Version</label>
                <input
                  type="text"
                  className="border rounded-md p-2 w-full"
                  value={data.firmware_version}
                  onChange={e => setData('firmware_version', e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Last Active At</label>
                <input
                  type="date"
                  className="border rounded-md p-2 w-full"
                  value={data.last_active_at}
                  onChange={e => setData('last_active_at', e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Current Power Usage (W)</label>
                <input
                  type="number"
                  className="border rounded-md p-2 w-full"
                  value={data.current_power_usage}
                  onChange={e => setData('current_power_usage', Number(e.target.value))}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Total Energy Consumed (kWh)</label>
                <input
                  type="number"
                  className="border rounded-md p-2 w-full"
                  value={data.total_energy_consumed}
                  onChange={e => setData('total_energy_consumed', Number(e.target.value))}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Location</label>
                <input
                  type="text"
                  className="border rounded-md p-2 w-full"
                  value={data.location}
                  onChange={e => setData('location', e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={data.is_active}
                  onChange={e => setData('is_active', e.target.checked)}
                />
                <label className="text-sm font-medium">Is Active</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={data.is_online}
                  onChange={e => setData('is_online', e.target.checked)}
                />
                <label className="text-sm font-medium">Is Online</label>
              </div>

              <div className="md:col-span-2">
                <Button type="submit" disabled={processing}>
                  {processing ? 'Updating...' : 'Update Device'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

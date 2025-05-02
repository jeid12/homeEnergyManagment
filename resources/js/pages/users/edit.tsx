import { useForm, Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Role {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role_id: number | null;
}

interface Props {
  roles: Role[];
  user: User;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Users', href: '/users' },
  { title: 'Edit User', href: '#' },
];

export default function EditUser({ user, roles }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    name: user.name,
    email: user.email,
    password: '',
    role_id: user.role_id || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/users/${user.id}`); // Laravel update route
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit User" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Edit User</CardTitle>
              <Link href="/users">
                <Button type="button" variant="outline">Back to Users</Button>
              </Link>
            </div>
            <CardDescription>Update user details and their role.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  className="border rounded-md p-2"
                  value={data.name}
                  onChange={e => setData('name', e.target.value)}
                />
                {errors.name && <span className="text-sm text-red-600">{errors.name}</span>}
              </div>

              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  className="border rounded-md p-2"
                  value={data.email}
                  onChange={e => setData('email', e.target.value)}
                />
                {errors.email && <span className="text-sm text-red-600">{errors.email}</span>}
              </div>

              <div className="grid gap-2">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <input
                  type="password"
                  id="password"
                  className="border rounded-md p-2"
                  placeholder="Leave blank to keep current"
                  value={data.password}
                  onChange={e => setData('password', e.target.value)}
                />
                {errors.password && <span className="text-sm text-red-600">{errors.password}</span>}
              </div>

              <div className="grid gap-2">
                <label htmlFor="role_id" className="text-sm font-medium">Assign Role</label>
                <select
                  id="role_id"
                  className="border rounded-md p-2"
                  value={data.role_id}
                  onChange={e => setData('role_id', e.target.value)}
                >
                  <option value="">Select a role</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                {errors.role_id && <span className="text-sm text-red-600">{errors.role_id}</span>}
              </div>

              <Button type="submit" disabled={processing}>
                {processing ? 'Updating...' : 'Update User'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

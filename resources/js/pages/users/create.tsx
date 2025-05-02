import { useForm, Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Role {
  id: number;
  name: string;
}

interface Props {
  roles: Role[];
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Users', href: '/users' },
  { title: 'Create User', href: '/users/create' },
];

export default function CreateUser({ roles }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    role_id: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/users'); // Make sure this route exists in your Laravel routes
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create User" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Create User</CardTitle>
              <Link href="/users">
                <Button type="button" variant="outline">Back to Users</Button>
              </Link>
            </div>
            <CardDescription>
              Add a new user and assign a role.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name */}
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  className="border rounded-md p-2"
                  placeholder="Enter name"
                  value={data.name}
                  onChange={e => setData('name', e.target.value)}
                />
                {errors.name && <span className="text-sm text-red-600">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  className="border rounded-md p-2"
                  placeholder="Enter email"
                  value={data.email}
                  onChange={e => setData('email', e.target.value)}
                />
                {errors.email && <span className="text-sm text-red-600">{errors.email}</span>}
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <input
                  type="password"
                  id="password"
                  className="border rounded-md p-2"
                  placeholder="Enter password"
                  value={data.password}
                  onChange={e => setData('password', e.target.value)}
                />
                {errors.password && <span className="text-sm text-red-600">{errors.password}</span>}
              </div>

              {/* Role */}
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
                {processing ? 'Creating...' : 'Create User'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

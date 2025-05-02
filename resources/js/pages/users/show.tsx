import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { type BreadcrumbItem } from '@/types';

interface Props {
  user: {
    id: number;
    name: string;
    email: string;
  };
  role: {
    id: number;
    name: string;
  } | null;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Users', href: '/users' },
  { title: 'User Detail', href: '#' },
];

export default function Show({ user, role }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="User Details" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>User Details</CardTitle>
              <Link href="/users">
                <Button variant="outline">Back to Users</Button>
              </Link>
            </div>
            <CardDescription>View details about the selected user.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <strong>Name:</strong> {user.name}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Role:</strong> {role?.name ?? 'N/A'}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

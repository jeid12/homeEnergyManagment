import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { PlusIcon, EyeIcon, PencilIcon, TrashIcon } from 'lucide-react';

export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  roles: Role[];
  created_at?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Users',
    href: '/users',
  },
];

export default function UsersIndex({ users }: { users: User[] }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Users" />
      <div className="flex h-full flex-1 flex-col gap-4 p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Users</h1>
          <Link href="/users/create">
            <Button>
              <PlusIcon className="w-4 h-4 mr-2" />
              Add New User
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200 rounded-md text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3 border-b">#</th>
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Email</th>
                <th className="p-3 border-b">Roles</th>
                <th className="p-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="p-3 border-b">{index + 1}</td>
                    <td className="p-3 border-b">{user.name}</td>
                    <td className="p-3 border-b">{user.email}</td>
                    <td className="p-3 border-b">
                      {user.roles.map((role) => role.name).join(', ') || 'No Role'}
                    </td>
                    <td className="p-3 border-b text-center">
                      <div className="flex justify-center gap-2">
                        <Link href={`/users/${user.id}`}>
                          <Button variant="outline" size="sm">
                            <EyeIcon className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/users/${user.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <PencilIcon className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/users/${user.id}/delete`}>
                          <Button variant="destructive" size="sm">
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-muted-foreground">
                    No users found.
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

import { useForm, Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Roles', href: '/roles' },
    { title: 'Edit Role', href: '/roles/edit' }, // Updated to include 'Edit Role'
];

export interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at?: string;
    updated_at?: string;
}

interface EditRoleProps {
    role: { id: number, name: string, permissions: Permission[] };
    permissions: Permission[];
}

export default function EditRole({ role, permissions }: EditRoleProps) {
    // Ensure permissions are typed as an array of numbers
    const { data, setData, put, processing, errors } = useForm({
        name: role.name,
        permissions: role.permissions.map((p) => p.id),  // Pre-check the permissions and set as number[]
    });

    // Handle changes in permissions (check/uncheck checkboxes)
    const handleCheckboxChange = (id: number) => {
        const updatedPermissions = data.permissions.includes(id)
            ? data.permissions.filter((pid: number) => pid !== id) // Remove permission
            : [...data.permissions, id]; // Add permission

        setData('permissions', updatedPermissions); // Directly set updated permissions
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/roles/${role.id}`); // Using the PUT method to update the role
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Role" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Role</CardTitle>
                        <CardDescription>Edit the details of the role.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="grid gap-2">
                                <label htmlFor="role-name" className="text-sm font-medium">
                                    Role Name
                                </label>
                                <input
                                    type="text"
                                    id="role-name"
                                    className="border rounded-md p-2"
                                    placeholder="Enter role name"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                />
                                {errors.name && <span className="text-sm text-red-600">{errors.name}</span>}
                            </div>

                            <div className="grid gap-2">
                                <label htmlFor="permissions" className="text-sm font-medium">
                                    Permissions
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {permissions.map(permission => (
                                        <label key={permission.id} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={data.permissions.includes(permission.id)}
                                                onChange={() => handleCheckboxChange(permission.id)}
                                            />
                                            <span>{permission.name}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.permissions && (
                                    <span className="text-sm text-red-600">{errors.permissions}</span>
                                )}
                            </div>

                            <Button type="submit" disabled={processing}>
                                {processing ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

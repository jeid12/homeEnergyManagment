import { useForm, Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Roles', href: '/roles' },
    { title: 'Create Role', href: '/roles/create' },
];

export interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at?: string;
    updated_at?: string;
}

interface CreateRoleProps {
    permissions: Permission[];
}

export default function CreateRole({ permissions }: CreateRoleProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        permissions: [] as number[],
    });

    const handleCheckboxChange = (id: number) => {
        const updatedPermissions = data.permissions.includes(id)
            ? data.permissions.filter(pid => pid !== id)
            : [...data.permissions, id];

        setData('permissions', updatedPermissions);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/roles'); // Update as needed
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Role" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Create Role</CardTitle>
                            <Link href="/roles">
                                <Button type="button" variant="outline">Back to Roles</Button>
                            </Link>
                        </div>
                        <CardDescription>
                            Create a new role and assign permissions to it.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="grid gap-2">
                                <label htmlFor="role-name" className="text-sm font-medium">Role Name</label>
                                <input
                                    type="text"
                                    id="role-name"
                                    className="border rounded-md p-2"
                                    placeholder="Enter role name"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                />
                                {errors.name && (
                                    <span className="text-sm text-red-600">{errors.name}</span>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Permissions</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {permissions.map(permission => (
                                        <label key={permission.id} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                value={permission.id}
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
                                {processing ? 'Creating...' : 'Create Role'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

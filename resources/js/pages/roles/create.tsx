import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Roles',
        href: '/roles',
    },
    {
        title: 'Create Role',
        href: '/roles/create',
    },
];

export default function CreateRole() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Role" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Create Role</CardTitle>
                        <Link href='/roles'>
                            <button className="btn btn-primary">Back</button></Link>
                        <CardDescription>
                            Create a new role and assign permissions to it.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Form for creating a new role */}
                        <form className="flex flex-col gap-4">
                            <div className="grid gap-2">
                                <label htmlFor="role-name" className="text-sm font-medium">
                                    Role Name
                                </label>
                                <input
                                    type="text"
                                    id="role-name"
                                    className="border rounded-md p-2"
                                    placeholder="Enter role name"
                                />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="permissions" className="text-sm font-medium">
                                    Permissions
                                </label>
                                {/* Add permissions checkboxes here */}
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Create Role
                            </button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

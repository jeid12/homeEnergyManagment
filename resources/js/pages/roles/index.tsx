
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import {
 
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Roles',
        href: '/roles',
    },
];

export interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at?: string;
    updated_at?: string;
    permissions: Permission[];
  }
  

export default function Roles({ roles }: { roles: Role[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
               <div className="flex justify-between items-center">

                    <h1 className="text-2xl font-bold">Roles</h1>
                    
                        <Link
                        href='/roles/create'
                        >
                            <Button>
                        <PlusIcon className='w-4 h-4 mr-2'/>
                        Add Role
                        </Button>
                        </Link>
                        
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {roles.map((role: any) => (
        <Card key={role.id}>
            <CardHeader>
                <CardTitle>{role.name}</CardTitle>
                <CardDescription>
                    {role.permissions.length > 0
                        ? `Has ${role.permissions.length} permission(s)`
                        : 'No permissions assigned'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>Permissions:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {role.permissions.map((permission: any) => (
                        <li key={permission.id}>{permission.name}</li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Link href={`/roles/${role.id}/edit`}>
                    <Button variant="outline">Edit</Button>
                </Link>
            </CardFooter>
        </Card>
    ))}
</div>

                
            </div>
        </AppLayout>
    );
}

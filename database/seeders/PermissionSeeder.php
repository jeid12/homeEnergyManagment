<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Define all permissions
        $permissions = [
            // User permissions
            'manage users',
            'edit own profile',

            // Device permissions
            'manage all devices',
            'manage own devices',

            // Energy log permissions
            'view all logs',
            'view own logs',

            // AI Insight permissions
            'manage all insights',
            'view own insights',

            // Notification permissions
            'send notifications',
            'view own notifications',
        ];

        // Create permissions if they don't exist
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Get roles
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $clientRole = Role::firstOrCreate(['name' => 'client']);
        $staffRole = Role::firstOrCreate(['name' => 'staff']);

        // Admin permissions
        $adminRole->givePermissionTo([
            'manage users',
            'manage all devices',
            'view all logs',
            'manage all insights',
            'send notifications',
        ]);

        // Staff permissions
        $staffRole->givePermissionTo([
            'edit own profile',
            'manage all devices',
            'view all logs',
            'view own insights',
            'send notifications',
        ]);

        // Client permissions
        $clientRole->givePermissionTo([
            'edit own profile',
            'manage own devices',
            'view own logs',
            'view own insights',
            'view own notifications',
        ]);
    }
}
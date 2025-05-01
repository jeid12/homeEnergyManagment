import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Folder, LayoutGrid, ActivitySquare, MonitorSmartphone, ShieldCheck, Users2,Bell } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },{
        title: 'Roles',
        href: '/roles',
        icon: ShieldCheck,  // Better represents access control
      },
      {
        title: 'Users',
        href: '/users',
        icon: Users2,  // More clearly indicates user group
      },
      {
        title: 'Devices',
        href: '/devices',
        icon: MonitorSmartphone,  // Suggests smart/mobile devices
      },
      {
        title: 'Sensors',
        href: '/sensors',
        icon: ActivitySquare,  // Indicates data, activity or signal
      },
      {
        title: 'Notifications',
        href: '/notifications',
        icon: Bell,
      }
  
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/jeid12/homeEnergyManagment.git',
        icon: Folder,
    }
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

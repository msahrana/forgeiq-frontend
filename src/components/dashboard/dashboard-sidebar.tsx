'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
    adminRoutes,
    executiveRoutes,
    technicianRoutes,
    viewerRoutes,
} from '@/routes';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '../ui/sidebar';
import Image from 'next/image';
import { UserRole } from '@/types';
import { SidebarItems } from '@/interface';

const sidebarRoutes: Partial<Record<UserRole, SidebarItems>> = {
    SUPER_ADMIN: adminRoutes,
    ORG_OWNER: adminRoutes,
    FACTORY_MANAGER: adminRoutes,
    PRODUCTION_MANAGER: adminRoutes,
    MAINTENANCE_ENGINEER: adminRoutes,
    EXECUTIVE: executiveRoutes,
    TECHNICIAN: technicianRoutes,
    VIEWER: viewerRoutes,
};

const DashboardSidebar = ({ role }: { role: UserRole }) => {
    const pathname = usePathname();
    const routes: SidebarItems = sidebarRoutes[role] || [];

    return (
        <Sidebar>
            <SidebarHeader>
                <Image
                    src="/logo.png"
                    width={400}
                    height={400}
                    alt="GridCare"
                    className="size-10 rounded-xl object-cover mt-20"
                    priority
                />
            </SidebarHeader>

            <SidebarContent>
                {routes.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            render={<Link href={item.url} />}
                                            isActive={pathname === item.url}
                                        >
                                            {item.title}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
};

export default DashboardSidebar;

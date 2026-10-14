import { ReactNode } from 'react';
import RoleGuard from '@/components/auth/role-guard';
import DashboardShell from '@/components/dashboard/dashboard-shell';

const AdminLayout = ({ children }: { children: ReactNode }) => {
    return (
        <RoleGuard
            roles={[
                'SUPER_ADMIN',
                'ORG_OWNER',
                'FACTORY_MANAGER',
                'PRODUCTION_MANAGER',
                'MAINTENANCE_ENGINEER',
            ]}
        >
            <DashboardShell userRole="SUPER_ADMIN">{children}</DashboardShell>
        </RoleGuard>
    );
};

export default AdminLayout;

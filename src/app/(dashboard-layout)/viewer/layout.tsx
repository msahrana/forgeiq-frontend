import { ReactNode } from 'react';
import RoleGuard from '@/components/auth/role-guard';
import DashboardShell from '@/components/dashboard/dashboard-shell';

const ViewerLayout = ({ children }: { children: ReactNode }) => {
    return (
        <RoleGuard roles={['VIEWER']}>
            <DashboardShell userRole="VIEWER">{children}</DashboardShell>
        </RoleGuard>
    );
};

export default ViewerLayout;

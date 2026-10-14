import { ReactNode } from 'react';
import RoleGuard from '@/components/auth/role-guard';
import DashboardShell from '@/components/dashboard/dashboard-shell';

const ExecutiveLayout = ({ children }: { children: ReactNode }) => {
    return (
        <RoleGuard roles={['EXECUTIVE']}>
            <DashboardShell userRole="EXECUTIVE">{children}</DashboardShell>
        </RoleGuard>
    );
};

export default ExecutiveLayout;

import { ReactNode } from 'react';
import DashboardShell from '@/components/dashboard/dashboard-shell';

const AdminLayout = ({ children }: { children: ReactNode }) => {
    return <DashboardShell userRole="SUPER_ADMIN">{children}</DashboardShell>;
};

export default AdminLayout;

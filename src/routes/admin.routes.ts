const prefix = '/admin';

export const adminRoutes = [
    {
        title: 'Management',
        items: [
            {
                title: 'Overview',
                url: prefix,
            },
            {
                title: 'Technician Approval',
                url: `${prefix}/approve-technician`,
            },
        ],
    },

    {
        title: 'Operations & Scheduling',
        items: [
            {
                title: 'Zones',
                url: `${prefix}/zones`,
            },
            {
                title: 'Substations',
                url: `${prefix}/substations`,
            },
            {
                title: 'Feeders',
                url: `${prefix}/feeders`,
            },
            {
                title: 'Areas',
                url: `${prefix}/areas`,
            },
            {
                title: 'Outages',
                url: `${prefix}/outages`,
            },
            {
                title: 'Outage Assignments',
                url: `${prefix}/outageAssignments`,
            },
            {
                title: 'Load Shedding Schedules',
                url: `${prefix}/load-shedding-schedules`,
            },
            {
                title: 'Restorations',
                url: `${prefix}/restorations`,
            },
            {
                title: 'Automated Schedules',
                url: `${prefix}/automated-schedules`,
            },
        ],
    },

    {
        title: 'Communication & Security',
        items: [
            {
                title: 'Notifications',
                url: `${prefix}/notifications`,
            },
            {
                title: 'Audit Logs',
                url: `${prefix}/audit-logs`,
            },
        ],
    },

    {
        title: 'Finance & Reports',
        items: [
            {
                title: 'Outage Reports',
                url: `${prefix}/outageReports`,
            },
            {
                title: 'Analytics',
                url: `${prefix}/analytics`,
            },
            {
                title: 'Subscription Plans',
                url: '/subscriptions/plans',
            },
        ],
    },
];

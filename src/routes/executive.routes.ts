const prefix = '/executive';

export const executiveRoutes = [
    {
        title: 'Management',
        items: [
            {
                title: 'Overview',
                url: `${prefix}`,
            },
            
        ],
    },

    {
        title: 'Schedule & Subscriptions',
        items: [
            {
                title: 'Zones',
                url: `${prefix}/zones`,
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
                title: 'Notifications',
                url: `${prefix}/notifications`,
            },
            {
                title: 'Audit Logs',
                url: `${prefix}/audit-logs`,
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

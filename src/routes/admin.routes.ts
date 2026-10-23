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
                title: 'Organizations',
                url: `${prefix}/organization`,
            },
        ],
    },

    {
        title: 'Factory Operations',
        items: [
            {
                title: 'Plants',
                url: `${prefix}/plant`,
            },
            {
                title: 'Production Lines',
                url: `${prefix}/productionLine`,
            },
            {
                title: 'Machines',
                url: `${prefix}/machines`,
            },
            {
                title: 'Machine Metrics',
                url: `${prefix}/machine-metrics`,
            },
            {
                title: 'Machine Thresholds',
                url: `${prefix}/machine-threshold`,
            },
        ],
    },

    {
        title: 'Maintenance & Alerts',
        items: [
            {
                title: 'Alerts',
                url: `${prefix}/alerts`,
            },
            {
                title: 'Maintenance',
                url: `${prefix}/maintenance`,
            },
            {
                title: 'Work Orders',
                url: `${prefix}/work-order`,
            },
        ],
    },

    {
        title: 'Production & Quality',
        items: [
            {
                title: 'Production Records',
                url: `${prefix}/production-record`,
            },
            {
                title: 'Quality Inspections',
                url: `${prefix}/quality-inspection`,
            },
            {
                title: 'Energy',
                url: `${prefix}/energy`,
            },
        ],
    },

    {
        title: 'Reports & Intelligence',
        items: [
            {
                title: 'Reports',
                url: `${prefix}/reports`,
            },
            {
                title: 'Analytics',
                url: `${prefix}/analytics`,
            },
            {
                title: 'AI Insights',
                url: `${prefix}/ai-insight`,
            },
        ],
    },
];

const prefix = '/technician';

export const technicianRoutes = [
    {
        title: 'Bookings',
        items: [
            {
                title: 'Overview',
                url: `${prefix}`,
            },
            {
                title: 'My Subscriptions',
                url: `${prefix}/subscription`,
            },
            
        ],
    },

    {
        title: 'Account',
        items: [
            {
                title: 'Profile',
                url: `${prefix}/profile`,
            },
            {
                title: 'Settings',
                url: `${prefix}/settings`,
            },
        ],
    },
];

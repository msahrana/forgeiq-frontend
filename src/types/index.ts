export type UserRole =
    | 'SUPER_ADMIN'
    | 'ORG_OWNER'
    | 'FACTORY_MANAGER'
    | ' PRODUCTION_MANAGER'
    | 'MAINTENANCE_ENGINEER'
    | 'TECHNICIAN'
    | '  EXECUTIVE'
    | ' VIEWER';

export type UserStatus =
    | 'ACTIVE'
    | 'INVITED'
    | 'SUSPENDED'
    | 'DEACTIVATED'
    | 'DELETED';

export type MemberStatus =
    | 'ACTIVE'
    | 'INVITED'
    | 'SUSPENDED'
    | 'REMOVED'
    | 'DELETED';

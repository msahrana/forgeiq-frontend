import type { OrganizationStatus } from '@/types';

export interface ICreateOrganization {
    name: string;
    slug: string;
    logo?: string | null;
    industry: string;
    country: string;
    timezone: string;
}

export interface IUpdateOrganization {
    id: string;
    name?: string;
    slug?: string;
    logo?: string | null;
    industry?: string;
    country?: string;
    timezone?: string;
    status?: OrganizationStatus;
}

export interface IOrganizationOwner {
    id: string;
    name: string;
    email: string;
    image: string | null;
}

export interface IOrganizationCount {
    members: number;
    plants: number;
    subscriptions: number;
    reports: number;
}

export interface IOrganization {
    id: string;
    name: string;
    slug: string;
    logo: string | null;
    industry: string;
    country: string;
    timezone: string;
    status: OrganizationStatus;
    ownerId: string;
    createdAt: string;
    updatedAt: string;
    owner: IOrganizationOwner;
    _count: IOrganizationCount;
}

export interface IOrganizationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface OrganizationResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        data: IOrganization[];
        meta: IOrganizationMeta;
    };
}

export interface SingleOrganizationResponse {
    success: boolean;
    message: string;
    data: IOrganization;
}

export interface DeleteOrganizationResponse {
    success: boolean;
    message: string;
    data: null;
}

export interface OrganizationParams {
    page?: number;
    limit?: number;
    searchTerm?: string;
    sortOrder?: 'desc' | 'asc';
}

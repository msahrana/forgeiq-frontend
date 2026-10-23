import type { PlantStatus, UserRole } from '@/types';

export interface ICreatePlant {
    organizationId: string;
    managerId?: string | null;
    name: string;
    code: string;
    location: string;
    timezone?: string | null;
    status?: PlantStatus;
}

export interface IUpdatePlant {
    id: string;
    name?: string;
    location?: string;
    organizationId?: string;
    managerId?: string | null;
    code?: string;
    timezone?: string | null;
    status?: PlantStatus;
}

export interface IPlantOrganization {
    id: string;
    name: string;
    slug: string;
}

export interface IPlantManager {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

export interface IPlantCount {
    productionLines: number;
    machines: number;
    maintenanceTasks: number;
    workOrders: number;
    alerts: number;
    productionRecords: number;
    qualityInspections: number;
    energyRecords: number;
}

export interface IPlant {
    id: string;
    organizationId: string;
    managerId: string | null;
    name: string;
    code: string;
    location: string;
    timezone: string | null;
    status: PlantStatus;
    createdAt: string;
    updatedAt: string;
    organization: IPlantOrganization;
    manager: IPlantManager | null;
    _count: IPlantCount;
}

export interface IPlantMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface PlantResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: IPlant[];
    meta: IPlantMeta;
}

export interface SinglePlantResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: IPlant;
}

export interface DeletePlantResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: null;
}

export interface PlantParams {
    page?: number;
    limit?: number;
    search?: string;
    organizationId?: string;
    sortOrder?: 'asc' | 'desc';
}

import { PlantStatus, ProductionStatus } from '@/types';

export interface ICreateProductionLine {
    plantId: string;
    name: string;
    code: string;
    description?: string | null;
    status?: ProductionStatus;
    targetOutput?: number | null;
}

export interface IUpdateProductionLine {
    id: string;
    name?: string;
    code?: string;
    description?: string | null;
    status?: ProductionStatus;
    targetOutput?: number | null;
}

export interface IProductionLinePlant {
    id: string;
    name: string;
    code: string;
    location: string;
    status: PlantStatus;
}

export interface IProductionLineCount {
    machines: number;
    productionRecords: number;
    qualityInspections: number;
}

export interface IProductionLine {
    id: string;
    plantId: string;
    name: string;
    code: string;
    description: string | null;
    status: ProductionStatus;
    targetOutput: number | null;
    createdAt: string;
    updatedAt: string;
    plant: IProductionLinePlant;
    _count: IProductionLineCount;
}

export interface IProductionLineMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface ProductionLineResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        data: IProductionLine[];
        meta: IProductionLineMeta;
    };
}

export interface SingleProductionLineResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: IProductionLine;
}

export interface DeleteProductionLineResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: null;
}

export interface ProductionLineParams {
    page?: number;
    limit?: number;
    searchTerm?: string;
    plantId?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

import {
    ICreateProductionLine,
    IUpdateProductionLine,
    ProductionLineParams,
    ProductionLineResponse,
    SingleProductionLineResponse,
} from '@/interface';

import apiClient from '@/lib/apiClient';

export function createProductionLine(payload: ICreateProductionLine) {
    return apiClient<SingleProductionLineResponse>('/productionLines', {
        method: 'POST',
        body: payload,
    });
}

export async function getAllProductionLines(params: ProductionLineParams) {
    return apiClient<ProductionLineResponse>('/productionLines', {
        query: params,
    });
}

export function updateProductionLine(
    id: string,
    payload: Omit<IUpdateProductionLine, 'id'>,
) {
    return apiClient<SingleProductionLineResponse>(`/productionLines/${id}`, {
        method: 'PATCH',
        body: payload,
    });
}

export function deleteProductionLine(id: string) {
    return apiClient<{
        success: boolean;
        message: string;
        data: null;
    }>(`/productionLines/${id}`, {
        method: 'DELETE',
    });
}

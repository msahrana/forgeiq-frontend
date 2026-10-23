import {
    ICreatePlant,
    IUpdatePlant,
    PlantParams,
    PlantResponse,
    SinglePlantResponse,
} from '@/interface';

import apiClient from '@/lib/apiClient';

export function createPlant(payload: ICreatePlant) {
    return apiClient<SinglePlantResponse>('/plants', {
        method: 'POST',
        body: payload,
    });
}

export async function getAllPlants(params: PlantParams) {
    return apiClient<PlantResponse>('/plants', {
        query: params,
    });
}

export function updatePlant(id: string, payload: Omit<IUpdatePlant, 'id'>) {
    return apiClient<SinglePlantResponse>(`/plants/${id}`, {
        method: 'PATCH',
        body: payload,
    });
}

export function deletePlant(id: string) {
    return apiClient<{ success: boolean; message: string; data: null }>(
        `/plants/${id}`,
        { method: 'DELETE' },
    );
}

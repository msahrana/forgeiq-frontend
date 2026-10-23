import {
    ICreateOrganization,
    IUpdateOrganization,
    OrganizationParams,
    OrganizationResponse,
    SingleOrganizationResponse,
} from '@/interface';
import apiClient from '@/lib/apiClient';

export function createOrganization(payload: ICreateOrganization) {
    return apiClient<SingleOrganizationResponse>('/organizations', {
        method: 'POST',
        body: payload,
    });
}

export async function getAllOrganizations(params: OrganizationParams) {
    return apiClient<OrganizationResponse>('/organizations', { query: params });
}

export function updateOrganization(
    id: string,
    payload: Omit<IUpdateOrganization, 'id'>,
) {
    return apiClient<SingleOrganizationResponse>(`/organizations/${id}`, {
        method: 'PATCH',
        body: payload,
    });
}

export function deleteOrganization(id: string) {
    return apiClient<{ success: boolean; message: string; data: null }>(
        `/organizations/${id}`,
        { method: 'DELETE' },
    );
}

'use client';

import {
    useMutation,
    useQuery,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';

import {
    createOrganization,
    deleteOrganization,
    getAllOrganizations,
    updateOrganization,
} from '@/api';

import type {
    IUpdateOrganization,
    OrganizationParams,
    OrganizationResponse,
} from '@/interface';

export function useCreateOrganization() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createOrganization,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['organizations'],
            });
        },
    });
}

export function useGetAllOrganizations(params: OrganizationParams) {
    return useQuery<OrganizationResponse>({
        queryKey: ['organizations', params],
        queryFn: () => getAllOrganizations(params),
    });
}

export function useSuspenseGetAllOrganizations(params: OrganizationParams) {
    return useSuspenseQuery<OrganizationResponse>({
        queryKey: ['organizations', params],
        queryFn: () => getAllOrganizations(params),
    });
}

export function useUpdateOrganization() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: IUpdateOrganization) => {
            const { id, ...data } = payload;

            return updateOrganization(id, data);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['organizations'],
            });
        },
    });
}

export function useDeleteOrganization() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteOrganization(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['organizations'],
            });
        },
    });
}

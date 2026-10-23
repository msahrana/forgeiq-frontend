import {
    useMutation,
    useQuery,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';

import { createPlant, deletePlant, getAllPlants, updatePlant } from '@/api';
import { IUpdatePlant, PlantParams, PlantResponse } from '@/interface';

export function useCreatePlant() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPlant,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['plants'],
            });
        },
    });
}

export function useGetAllPlants(params: PlantParams) {
    return useQuery<PlantResponse>({
        queryKey: ['plants', params],
        queryFn: () => getAllPlants(params),
    });
}

export function useSuspenseGetAllPlants(params: PlantParams) {
    return useSuspenseQuery<PlantResponse>({
        queryKey: ['plants', params],
        queryFn: () => getAllPlants(params),
    });
}

export function useUpdatePlant() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, ...data }: IUpdatePlant) => {
            return updatePlant(id, data);
        },

        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ['plants'],
                }),
                queryClient.invalidateQueries({
                    queryKey: ['plant'],
                }),
            ]);
        },
    });
}

export function useDeletePlant() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deletePlant(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['plants'],
            });
        },
    });
}

import {
    useMutation,
    useQuery,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';

import {
    createProductionLine,
    deleteProductionLine,
    getAllProductionLines,
    updateProductionLine,
} from '@/api';

import {
    IUpdateProductionLine,
    ProductionLineParams,
    ProductionLineResponse,
} from '@/interface';

export function useCreateProductionLine() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProductionLine,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['productionLines'],
            });
        },
    });
}

export function useGetAllProductionLines(params: ProductionLineParams) {
    return useQuery<ProductionLineResponse>({
        queryKey: ['productionLines', params],
        queryFn: () => getAllProductionLines(params),
    });
}

export function useSuspenseGetAllProductionLines(params: ProductionLineParams) {
    return useSuspenseQuery<ProductionLineResponse>({
        queryKey: ['productionLines', params],
        queryFn: () => getAllProductionLines(params),
    });
}

export function useUpdateProductionLine() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, ...data }: IUpdateProductionLine) => {
            return updateProductionLine(id, data);
        },

        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ['productionLines'],
                }),
                queryClient.invalidateQueries({
                    queryKey: ['productionLine'],
                }),
            ]);
        },
    });
}

export function useDeleteProductionLine() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteProductionLine(id),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['productionLines'],
            });
        },
    });
}

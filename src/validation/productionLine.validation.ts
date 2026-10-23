import { z } from 'zod';

export const productionStatusSchema = z.enum([
    'RUNNING',
    'STOPPED',
    'IDLE',
    'MAINTENANCE',
    'ERROR',
]);

export const createProductionLineSchema = z.object({
    plantId: z.string().uuid('Please select a valid plant'),
    name: z.string().min(1, 'Name is required'),
    code: z.string().min(1, 'Code is required'),
    description: z.string().optional().nullable(),
    status: productionStatusSchema.optional(),
    targetOutput: z.number().nonnegative().nullable().optional(),
});

export const updateProductionLineSchema = z.object({
    name: z.string().min(1, 'Name is required').optional(),
    code: z.string().min(1, 'Code is required').optional(),
    description: z.string().nullable().optional(),
    status: productionStatusSchema.optional(),
    targetOutput: z.number().nonnegative().nullable().optional(),
});

export type CreateProductionLineFormValues = z.infer<
    typeof createProductionLineSchema
>;

export type UpdateProductionLineFormValues = z.infer<
    typeof updateProductionLineSchema
>;

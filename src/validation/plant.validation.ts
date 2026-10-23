import { z } from 'zod';

export const createPlantSchema = z.object({
    organizationId: z.string().trim().uuid('Invalid organization ID'),

    // Empty string is valid for the optional manager field.
    managerId: z.union([z.literal(''), z.string().uuid('Invalid manager ID')]),

    name: z.string().trim().min(1, 'Plant name is required'),

    code: z.string().trim().min(1, 'Plant code is required'),

    location: z.string().trim().min(1, 'Plant location is required'),

    // The form always supplies a string.
    timezone: z.string(),

    status: z.enum(['ACTIVE', 'INACTIVE', 'MAINTENANCE', 'CLOSED']),
});

export const updatePlantSchema = z.object({
    name: z.string().trim().min(1, 'Plant name is required').optional(),
    location: z.string().trim().min(1, 'Plant location is required').optional(),
    organizationId: z.string().uuid('Invalid organization ID').optional(),
    managerId: z.string().uuid('Invalid manager ID').nullable().optional(),
    code: z.string().trim().min(1, 'Plant code is required').optional(),
    timezone: z.string().nullable().optional(),
    status: z.enum(['ACTIVE', 'INACTIVE', 'MAINTENANCE', 'CLOSED']).optional(),
});

export const plantParamsSchema = z.object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
    search: z.string().optional(),
    organizationId: z.string().uuid().optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
});

export type CreatePlantFormValues = z.infer<typeof createPlantSchema>;
export type UpdatePlantFormValues = z.infer<typeof updatePlantSchema>;
export type PlantParamsValues = z.infer<typeof plantParamsSchema>;

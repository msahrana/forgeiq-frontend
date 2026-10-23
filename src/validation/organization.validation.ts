import { z } from 'zod';

// Organization status
export const organizationStatusSchema = z.enum([
    'TRIAL',
    'ACTIVE',
    'CANCELLED',
]);

// Create organization
export const createOrganizationSchema = z.object({
    name: z.string().trim().min(1, 'Organization name is required'),

    slug: z
        .string()
        .trim()
        .min(1, 'Slug is required')
        .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            'Slug must contain lowercase letters, numbers, and hyphens',
        ),

    logo: z
        .string()
        .refine(
            (value) =>
                value === '' || z.string().url().safeParse(value).success,
            'Invalid logo URL',
        ),

    industry: z.string().trim().min(1, 'Industry is required'),
    country: z.string().trim().min(1, 'Country is required'),
    timezone: z.string().trim().min(1, 'Timezone is required'),
});

// Organization owner
export const organizationOwnerSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    image: z.string().nullable(),
});

// Organization counts
export const organizationCountSchema = z.object({
    members: z.number().int().nonnegative(),
    plants: z.number().int().nonnegative(),
    subscriptions: z.number().int().nonnegative(),
    reports: z.number().int().nonnegative(),
});

// Single organization
export const organizationSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    slug: z.string(),
    logo: z.string().nullable(),
    industry: z.string(),
    country: z.string(),
    timezone: z.string(),
    status: organizationStatusSchema,
    ownerId: z.string().uuid(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    owner: organizationOwnerSchema,
    _count: organizationCountSchema,
});

// Pagination metadata
export const organizationMetaSchema = z.object({
    page: z.number().int().positive(),
    limit: z.number().int().positive(),
    total: z.number().int().nonnegative(),
    totalPages: z.number().int().nonnegative(),
    hasNextPage: z.boolean(),
    hasPreviousPage: z.boolean(),
});

// API response
export const getAllOrganizationsResponseSchema = z.object({
    success: z.boolean(),
    statusCode: z.number(),
    message: z.string(),
    data: z.object({
        data: z.array(organizationSchema),
        meta: organizationMetaSchema,
    }),
});

// Infer types from Zod
export type CreateOrganizationSchemaType = z.infer<
    typeof createOrganizationSchema
>;

export type OrganizationSchemaType = z.infer<typeof organizationSchema>;

export type OrganizationMetaSchemaType = z.infer<typeof organizationMetaSchema>;

export type GetAllOrganizationsResponseSchemaType = z.infer<
    typeof getAllOrganizationsResponseSchema
>;

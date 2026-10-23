'use client';

import { useForm } from '@tanstack/react-form';
import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/toast';

import {
    useCreatePlant,
    useSuspenseGetAllOrganizations,
    useSuspenseGetAllUsers,
} from '@/hooks';

import { CreatePlantFormValues, createPlantSchema } from '@/validation';

const ORGANIZATION_LIMIT = 5;

const CreatePlant = () => {
    const [open, setOpen] = useState(false);
    const [organizationPage, setOrganizationPage] = useState(1);

    const { mutate: createPlant, isPending } = useCreatePlant();

    const { data: organizationsResponse, isFetching: isFetchingOrganizations } =
        useSuspenseGetAllOrganizations({
            page: organizationPage,
            limit: ORGANIZATION_LIMIT,
        });

    const organizations = organizationsResponse.data.data;
    const organizationMeta = organizationsResponse.data.meta;

    const { data: usersResponse } = useSuspenseGetAllUsers();

    const managers = usersResponse.data.filter(
        (user) =>
            user.role === 'ORG_OWNER' || 'SUPER_ADMIN' || 'FACTORY_MANAGER',
    );

    const defaultValues: CreatePlantFormValues = {
        organizationId: '',
        managerId: '',
        name: '',
        code: '',
        location: '',
        timezone: 'Asia/Dhaka',
        status: 'ACTIVE',
    };

    const form = useForm({
        defaultValues,

        validators: {
            onSubmit: createPlantSchema,
        },

        onSubmit: async ({ value }) => {
            const payload = {
                ...value,
                managerId: value.managerId.trim() || undefined,
                timezone: value.timezone.trim() || undefined,
            };

            createPlant(payload, {
                onSuccess: (res) => {
                    toast.add({
                        title: 'Plant Created',
                        description:
                            res.message || 'Plant created successfully.',
                        type: 'success',
                    });

                    form.reset();
                    setOrganizationPage(1);
                    setOpen(false);
                },

                onError: (error) => {
                    toast.add({
                        title: 'Plant Creation Failed',
                        description:
                            error instanceof Error
                                ? error.message
                                : 'Failed to create plant.',
                        type: 'error',
                    });
                },
            });
        },
    });

    const handleOpenChange = (value: boolean) => {
        if (isPending) return;

        setOpen(value);

        if (!value) {
            form.reset();
            setOrganizationPage(1);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger
                render={
                    <Button type="button">
                        <Plus className="mr-2 size-4" />
                        Create Plant
                    </Button>
                }
            />

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Create Plant</DialogTitle>
                    <DialogDescription>
                        Add a new manufacturing plant to ForgeIQ.
                    </DialogDescription>
                </DialogHeader>

                <form
                    id="create-plant-form"
                    onSubmit={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        void form.handleSubmit();
                    }}
                >
                    <FieldGroup>
                        {/* Organization */}
                        <form.Field name="organizationId">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Organization
                                        </Label>

                                        <Select
                                            value={field.state.value}
                                            onValueChange={(value) => {
                                                if (value) {
                                                    field.handleChange(value);
                                                }
                                            }}
                                        >
                                            <SelectTrigger
                                                id={field.name}
                                                aria-invalid={hasError}
                                                onBlur={field.handleBlur}
                                            >
                                                <SelectValue placeholder="Select an organization" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {organizations.map(
                                                    (organization) => (
                                                        <SelectItem
                                                            key={
                                                                organization.id
                                                            }
                                                            value={
                                                                organization.id
                                                            }
                                                        >
                                                            {organization.name}
                                                        </SelectItem>
                                                    ),
                                                )}

                                                {organizations.length === 0 && (
                                                    <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                                                        No organizations found.
                                                    </div>
                                                )}
                                            </SelectContent>
                                        </Select>

                                        {/* Organization pagination */}
                                        <div className="flex items-center justify-between gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                disabled={
                                                    organizationPage <= 1 ||
                                                    isFetchingOrganizations
                                                }
                                                onClick={() => {
                                                    setOrganizationPage(
                                                        (page) =>
                                                            Math.max(
                                                                1,
                                                                page - 1,
                                                            ),
                                                    );
                                                }}
                                            >
                                                Previous
                                            </Button>

                                            <span className="text-sm text-muted-foreground">
                                                Page {organizationMeta.page} of{' '}
                                                {organizationMeta.totalPages}
                                            </span>

                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                disabled={
                                                    organizationPage >=
                                                        organizationMeta.totalPages ||
                                                    isFetchingOrganizations
                                                }
                                                onClick={() => {
                                                    setOrganizationPage(
                                                        (page) =>
                                                            Math.min(
                                                                organizationMeta.totalPages,
                                                                page + 1,
                                                            ),
                                                    );
                                                }}
                                            >
                                                Next
                                            </Button>
                                        </div>

                                        {hasError && (
                                            <p className="text-sm text-destructive">
                                                {
                                                    field.state.meta.errors[0]
                                                        ?.message
                                                }
                                            </p>
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        {/* Manager ID */}
                        <form.Field name="managerId">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Manager (Optional)
                                        </Label>

                                        <Select
                                            value={field.state.value || 'none'}
                                            onValueChange={(value) => {
                                                field.handleChange(
                                                    value === null ||
                                                        value === 'none'
                                                        ? ''
                                                        : value,
                                                );
                                            }}
                                        >
                                            <SelectTrigger
                                                id={field.name}
                                                aria-invalid={hasError}
                                                onBlur={field.handleBlur}
                                            >
                                                <SelectValue placeholder="Select a manager" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="none">
                                                    No manager
                                                </SelectItem>

                                                {managers.map((manager) => (
                                                    <SelectItem
                                                        key={manager.id}
                                                        value={manager.id}
                                                    >
                                                        {manager.name} (
                                                        {manager.email})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        {hasError && (
                                            <p className="text-sm text-destructive">
                                                {
                                                    field.state.meta.errors[0]
                                                        ?.message
                                                }
                                            </p>
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        {/* Plant Name */}
                        <form.Field name="name">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Plant Name
                                        </Label>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            placeholder="e.g. Dhaka Manufacturing Plant"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(event) =>
                                                field.handleChange(
                                                    event.target.value,
                                                )
                                            }
                                            aria-invalid={hasError}
                                        />

                                        {hasError && (
                                            <p className="text-sm text-destructive">
                                                {
                                                    field.state.meta.errors[0]
                                                        ?.message
                                                }
                                            </p>
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        {/* Plant Code */}
                        <form.Field name="code">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Plant Code
                                        </Label>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            placeholder="e.g. DHK-PLANT-01"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(event) =>
                                                field.handleChange(
                                                    event.target.value.toUpperCase(),
                                                )
                                            }
                                            aria-invalid={hasError}
                                        />

                                        {hasError && (
                                            <p className="text-sm text-destructive">
                                                {
                                                    field.state.meta.errors[0]
                                                        ?.message
                                                }
                                            </p>
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        {/* Location */}
                        <form.Field name="location">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Location
                                        </Label>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            placeholder="e.g. Dhaka, Bangladesh"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(event) =>
                                                field.handleChange(
                                                    event.target.value,
                                                )
                                            }
                                            aria-invalid={hasError}
                                        />

                                        {hasError && (
                                            <p className="text-sm text-destructive">
                                                {
                                                    field.state.meta.errors[0]
                                                        ?.message
                                                }
                                            </p>
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        {/* Timezone */}
                        <form.Field name="timezone">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Timezone
                                        </Label>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            placeholder="e.g. Asia/Dhaka"
                                            value={field.state.value ?? ''}
                                            onBlur={field.handleBlur}
                                            onChange={(event) =>
                                                field.handleChange(
                                                    event.target.value,
                                                )
                                            }
                                            aria-invalid={hasError}
                                        />

                                        {hasError && (
                                            <p className="text-sm text-destructive">
                                                {
                                                    field.state.meta.errors[0]
                                                        ?.message
                                                }
                                            </p>
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>
                    </FieldGroup>

                    <DialogFooter className="mt-6">
                        <DialogClose
                            render={
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={isPending}
                                >
                                    Cancel
                                </Button>
                            }
                        />

                        <Button
                            type="submit"
                            form="create-plant-form"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 size-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Plus className="mr-2 size-4" />
                                    Create Plant
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreatePlant;

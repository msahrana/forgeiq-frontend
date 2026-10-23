'use client';

import { useForm } from '@tanstack/react-form';
import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';

import { useCreateOrganization } from '@/hooks';

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

import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/toast';

import {
    createOrganizationSchema,
    CreateOrganizationSchemaType,
} from '@/validation';

const CreateOrganization = () => {
    const [open, setOpen] = useState(false);

    const { mutate: createOrganization, isPending } = useCreateOrganization();

    const form = useForm({
        defaultValues: {
            name: '',
            slug: '',
            logo: '',
            industry: '',
            country: '',
            timezone: 'Asia/Dhaka',
        } satisfies CreateOrganizationSchemaType,

        validators: {
            onSubmit: createOrganizationSchema,
        },

        onSubmit: async ({ value }) => {
            const payload = {
                ...value,
                ...(value.logo?.trim()
                    ? { logo: value.logo.trim() }
                    : { logo: undefined }),
            };

            createOrganization(payload, {
                onSuccess: (res) => {
                    toast.add({
                        title: 'Organization Created',
                        description:
                            res.message ||
                            'The organization has been created successfully.',
                        type: 'success',
                    });

                    form.reset();
                    setOpen(false);
                },
                onError: (error) => {
                    console.error('Create organization error:', error);

                    toast.add({
                        title: 'Organization Creation Failed',
                        description:
                            error instanceof Error
                                ? error.message
                                : 'Failed to create the organization.',
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
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger
                render={
                    <Button type="button">
                        <Plus className="mr-2 size-4" />
                        Create Organization
                    </Button>
                }
            />

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Create Organization</DialogTitle>
                    <DialogDescription>
                        Add a new organization to ForgeIQ.
                    </DialogDescription>
                </DialogHeader>

                <form
                    id="create-organization-form"
                    onSubmit={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        void form.handleSubmit();
                    }}
                >
                    <FieldGroup>
                        {/* Organization Name */}
                        <form.Field name="name">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Organization Name
                                        </Label>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            placeholder="e.g. ForgeIQ Manufacturing"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(event) => {
                                                const name = event.target.value;
                                                field.handleChange(name);

                                                form.setFieldValue(
                                                    'slug',
                                                    name
                                                        .toLowerCase()
                                                        .trim()
                                                        .replace(
                                                            /[^a-z0-9]+/g,
                                                            '-',
                                                        )
                                                        .replace(/^-|-$/g, ''),
                                                );
                                            }}
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

                        {/* Organization Slug */}
                        <form.Field name="slug">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Organization Slug
                                        </Label>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            placeholder="forgeiq-manufacturing"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(event) =>
                                                field.handleChange(
                                                    event.target.value
                                                        .toLowerCase()
                                                        .replace(
                                                            /[^a-z0-9-]/g,
                                                            '',
                                                        ),
                                                )
                                            }
                                            aria-invalid={hasError}
                                        />

                                        <p className="text-xs text-muted-foreground">
                                            Used in URLs and organization
                                            identification.
                                        </p>

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

                        {/* Industry */}
                        <form.Field name="industry">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Industry
                                        </Label>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            placeholder="e.g. Manufacturing"
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

                        {/* Country */}
                        <form.Field name="country">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Country
                                        </Label>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            placeholder="e.g. Bangladesh"
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

                        {/* Optional Logo URL */}
                        <form.Field name="logo">
                            {(field) => (
                                <Field>
                                    <Label htmlFor={field.name}>
                                        Logo URL (Optional)
                                    </Label>

                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="url"
                                        placeholder="https://example.com/logo.png"
                                        value={field.state.value ?? ''}
                                        onBlur={field.handleBlur}
                                        onChange={(event) =>
                                            field.handleChange(
                                                event.target.value,
                                            )
                                        }
                                    />
                                </Field>
                            )}
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
                            form="create-organization-form"
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
                                    Create Organization
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateOrganization;

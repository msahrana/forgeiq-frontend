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
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/toast';

import {
    useCreateProductionLine,
    useSuspenseGetAllPlants,
} from '@/hooks';
import { CreateProductionLineFormValues, createProductionLineSchema } from '@/validation';



const PLANT_LIMIT = 5;

const CreateProductionLine = () => {
    const [open, setOpen] = useState(false);
    const [plantPage, setPlantPage] = useState(1);

    const {
        mutate: createProductionLine,
        isPending,
    } = useCreateProductionLine();

    const {
        data: plantsResponse,
        isFetching: isFetchingPlants,
    } = useSuspenseGetAllPlants({
        page: plantPage,
        limit: PLANT_LIMIT,
    });

    const plants = plantsResponse.data;
    const plantMeta = plantsResponse.meta;

    const defaultValues: CreateProductionLineFormValues = {
        plantId: '',
        name: '',
        code: '',
        description: '',
        status: 'IDLE',
        targetOutput: null,
    };

    const form = useForm({
        defaultValues,

        validators: {
            onSubmit: createProductionLineSchema,
        },

        onSubmit: async ({ value }) => {
            const payload = {
                ...value,
                name: value.name.trim(),
                code: value.code.trim().toUpperCase(),
                description: value.description?.trim() || null,
            };

            createProductionLine(payload, {
                onSuccess: (res) => {
                    toast.add({
                        title: 'Production Line Created',
                        description:
                            res.message ||
                            'Production line created successfully.',
                        type: 'success',
                    });

                    form.reset();
                    setPlantPage(1);
                    setOpen(false);
                },

                onError: (error) => {
                    toast.add({
                        title: 'Production Line Creation Failed',
                        description:
                            error instanceof Error
                                ? error.message
                                : 'Failed to create production line.',
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
            setPlantPage(1);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger
                render={
                    <Button type="button">
                        <Plus className="mr-2 size-4" />
                        Create Production Line
                    </Button>
                }
            />

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Create Production Line</DialogTitle>
                    <DialogDescription>
                        Add a new production line to your manufacturing plant.
                    </DialogDescription>
                </DialogHeader>

                <form
                    id="create-production-line-form"
                    onSubmit={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        void form.handleSubmit();
                    }}
                >
                    <FieldGroup>
                        {/* Plant */}
                        <form.Field name="plantId">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Plant
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
                                                <SelectValue placeholder="Select a plant" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {plants.map((plant) => (
                                                    <SelectItem
                                                        key={plant.id}
                                                        value={plant.id}
                                                    >
                                                        {plant.name} (
                                                        {plant.code})
                                                    </SelectItem>
                                                ))}

                                                {plants.length === 0 && (
                                                    <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                                                        No plants found.
                                                    </div>
                                                )}
                                            </SelectContent>
                                        </Select>

                                        {/* Plant pagination */}
                                        <div className="flex items-center justify-between gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                disabled={
                                                    plantPage <= 1 ||
                                                    isFetchingPlants
                                                }
                                                onClick={() => {
                                                    setPlantPage((page) =>
                                                        Math.max(1, page - 1),
                                                    );
                                                }}
                                            >
                                                Previous
                                            </Button>

                                            <span className="text-sm text-muted-foreground">
                                                Page {plantMeta.page} of{' '}
                                                {plantMeta.totalPages}
                                            </span>

                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                disabled={
                                                    plantPage >=
                                                        plantMeta.totalPages ||
                                                    isFetchingPlants
                                                }
                                                onClick={() => {
                                                    setPlantPage((page) =>
                                                        Math.min(
                                                            plantMeta.totalPages,
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

                        {/* Production Line Name */}
                        <form.Field name="name">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Production Line Name
                                        </Label>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            placeholder="e.g. Assembly Line A"
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

                        {/* Production Line Code */}
                        <form.Field name="code">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Production Line Code
                                        </Label>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            placeholder="e.g. ASM-LINE-01"
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

                        {/* Description */}
                        <form.Field name="description">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Description (Optional)
                                        </Label>

                                        <Textarea
                                            id={field.name}
                                            name={field.name}
                                            placeholder="Describe this production line..."
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

                        {/* Production Status */}
                        <form.Field name="status">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Status
                                        </Label>

                                        <Select
                                            value={field.state.value}
                                            onValueChange={(value) => {
                                                if (
                                                    value === 'RUNNING' ||
                                                    value === 'STOPPED' ||
                                                    value === 'IDLE' ||
                                                    value === 'MAINTENANCE' ||
                                                    value === 'ERROR'
                                                ) {
                                                    field.handleChange(value);
                                                }
                                            }}
                                        >
                                            <SelectTrigger
                                                id={field.name}
                                                aria-invalid={hasError}
                                                onBlur={field.handleBlur}
                                            >
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="IDLE">
                                                    Idle
                                                </SelectItem>
                                                <SelectItem value="RUNNING">
                                                    Running
                                                </SelectItem>
                                                <SelectItem value="STOPPED">
                                                    Stopped
                                                </SelectItem>
                                                <SelectItem value="MAINTENANCE">
                                                    Maintenance
                                                </SelectItem>
                                                <SelectItem value="ERROR">
                                                    Error
                                                </SelectItem>
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

                        {/* Target Output */}
                        <form.Field name="targetOutput">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Target Output (Optional)
                                        </Label>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="number"
                                            min={0}
                                            placeholder="e.g. 500"
                                            value={field.state.value ?? ''}
                                            onBlur={field.handleBlur}
                                            onChange={(event) => {
                                                const value =
                                                    event.target.value;

                                                field.handleChange(
                                                    value === ''
                                                        ? null
                                                        : Number(value),
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
                            form="create-production-line-form"
                            disabled={isPending || plants.length === 0}
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 size-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Plus className="mr-2 size-4" />
                                    Create Production Line
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateProductionLine;
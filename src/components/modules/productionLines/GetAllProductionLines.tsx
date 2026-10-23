'use client';

import { Pencil, Trash2 } from 'lucide-react';
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
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/toast';

import { useDeleteProductionLine, useUpdateProductionLine } from '@/hooks';
import type { IProductionLine, IUpdateProductionLine } from '@/interface';

interface GetAllProductionLinesProps {
    data: IProductionLine[];
}

type ProductionLineFormFields = Pick<
    IProductionLine,
    'name' | 'code' | 'description' | 'targetOutput'
>;

const GetAllProductionLines = ({ data }: GetAllProductionLinesProps) => {
    const { mutate: updateProductionLine, isPending: isUpdating } =
        useUpdateProductionLine();

    const { mutate: deleteProductionLine, isPending: isDeleting } =
        useDeleteProductionLine();

    const [selectedProductionLine, setSelectedProductionLine] =
        useState<IProductionLine | null>(null);

    const [updateOpen, setUpdateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleUpdate = (productionLine: IProductionLine) => {
        setSelectedProductionLine({ ...productionLine });
        setUpdateOpen(true);
    };

    const handleDelete = (productionLine: IProductionLine) => {
        setSelectedProductionLine(productionLine);
        setDeleteOpen(true);
    };

    const handleConfirmUpdate = () => {
        if (!selectedProductionLine) return;

        const payload: IUpdateProductionLine = {
            id: selectedProductionLine.id,
            name: selectedProductionLine.name,
            code: selectedProductionLine.code,
            description: selectedProductionLine.description,
            targetOutput: selectedProductionLine.targetOutput,
        };

        updateProductionLine(payload, {
            onSuccess: (res) => {
                toast.add({
                    title: 'Production Line Updated',
                    description:
                        res.message ||
                        'The production line has been updated successfully.',
                    type: 'success',
                });

                setUpdateOpen(false);
                setSelectedProductionLine(null);
            },
            onError: (error) => {
                toast.add({
                    title: 'Update Failed',
                    description:
                        error instanceof Error
                            ? error.message
                            : 'Failed to update the production line.',
                    type: 'error',
                });
            },
        });
    };

    const handleConfirmDelete = () => {
        if (!selectedProductionLine) return;

        deleteProductionLine(selectedProductionLine.id, {
            onSuccess: (res) => {
                toast.add({
                    title: 'Production Line Deleted',
                    description:
                        res.message ||
                        'The production line has been deleted successfully.',
                    type: 'success',
                });

                setDeleteOpen(false);
                setSelectedProductionLine(null);
            },
            onError: (error) => {
                toast.add({
                    title: 'Delete Failed',
                    description:
                        error instanceof Error
                            ? error.message
                            : 'Failed to delete the production line.',
                    type: 'error',
                });
            },
        });
    };

    const updateField = (
        key: keyof ProductionLineFormFields,
        value: string,
    ) => {
        setSelectedProductionLine((current) =>
            current
                ? {
                      ...current,
                      [key]:
                          key === 'targetOutput'
                              ? value === ''
                                  ? null
                                  : Number(value)
                              : value,
                  }
                : current,
        );
    };

    return (
        <>
            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full min-w-250">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Code</th>
                            <th className="px-4 py-3">Plant</th>
                            <th className="px-4 py-3">Description</th>
                            <th className="px-4 py-3">Target Output</th>
                            <th className="px-4 py-3">Machines</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.length > 0 ? (
                            data.map((productionLine) => (
                                <tr
                                    key={productionLine.id}
                                    className="border-b last:border-0"
                                >
                                    <td className="px-4 py-3 font-medium">
                                        {productionLine.name}
                                    </td>

                                    <td className="px-4 py-3">
                                        {productionLine.code}
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="font-medium">
                                            {productionLine.plant?.name ??
                                                'N/A'}
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            {productionLine.plant?.code ?? ''}
                                        </p>
                                    </td>

                                    <td className="max-w-xs px-4 py-3">
                                        <span className="line-clamp-2">
                                            {productionLine.description ||
                                                'N/A'}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3">
                                        {productionLine.targetOutput ?? 'N/A'}
                                    </td>

                                    <td className="px-4 py-3">
                                        {productionLine._count?.machines ?? 0}
                                    </td>

                                    <td className="px-4 py-3">
                                        <span
                                            className={`font-medium ${
                                                productionLine.status ===
                                                'RUNNING'
                                                    ? 'text-green-600'
                                                    : productionLine.status ===
                                                        'STOPPED'
                                                      ? 'text-red-600'
                                                      : productionLine.status ===
                                                          'IDLE'
                                                        ? 'text-gray-500'
                                                        : productionLine.status ===
                                                            'MAINTENANCE'
                                                          ? 'text-yellow-600'
                                                          : 'text-orange-600'
                                            }`}
                                        >
                                            {productionLine.status}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    handleUpdate(productionLine)
                                                }
                                            >
                                                <Pencil className="mr-1 size-4" />
                                                Update
                                            </Button>

                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    handleDelete(productionLine)
                                                }
                                            >
                                                <Trash2 className="mr-1 size-4" />
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="px-4 py-8 text-center text-gray-500"
                                >
                                    No production lines found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Update Production Line Dialog */}
            <Dialog
                open={updateOpen}
                onOpenChange={(open) => {
                    if (isUpdating) return;

                    setUpdateOpen(open);

                    if (!open) {
                        setSelectedProductionLine(null);
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Production Line</DialogTitle>
                        <DialogDescription>
                            Update the production line information below.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedProductionLine && (
                        <div className="space-y-4">
                            {(
                                [
                                    ['name', 'Production Line Name'],
                                    ['code', 'Production Line Code'],
                                    ['description', 'Description'],
                                    ['targetOutput', 'Target Output'],
                                ] as const
                            ).map(([key, label]) => (
                                <div key={key} className="space-y-2">
                                    <Label htmlFor={`production-line-${key}`}>
                                        {label}
                                    </Label>

                                    <Input
                                        id={`production-line-${key}`}
                                        type={
                                            key === 'targetOutput'
                                                ? 'number'
                                                : 'text'
                                        }
                                        min={
                                            key === 'targetOutput'
                                                ? 0
                                                : undefined
                                        }
                                        value={
                                            selectedProductionLine[key] ?? ''
                                        }
                                        onChange={(event) =>
                                            updateField(key, event.target.value)
                                        }
                                        placeholder={`Enter ${label.toLowerCase()}`}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    <DialogFooter>
                        <DialogClose
                            render={
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={isUpdating}
                                >
                                    Cancel
                                </Button>
                            }
                        />

                        <Button
                            type="button"
                            onClick={handleConfirmUpdate}
                            disabled={isUpdating || !selectedProductionLine}
                        >
                            {isUpdating
                                ? 'Updating...'
                                : 'Update Production Line'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteOpen}
                onOpenChange={(open) => {
                    if (isDeleting) return;

                    setDeleteOpen(open);

                    if (!open) {
                        setSelectedProductionLine(null);
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Production Line</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete{' '}
                            <strong>{selectedProductionLine?.name}</strong>?
                            This action may affect related production data.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <DialogClose
                            render={
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={isDeleting}
                                >
                                    Cancel
                                </Button>
                            }
                        />

                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleConfirmDelete}
                            disabled={isDeleting || !selectedProductionLine}
                        >
                            {isDeleting
                                ? 'Deleting...'
                                : 'Delete Production Line'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GetAllProductionLines;

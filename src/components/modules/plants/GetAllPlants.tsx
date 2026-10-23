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

import { useDeletePlant, useUpdatePlant } from '@/hooks';
import type { IPlant, IUpdatePlant } from '@/interface';

interface GetAllPlantsProps {
    data: IPlant[];
}

type PlantFormFields = Pick<IPlant, 'name' | 'code' | 'location' | 'timezone'>;

const GetAllPlants = ({ data }: GetAllPlantsProps) => {
    const { mutate: updatePlant, isPending: isUpdating } = useUpdatePlant();

    const { mutate: deletePlant, isPending: isDeleting } = useDeletePlant();

    const [selectedPlant, setSelectedPlant] = useState<IPlant | null>(null);

    const [updateOpen, setUpdateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleUpdate = (plant: IPlant) => {
        setSelectedPlant({ ...plant });
        setUpdateOpen(true);
    };

    const handleDelete = (plant: IPlant) => {
        setSelectedPlant(plant);
        setDeleteOpen(true);
    };

    const handleConfirmUpdate = () => {
        if (!selectedPlant) return;

        const payload: IUpdatePlant = {
            id: selectedPlant.id,
            name: selectedPlant.name,
            code: selectedPlant.code,
            location: selectedPlant.location,
            timezone: selectedPlant.timezone,
        };

        updatePlant(payload, {
            onSuccess: (res) => {
                toast.add({
                    title: 'Plant Updated',
                    description:
                        res.message ||
                        'The plant has been updated successfully.',
                    type: 'success',
                });

                setUpdateOpen(false);
                setSelectedPlant(null);
            },
            onError: (error) => {
                toast.add({
                    title: 'Update Failed',
                    description:
                        error instanceof Error
                            ? error.message
                            : 'Failed to update the plant.',
                    type: 'error',
                });
            },
        });
    };

    const handleConfirmDelete = () => {
        if (!selectedPlant) return;

        deletePlant(selectedPlant.id, {
            onSuccess: (res) => {
                toast.add({
                    title: 'Plant Deleted',
                    description:
                        res.message ||
                        'The plant has been deleted successfully.',
                    type: 'success',
                });

                setDeleteOpen(false);
                setSelectedPlant(null);
            },
            onError: (error) => {
                toast.add({
                    title: 'Delete Failed',
                    description:
                        error instanceof Error
                            ? error.message
                            : 'Failed to delete the plant.',
                    type: 'error',
                });
            },
        });
    };

    const updateField = (key: keyof PlantFormFields, value: string) => {
        setSelectedPlant((current) =>
            current
                ? {
                      ...current,
                      [key]: value,
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
                            <th className="px-4 py-3">Location</th>
                            <th className="px-4 py-3">Organization</th>
                            <th className="px-4 py-3">Manager</th>
                            <th className="px-4 py-3">Machines</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.length > 0 ? (
                            data.map((plant) => (
                                <tr
                                    key={plant.id}
                                    className="border-b last:border-0"
                                >
                                    <td className="px-4 py-3 font-medium">
                                        {plant.name}
                                    </td>

                                    <td className="px-4 py-3">{plant.code}</td>

                                    <td className="px-4 py-3">
                                        {plant.location}
                                    </td>

                                    <td className="px-4 py-3">
                                        {plant.organization?.name ?? 'N/A'}
                                    </td>

                                    <td className="px-4 py-3">
                                        {plant.manager?.name ?? 'Unassigned'}
                                    </td>

                                    <td className="px-4 py-3">
                                        {plant._count?.machines ?? 0}
                                    </td>

                                    <td className="px-4 py-3">
                                        <span
                                            className={`font-medium ${
                                                plant.status === 'ACTIVE'
                                                    ? 'text-green-600'
                                                    : plant.status ===
                                                        'MAINTENANCE'
                                                      ? 'text-yellow-600'
                                                      : plant.status ===
                                                          'INACTIVE'
                                                        ? 'text-gray-500'
                                                        : 'text-red-600'
                                            }`}
                                        >
                                            {plant.status}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    handleUpdate(plant)
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
                                                    handleDelete(plant)
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
                                    No plants found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Update Plant Dialog */}
            <Dialog
                open={updateOpen}
                onOpenChange={(open) => {
                    if (isUpdating) return;

                    setUpdateOpen(open);

                    if (!open) {
                        setSelectedPlant(null);
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Plant</DialogTitle>
                        <DialogDescription>
                            Update the plant information below.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedPlant && (
                        <div className="space-y-4">
                            {(
                                [
                                    ['name', 'Plant Name'],
                                    ['code', 'Plant Code'],
                                    ['location', 'Location'],
                                    ['timezone', 'Timezone'],
                                ] as const
                            ).map(([key, label]) => (
                                <div key={key} className="space-y-2">
                                    <Label htmlFor={`plant-${key}`}>
                                        {label}
                                    </Label>

                                    <Input
                                        id={`plant-${key}`}
                                        value={selectedPlant[key] ?? ''}
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
                            disabled={isUpdating || !selectedPlant}
                        >
                            {isUpdating ? 'Updating...' : 'Update Plant'}
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
                        setSelectedPlant(null);
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Plant</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete{' '}
                            <strong>{selectedPlant?.name}</strong>? This action
                            may affect related production data.
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
                            disabled={isDeleting || !selectedPlant}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete Plant'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GetAllPlants;

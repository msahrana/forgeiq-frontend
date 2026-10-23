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

import { useDeleteOrganization, useUpdateOrganization } from '@/hooks';

import { IOrganization } from '@/interface';

interface GetAllOrganizationsProps {
    data: IOrganization[];
}

const GetAllOrganizations = ({ data }: GetAllOrganizationsProps) => {
    const { mutate: updateOrganization, isPending: isUpdating } =
        useUpdateOrganization();

    const { mutate: deleteOrganization, isPending: isDeleting } =
        useDeleteOrganization();

    const [selectedOrganization, setSelectedOrganization] =
        useState<IOrganization | null>(null);

    const [updateOpen, setUpdateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleUpdate = (organization: IOrganization) => {
        setSelectedOrganization({ ...organization });
        setUpdateOpen(true);
    };

    const handleDelete = (organization: IOrganization) => {
        setSelectedOrganization(organization);
        setDeleteOpen(true);
    };

    const handleConfirmUpdate = () => {
        if (!selectedOrganization) return;

        updateOrganization(
            {
                id: selectedOrganization.id,
                name: selectedOrganization.name,
                slug: selectedOrganization.slug,
                logo: selectedOrganization.logo,
                industry: selectedOrganization.industry,
                country: selectedOrganization.country,
                timezone: selectedOrganization.timezone,
            },
            {
                onSuccess: (res) => {
                    toast.add({
                        title: 'Organization Updated',
                        description:
                            res.message ||
                            'The organization has been updated successfully.',
                        type: 'success',
                    });

                    setUpdateOpen(false);
                    setSelectedOrganization(null);
                },
                onError: (error) => {
                    toast.add({
                        title: 'Update Failed',
                        description:
                            error instanceof Error
                                ? error.message
                                : 'Failed to update the organization.',
                        type: 'error',
                    });
                },
            },
        );
    };

    const handleConfirmDelete = () => {
        if (!selectedOrganization) return;

        deleteOrganization(selectedOrganization.id, {
            onSuccess: (res) => {
                toast.add({
                    title: 'Organization Deleted',
                    description:
                        res.message ||
                        'The organization has been deleted successfully.',
                    type: 'success',
                });

                setDeleteOpen(false);
                setSelectedOrganization(null);
            },
            onError: (error) => {
                toast.add({
                    title: 'Delete Failed',
                    description:
                        error instanceof Error
                            ? error.message
                            : 'Failed to delete the organization.',
                    type: 'error',
                });
            },
        });
    };

    return (
        <>
            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Slug</th>
                            <th className="px-4 py-3">Industry</th>
                            <th className="px-4 py-3">Country</th>
                            <th className="px-4 py-3">Owner</th>
                            <th className="px-4 py-3">Members</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.length > 0 ? (
                            data.map((organization) => (
                                <tr key={organization.id} className="border-b">
                                    <td className="px-4 py-3 font-medium">
                                        {organization.name}
                                    </td>

                                    <td className="px-4 py-3">
                                        {organization.slug}
                                    </td>

                                    <td className="px-4 py-3">
                                        {organization.industry || 'N/A'}
                                    </td>

                                    <td className="px-4 py-3">
                                        {organization.country || 'N/A'}
                                    </td>

                                    <td className="px-4 py-3">
                                        {organization.owner?.name ?? 'N/A'}
                                    </td>

                                    <td className="px-4 py-3">
                                        {organization._count?.members ?? 0}
                                    </td>

                                    <td className="px-4 py-3">
                                        <span
                                            className={`font-medium ${
                                                organization.status === 'ACTIVE'
                                                    ? 'text-green-600'
                                                    : organization.status ===
                                                        'TRIAL'
                                                      ? 'text-yellow-600'
                                                      : 'text-red-600'
                                            }`}
                                        >
                                            {organization.status}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    handleUpdate(organization)
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
                                                    handleDelete(organization)
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
                                    No organizations found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Update Organization Dialog */}
            <Dialog
                open={updateOpen}
                onOpenChange={(open) => {
                    if (isUpdating) return;

                    setUpdateOpen(open);

                    if (!open) {
                        setSelectedOrganization(null);
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Organization</DialogTitle>
                        <DialogDescription>
                            Update the organization information.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedOrganization && (
                        <div className="space-y-4">
                            {(
                                [
                                    ['name', 'Organization Name'],
                                    ['slug', 'Organization Slug'],
                                    ['industry', 'Industry'],
                                    ['country', 'Country'],
                                    ['timezone', 'Timezone'],
                                    ['logo', 'Logo URL'],
                                ] as const
                            ).map(([key, label]) => (
                                <div key={key} className="space-y-2">
                                    <Label htmlFor={`organization-${key}`}>
                                        {label}
                                    </Label>

                                    <Input
                                        id={`organization-${key}`}
                                        type={key === 'logo' ? 'url' : 'text'}
                                        value={selectedOrganization[key] ?? ''}
                                        onChange={(event) => {
                                            setSelectedOrganization(
                                                (current) =>
                                                    current
                                                        ? {
                                                              ...current,
                                                              [key]: event
                                                                  .target.value,
                                                          }
                                                        : current,
                                            );
                                        }}
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
                            disabled={isUpdating || !selectedOrganization}
                        >
                            {isUpdating ? 'Updating...' : 'Update Organization'}
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
                        setSelectedOrganization(null);
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Organization</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete{' '}
                            <strong>{selectedOrganization?.name}</strong>? This
                            action cannot be undone.
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
                            disabled={isDeleting || !selectedOrganization}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete Organization'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GetAllOrganizations;

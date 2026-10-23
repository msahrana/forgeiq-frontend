'use client';

import { Dispatch, SetStateAction, Suspense, useState } from 'react';

import RoleGuard from '@/components/auth/role-guard';
import CreateOrganization from '@/components/modules/organizations/CreateOrganization';
import GetAllOrganizations from '@/components/modules/organizations/GetAllOrganizations';
import SearchInput from '@/components/shared/SearchInput';
import TablePagination from '@/components/ui/table-pagination';
import { useSuspenseGetAllOrganizations } from '@/hooks';
import useDebounce from '@/hooks/debounce.hook';

type OrganizationsListProps = {
    searchTerm: string;
    page: number;
    onPageChange: Dispatch<SetStateAction<number>>;
};

function OrganizationsList({
    searchTerm,
    page,
    onPageChange,
}: OrganizationsListProps) {
    const { data } = useSuspenseGetAllOrganizations({
        searchTerm,
        page,
        limit: 5,
    });

    const organizations = data.data.data;
    const totalPages = data.data.meta.totalPages;

    return (
        <>
            {organizations.length > 0 ? (
                <GetAllOrganizations data={organizations} />
            ) : (
                <p className="py-10 text-center text-muted-foreground">
                    No organizations found.
                </p>
            )}

            {totalPages > 1 && (
                <div className="my-5">
                    <TablePagination
                        page={page}
                        totalPages={totalPages}
                        handlePageChange={onPageChange}
                    />
                </div>
            )}
        </>
    );
}

function OrganizationsContent() {
    const [searchInput, setSearchInput] = useState('');
    const [page, setPage] = useState(1);

    const searchTerm = useDebounce(searchInput, 500);

    const handleSearch = (value: string) => {
        setSearchInput(value);
        setPage(1);
    };

    return (
        <div className="mt-10 p-6">
            <div className="mb-6 flex flex-wrap items-center gap-4">
                <h1 className="text-2xl font-bold">All Organizations</h1>

                <div className="ml-auto">
                    <SearchInput
                        value={searchInput}
                        onChange={handleSearch}
                        placeholder="Search by Name or Slug..."
                    />
                </div>

                <CreateOrganization />
            </div>

            <Suspense>
                <OrganizationsList
                    searchTerm={searchTerm}
                    page={page}
                    onPageChange={setPage}
                />
            </Suspense>
        </div>
    );
}

export default function Organizations() {
    return (
        <RoleGuard
            roles={[
                'SUPER_ADMIN',
                'ORG_OWNER',
                'FACTORY_MANAGER',
                'PRODUCTION_MANAGER',
                'MAINTENANCE_ENGINEER',
            ]}
        >
            <OrganizationsContent />
        </RoleGuard>
    );
}

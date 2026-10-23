'use client';

import { Dispatch, SetStateAction, Suspense, useState } from 'react';

import RoleGuard from '@/components/auth/role-guard';
import CreatePlant from '@/components/modules/plants/CreatePlant';
import GetAllPlants from '@/components/modules/plants/GetAllPlants';
import SearchInput from '@/components/shared/SearchInput';
import TablePagination from '@/components/ui/table-pagination';

import useDebounce from '@/hooks/debounce.hook';
import { useSuspenseGetAllPlants } from '@/hooks/plant.hook';

type PlantsListProps = {
    searchTerm: string;
    page: number;
    onPageChange: Dispatch<SetStateAction<number>>;
};


function PlantsList({
    searchTerm,
    page,
    onPageChange,
}: PlantsListProps) {
    const { data } = useSuspenseGetAllPlants({
        search: searchTerm,
        page,
        limit: 5,
    });

    const plants = data.data;
    const totalPages = data.meta.totalPages;

    return (
        <>
            {plants.length > 0 ? (
                <GetAllPlants data={plants} />
            ) : (
                <p className="py-10 text-center text-muted-foreground">
                    No plants found.
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


function PlantsContent() {
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
                <h1 className="text-2xl font-bold">All Plants</h1>

                <div className="ml-auto">
                    <SearchInput
                        value={searchInput}
                        onChange={handleSearch}
                        placeholder="Search by Name, Code, or Location..."
                    />
                </div>

                <CreatePlant />
            </div>

            <Suspense
                fallback={
                    <p className="py-10 text-center text-muted-foreground">
                        Loading plants...
                    </p>
                }
            >
                <PlantsList
                    searchTerm={searchTerm}
                    page={page}
                    onPageChange={setPage}
                />
            </Suspense>
        </div>
    );
}

export default function Plants() {
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
            <PlantsContent />
        </RoleGuard>
    );
}

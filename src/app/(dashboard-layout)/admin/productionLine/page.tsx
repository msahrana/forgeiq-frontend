'use client';

import { Dispatch, SetStateAction, Suspense, useState } from 'react';

import RoleGuard from '@/components/auth/role-guard';

import SearchInput from '@/components/shared/SearchInput';
import TablePagination from '@/components/ui/table-pagination';

import useDebounce from '@/hooks/debounce.hook';
import { useSuspenseGetAllProductionLines } from '@/hooks';
import GetAllProductionLines from '@/components/modules/productionLines/GetAllProductionLines';
import CreateProductionLine from '@/components/modules/productionLines/CreateProductionLine';

type ProductionLinesListProps = {
    searchTerm: string;
    page: number;
    onPageChange: Dispatch<SetStateAction<number>>;
};

function ProductionLinesList({
    searchTerm,
    page,
    onPageChange,
}: ProductionLinesListProps) {
    const { data } = useSuspenseGetAllProductionLines({
        searchTerm,
        page,
        limit: 5,
    });

    const productionLines = data.data.data;
    const totalPages = data.data.meta.totalPages;

    return (
        <>
            {productionLines.length > 0 ? (
                <GetAllProductionLines data={productionLines} />
            ) : (
                <p className="py-10 text-center text-muted-foreground">
                    No production lines found.
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

function ProductionLinesContent() {
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
                <h1 className="text-2xl font-bold">All Production Lines</h1>

                <div className="ml-auto">
                    <SearchInput
                        value={searchInput}
                        onChange={handleSearch}
                        placeholder="Search by Name or Code..."
                    />
                </div>

                <CreateProductionLine />
            </div>

            <Suspense
                fallback={
                    <p className="py-10 text-center text-muted-foreground">
                        Loading production lines...
                    </p>
                }
            >
                <ProductionLinesList
                    searchTerm={searchTerm}
                    page={page}
                    onPageChange={setPage}
                />
            </Suspense>
        </div>
    );
}

export default function ProductionLine() {
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
            <ProductionLinesContent />
        </RoleGuard>
    );
}

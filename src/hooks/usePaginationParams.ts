import { useSearchParams } from "react-router-dom";

type PaginationParams = {
    defaultPageNumber?: number;
    defaultPageSize?: number;
};

export function usePaginationParams(paginationParams?: PaginationParams) {
    const [searchParams, setSearchParams] = useSearchParams();

    const { defaultPageNumber = 1, defaultPageSize = 10 } = paginationParams ?? {};

    const pageNumber = parseInt(searchParams.get("pageNumber") ?? `${defaultPageNumber}`, 10);
    const pageSize = parseInt(searchParams.get("pageSize") ?? `${defaultPageSize}`, 10);

    const setPageNumber = (newPageNumber: number) => {
        searchParams.set("pageNumber", `${newPageNumber}`);
        setSearchParams(searchParams);
    };

    const setPageSize = (newPageSize: number) => {
        searchParams.set("pageSize", `${newPageSize}`);
        setSearchParams(searchParams);
    };

    const resetPagination = () => {
        searchParams.set("pageNumber", `${defaultPageNumber}`);
        searchParams.set("pageSize", `${defaultPageSize}`);
        setSearchParams(searchParams);
    };

    return {
        pageNumber,
        pageSize,
        setPageNumber,
        setPageSize,
        resetPagination,
    };
}

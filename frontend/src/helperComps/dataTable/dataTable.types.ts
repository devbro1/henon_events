import { ReactNode } from 'react';

export interface __DataTableProps {
    columns: __DataTableColumnType[];
    data: any[];
    onChange: Function;
    page: number;
    pageSize: number;
    pageCount: number;
    from: number;
    to: number;
    total: number;
    isLoading?: boolean;
    paginationSizes: [];
    sort: string;
    sortDirection: string;
    defautlFilters?: any;
}

export interface __DataTableRefType {
    update: () => void;
    defaultProps: any;
}

export interface __DataTableColumnType {
    title: string;
    sortable?: boolean;
    field: string;
    value: (row: any) => ReactNode | string;
    stringContent?: (obj: any) => string;
    filter: boolean | Function;
    className?: string;
}

export interface __DataTableSearchType {
    [k: number]: string | undefined;
}

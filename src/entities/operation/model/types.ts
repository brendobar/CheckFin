import {Table} from "@/widgets/tables";
import {OperationCategories} from "@/entities/category";


export type Operation = {
    id: number;
    date: Date;
    name: string;
    value: number;
    type: string;
    categories: OperationCategories[];
    comment?: string | null;
    tableId: string;
    table: Table;
    createdAt: Date;
}

export type OperationCreateRequest = {
    name: string;
    value: number;
    type: string;
    categories?: string[];
    comment?: string;
    tableId: string;
    date: string;
};

export type OperationUpdateRequest = {
    userId: string;
    id: number;
    name?: string;
    value?: number;
    type?: string;
    categories?: string[];
    comment?: string;
    date?: string;
};


export type OperationsByTypeRequest = {
    tableId: string,
    type: 'доход' | 'расход'
}
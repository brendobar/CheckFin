import {Table} from "@/widgets/tables";

export type Operation = {
    id: number,
    date: Date,
    name: string,
    value: number,
    type: string,
    categories?: string,
    comment?: string,
    tableId: string,
    table: Table
    createdAt: Date
}


export type OperationUpdateRequest = {
    id: number
    body: Partial<{
        date: Date,
        name: string,
        value: number,
        type: string,
        categories?: string,
        comment?: string,
    }>
}
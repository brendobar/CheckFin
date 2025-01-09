import {User} from "@/entities/user";

export type Table = {
    id: string,
    name: string,
    userId: string,
    user: User,
    operations: Operations[],
    balance: number

}

export type Operations = {
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


export type createTableRequest = {
    userId: string,
    name: string
}
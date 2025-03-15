import {User} from "@/entities/user";
import {Operation} from "@/entities/operation";

export type Table = {
    id: string,
    name: string,
    userId: string,
    user: User,
    operations: Operation[],
    balance: number
    primary: boolean
}


export type createTableRequest = {
    userId: string,
    name: string
}
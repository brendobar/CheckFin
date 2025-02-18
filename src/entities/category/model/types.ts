import {User} from "@/entities/user";
import {Operation} from "@/entities/operation";


export interface Category {
    id: string;
    name: string;
    userId?: string | null;
    user?: User | null;
    operations: OperationCategories[];
    limit?: number | null;
    createdAt: Date;
}


export interface OperationCategories {
    operationId: number;
    operation: Operation;
    categoryId: string;
    category: Category;
}
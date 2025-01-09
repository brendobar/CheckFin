export interface User {
    id: string;
    name?: string | null;
    email: string;
    password?: string | null;
    emailVerified?: Date | null;
    image?: string | null;
    accounts: Account[];
    operations: Operations[];
    balance: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Operations {
    id: number;
    date: Date;
    name: string;
    value: number;
    type: string;
    categories?: string | null;
    comment?: string | null;
    user_id: string;
    user: User;
}

export interface Account {
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}
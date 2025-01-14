import {apiSlice} from "@/shared/redux/appApi";


const uri = '/api/tables'

export const tablesSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTables: builder.query({
            query: (userId: string) => `${uri}?userId=${userId}`,
            providesTags: ['tables'],
        }),
        getTable: builder.query({
            query: ( tableId) => `${uri}?tableId=${tableId}`,
        }),
        createTable: builder.mutation({
            query: ({ userId, tableName }: { userId: string; tableName: string }) => ({
                url: `${uri}`,
                method: 'POST',
                body: { userId, tableName },
            }),
            invalidatesTags: ['tables'],
        }),
        deleteTable: builder.mutation({
            query: ( tableId: string ) => ({
                url: `${uri}/delete?tableId=${tableId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['tables'],
        }),
    }),
})


export const { useGetTablesQuery, useGetTableQuery, useCreateTableMutation, useDeleteTableMutation } = tablesSlice;


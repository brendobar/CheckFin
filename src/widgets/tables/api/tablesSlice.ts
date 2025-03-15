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
            query: ({ userId, tableName, primary }: { userId: string; tableName: string; primary?: boolean }) => ({
                url: `${uri}`,
                method: 'POST',
                body: { userId, tableName, primary },
            }),
            invalidatesTags: ['tables'],
        }),
        updateTable: builder.mutation({
            query: ({ tableId, name, primary, userId }) => ({
                url: `${uri}`,
                method: "PATCH",
                body: { tableId, name, primary, userId },
            }),
            invalidatesTags: ['tables', 'user'],
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


export const { useGetTablesQuery, useGetTableQuery, useCreateTableMutation, useUpdateTableMutation, useDeleteTableMutation } = tablesSlice;


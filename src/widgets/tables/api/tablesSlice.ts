import {apiSlice} from "@/shared/redux/appApi";


const uri = '/api/tables'

export const tablesSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTables: builder.query({
            query: (userId: string) => `${uri}?userId=${userId}`,
            providesTags: ['tables'],
        }),
        createTable: builder.mutation({
            query: ({ userId, tableName }: { userId: string; tableName: string }) => ({
                url: `${uri}`,
                method: 'POST',
                body: { userId, tableName },
            }),
            invalidatesTags: ['tables'],
        }),
    }),
})


export const { useGetTablesQuery, useCreateTableMutation } = tablesSlice;


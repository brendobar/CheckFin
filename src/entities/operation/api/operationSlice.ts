import {apiSlice} from "@/shared/redux/appApi";
import {OperationUpdateRequest} from "@/entities/operation/model/types";

const uri = '/api/operations'

export const operationSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOperations: builder.query({
            query: (tableId: string) => `${uri}?tableId=${tableId}`,
            providesTags: ['operation'],
        }),
        createOperation: builder.mutation({
            query: ({ name, value, type, categories, comment, tableId, date }) => ({
                url: `${uri}`,
                method: "POST",
                body: { name, value, type, categories, comment, tableId, date },
            }),
            invalidatesTags: ['operation'],
        }),
        updateOperation: builder.mutation<void, OperationUpdateRequest>({
            query: ({ id, body }) => ({
                url: `${uri}?id=${id}`,
                method: 'PATCH',
                body: {
                    ...body,
                },
            }),
            invalidatesTags: ['operation'],
        }),
        deleteOperation: builder.mutation({
            query: (id: number) => ({
                url: `${uri}?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['operation'],
        }),
    }),
});

export const {
    useGetOperationsQuery,
    useCreateOperationMutation,
    useUpdateOperationMutation,
    useDeleteOperationMutation,
} = operationSlice;
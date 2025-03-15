import {apiSlice} from "@/shared/redux/appApi";
import {
    OperationCreateRequest,
    OperationsByTypeRequest,
    OperationUpdateRequest
} from "@/entities/operation/model/types";

const uri = '/api/operations'

export const operationSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOperations: builder.query({
            query: (tableId: string) => `${uri}?tableId=${tableId}`,
            providesTags: ['operation'],
        }),
        getOperationsByType: builder.query({
            query: ({tableId, type}: OperationsByTypeRequest) => `${uri}?tableId=${tableId}&type=${type}`,
            providesTags: ['operation'],
        }),
        createOperation: builder.mutation<void, OperationCreateRequest>({
            query: (body) => ({
                url: `${uri}`,
                method: "POST",
                body
            }),
            invalidatesTags: ['operation', 'tables', 'user'],
        }),
        updateOperation: builder.mutation<void, OperationUpdateRequest>({
            query: ({ id, ...body }) => ({
                url: `${uri}?id=${id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['operation', 'tables', 'user'],
        }),
        deleteOperation: builder.mutation({
            query: (id: number) => ({
                url: `${uri}?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['operation', 'tables', 'user'],
        }),
    }),
});

export const {
    useGetOperationsQuery,
    useGetOperationsByTypeQuery,
    useCreateOperationMutation,
    useUpdateOperationMutation,
    useDeleteOperationMutation,
} = operationSlice;




import {apiSlice} from "@/shared/redux/appApi";

const uri = '/api/categories'

export const categorySlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategorys: builder.query({
            query: (userId?: string | undefined ) => {
                const queryString = userId ? `?userId=${userId}` : '';
                return `${uri}${queryString}`;
            },
            providesTags: ['сategory'],
        }),
        createCategory: builder.mutation({
            query: ({ userId, name}) => ({
                url: `${uri}`,
                method: "POST",
                body: { userId, name },
            }),
            invalidatesTags: ['сategory'],
        }),
        deleteCategory: builder.mutation({
            query: (id: number) => ({
                url: `${uri}?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['сategory'],
        }),
    }),
});

export const {
    useGetCategorysQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
} = categorySlice;
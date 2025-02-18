import {apiSlice} from "@/shared/redux/appApi";

const uri = '/api/categories'

export const categorySlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: (userId?: string | undefined ) => {
                const queryString = userId ? `?userId=${userId}` : '';
                return `${uri}${queryString}`;
            },
            providesTags: ['category'],
        }),
        createCategory: builder.mutation({
            query: ({ userId, name}) => ({
                url: `${uri}`,
                method: "POST",
                body: { userId, name },
            }),
            invalidatesTags: ['category'],
        }),
        deleteCategory: builder.mutation({
            query: (id: number) => ({
                url: `${uri}?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['category'],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
} = categorySlice;
import { apiSlice } from '@/shared/redux/appApi';
import { User } from '@/entities/user';

export const userSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserById: builder.query<User, string>({
            query: (id) => `/api/user/${id}`,
            providesTags: ['user'],
        }),
        updateUser: builder.mutation<User, { id: string; data: Partial<User> }>({
            query: ({ id, data }) => ({
                url: `/api/user/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['user'],
        }),
    }),
});

export const { useGetUserByIdQuery, useUpdateUserMutation } = userSlice;

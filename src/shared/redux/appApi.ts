import { fetchBaseQuery, retry } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: '',
})

const staggeredBaseQuery = retry(baseQuery, {
    maxRetries: 1,
})

export const apiSlice = createApi({
    baseQuery: staggeredBaseQuery,
    endpoints: () => ({}),
    tagTypes: [
        'user',
        'tables',
        'operation',
        'category'
    ],
});

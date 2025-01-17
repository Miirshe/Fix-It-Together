import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import BASE_URL from './BaseUrl'
import Cookies from 'js-cookie';
const getToken = () => {
    return Cookies.get("token");
}
export const FixSlice = createApi({
    // setup
    reducerPath: "FixSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (Headers) => {
            const result = getToken();
            if (result) {
                Headers.set("Authorization", `Bearer ${result}`);
            }
            return Headers;
        }
    }),
    tagTypes: ["issues"],
    endpoints: (builder) => ({
        FetchIssue: builder.query({
            query: () => {
                return {
                    url: '/issues',
                    method: 'GET'
                }
            },
            providesTags: ["issues"]
        }),
        // Add Issue
        AddIssue: builder.mutation({
            query: (newIssue) => ({
                url: "/issues",
                method: "POST",
                body: newIssue,
            }),
            invalidatesTags: ["issues"]
        }),
        // Update Issue
        updateIssue: builder.mutation({
            query: ({ id, updatedIssue }) => ({
                url: `/issues/${id}`,
                method: 'PUT',
                body: updatedIssue,
            }),
            invalidatesTags: ['issues'],
        }),
        deleteIssue: builder.mutation({
            query: (id) => ({
                url: `/issues/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["issues"]
        }),
        upvotes: builder.mutation({
            query: (data) => ({
                url: `'/api/issues/${data.id}/upvote`,
                method: 'POST'
            }),
            invalidatesTags: ["issues"]
        }),
        downVotes: builder.mutation({
            query: (data) => ({
                url: `/api/issues/${data.id}/downvote`,
                method: 'POST'
            }),
            invalidatesTags: ["issues"]
        })
    })
})

export const { useFetchIssueQuery, useAddIssueMutation, useUpdateIssueMutation, useDeleteIssueMutation, useDownVotesMutation, useUpvotesMutation } = FixSlice;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../../Config";

export const postSlice = createApi({
  reducerPath: "post",
  tagTypes: ["post"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    // Create Posts
    createPost: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/post/${id}/create-post`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["post"],
    }),
    //   get Post By Id
    getUserPosts: builder.query({
      query: (id) => {
        return {
          url: `/post/get-posts/${id}`,
          method: "GET",
        };
      },
      providesTags: ["post"],
    }),
    //get single Posts
    getSinglePost: builder.query({
      query: (id) => {
        return {
          url: `/post/get_single_post/${id}`,
          method: "GET",
        };
      },
      providesTags: ["post"],
    }),
    getAllPosts: builder.query({
      query: (userID) => {
        return {
          url: `/post/${userID}/all-posts`,
          method: "GET",
        };
      },
      providesTags: ["post"],
    }),
    //   edit Posts by Id
    editPost: builder.mutation({
      query: ({ _author_id, Post_Id, data }) => {
        return {
          url: `/post/${_author_id}/edit-posts/${Post_Id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["post"],
    }),
    // delete Posts
    deletePost: builder.mutation({
      query: ({ _author_id, Post_Id }) => {
        return {
          url: `/post/${_author_id}/delete-posts/${Post_Id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["post"],
    }),

    // like Posts
    likePost: builder.mutation({
      query: ({ _user_id, Post_Id }) => {
        return {
          url: `/post/${_user_id}/like/${Post_Id}`,
          method: "POST",
        };
      },
      invalidatesTags: ["post"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useEditPostMutation,
  useGetAllPostsQuery,
  useGetUserPostsQuery,
  useLikePostMutation,
  useGetSinglePostQuery,
} = postSlice;

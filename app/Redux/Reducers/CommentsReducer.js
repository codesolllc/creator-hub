import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../../Config";

export const commentsSlice = createApi({
  reducerPath: "comments",
  tagTypes: ["comment"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    //   Post a comment on posts
    createComment: builder.mutation({
      query: ({ userId, postId, data }) => {
        return {
          url: `/comment/${userId}/posts/${postId}/comments`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["comment"],
    }),
    //   Comment reply
    createCommentReply: builder.mutation({
      query: ({ userId, postId, commentId, data }) => {
        return {
          url: `/comment/${userId}/posts/${postId}/comments/${commentId}/replies`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["comment"],
    }),
    // Delete Comment
    deleteComment: builder.mutation({
      query: ({ userId, postId, commentId }) => {
        return {
          url: `/comment/${userId}/post/${postId}/delete-comments/${commentId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["comment"],
    }),
    // Delete Comment Reply
    deleteCommentReply: builder.mutation({
      query: ({ userId, postId, commentId, replyId }) => {
        return {
          url: `/comment/${userId}/post/${postId}/delete-replies/${commentId}/${replyId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["comment"],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useCreateCommentReplyMutation,
  useDeleteCommentMutation,
  useDeleteCommentReplyMutation,
} = commentsSlice;

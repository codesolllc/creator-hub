import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../../Config";

export const bookmarkSlice = createApi({
  reducerPath: "bookmarks",
  tagTypes: ["bookmarks"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    // Create Posts
    bookMarkPost: builder.mutation({
      query: ({ userID, postID }) => {
        return {
          url: `/bookmarks/${userID}/bookmark-post/${postID}`,
          method: "POST",
        };
      },
      invalidatesTags: ["bookmarks"],
    }),

    //   get bookmarks By UserId
    getUserBookMarks: builder.query({
      query: (userID) => {
        return {
          url: `/bookmarks/saved-posts/${userID}`,
          method: "GET",
        };
      },
      providesTags: ["bookmarks"],
    }),
  }),
});

export const { useBookMarkPostMutation, useGetUserBookMarksQuery } =
  bookmarkSlice;

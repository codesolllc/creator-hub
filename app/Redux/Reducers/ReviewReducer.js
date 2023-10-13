import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../../Config";


export const ReviewSlice = createApi({
  reducerPath: "review",
  tagTypes: ["review"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({

    getCreatorReviews: builder.query({
      query: (creatorID) => {
        return {
          url: `/review/get_creator_reviews/${creatorID}`,
   
       method: "GET",
        };
      },
      providesTags: ["review"],
    }),

    giveCreatorReviews: builder.mutation({
        query: ({creatorID, userID,data}) => {
          return {
            url: `/review/give_Review_to/${creatorID}/by/${userID}`,
            method: "POST",
            body: data
          };
        },
        invalidatesTags: ["review"],
      }),

      deleteCreatorReviews: builder.mutation({
        query: ({reviewID, userID}) => {

          return {
            url: `/review/delete_review/${reviewID}/${userID}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["review"],
      }),
  }),
});


export const { 
    useGetCreatorReviewsQuery, 
    useGiveCreatorReviewsMutation,
    useDeleteCreatorReviewsMutation } = ReviewSlice;
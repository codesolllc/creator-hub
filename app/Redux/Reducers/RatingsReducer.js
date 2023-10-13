import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../../Config";

export const RatingsSlice = createApi({
  reducerPath: "ratings",
  tagTypes: ["ratings"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCreatorRatings: builder.query({
      query: (creatorID) => {
        return {
          url: `/ratings/get_creator_ratings/${creatorID}`,
          method: "GET",
        };
      },
      providesTags: ["ratings"],
    }),

    giveCreatorRatings: builder.mutation({
      query: ({ creatorID, userID, data }) => {
        return {
          url: `/ratings/give_ratings_to/${creatorID}/by/${userID}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["ratings"],
    }),
  }),
});

export const { useGetCreatorRatingsQuery, useGiveCreatorRatingsMutation } =
  RatingsSlice;

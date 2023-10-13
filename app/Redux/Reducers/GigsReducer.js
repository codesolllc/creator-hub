import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../../Config";

export const gigsSlice = createApi({
  reducerPath: "gig",
  tagTypes: ["gig"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),

  endpoints: (builder) => ({
    createGig: builder.mutation({
      query: ({ authorID, data }) => {
        return {
          url: `/gig/create_gig/${authorID}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["gig"],
    }),
    getSingleGig: builder.query({
      query: (gigId) => {
        return {
          url: `/gig/single-gigs/${gigId}`,
          method: "GET",
        };
      },
      providesTags: ["gig"],
    }),
    getUserGig: builder.query({
      query: (authorID) => {
        return {
          url: `/gig/getgigs/${authorID}`,
          method: "GET",
        };
      },
      providesTags: ["gig"],
    }),
    getAllGigs: builder.query({
      query: () => {
        return {
          url: `/gig/allgigs`,
          method: "GET",
        };
      },
      providesTags: ["gig"],
    }),
    updateGig: builder.mutation({
      query: ({ authorID, gigID, data }) => {
        return {
          url: `/gig/update_gigs/${gigID}/${authorID}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["gig"],
    }),
    deleteGig: builder.mutation({
      query: ({ authorID, gigsId }) => {
        return {
          url: `/gig/delete/${authorID}/${gigsId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["gig"],
    }),
    applyForGig: builder.mutation({
      query: ({ creatorID, gigID }) => {
        return {
          url: `/gig/gig_applicants/${creatorID}/${gigID}`,
          method: "POST",
        };
      },
      invalidatesTags: ["gig"],
    }),
    getAppliedApplicants: builder.query({
      query: ({userID, gigID}) => {
        return {
          url: `/gig/applicants_of_gigs/${userID}/${gigID}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useCreateGigMutation,
  useDeleteGigMutation,
  useGetAllGigsQuery,
  useGetUserGigQuery,
  useGetSingleGigQuery,
  useUpdateGigMutation,
  useApplyForGigMutation,
  useGetAppliedApplicantsQuery
} = gigsSlice;

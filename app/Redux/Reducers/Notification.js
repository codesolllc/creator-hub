import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../../Config";

export const notificationSlice = createApi({
  reducerPath: "notification",
  tagTypes: ["notification"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getGigsNotifs: builder.query({
      query: (userID) => {
        return {
          url: `/notifications/${userID}/gig-notifications`,
          method: "GET",
        };
      },
    }),
    getPostNotifs: builder.query({
      query: (userID) => {
        return {
          url: `/notifications/${userID}/post-notifications`,
          method: "GET",
        };
      },
    }),
    getProductNotifs: builder.query({
      query: () => {
        return {
          url: `/notifications/product-notifications`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetGigsNotifsQuery,
  useGetPostNotifsQuery,
  useGetProductNotifsQuery,
} = notificationSlice;

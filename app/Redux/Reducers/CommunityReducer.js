import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../../Config";

export const communitySlice = createApi({
  reducerPath: "community",
  tagTypes: ["community"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getConnections: builder.query({
      query: (user_id) => {
        return {
          url: `/community/get_connections/${user_id}`,
          method: "GET",
        };
      },
      invalidatesTags: ["community"],
    }),
  }),
});

export const { useGetConnectionsQuery } = communitySlice;

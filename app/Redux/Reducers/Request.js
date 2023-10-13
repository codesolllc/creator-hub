import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../../Config";

export const requestSlice = createApi({
  reducerPath: "request",
  tagTypes: ["request", "validator"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    //   Post a comment on posts
    sendReq: builder.mutation({
      query: ({ user_ID, sentTo }) => {
        return {
          url: `/community/send_request/${user_ID}/${sentTo}`,
          method: "POST",
        };
      },
      invalidatesTags: ["request", "validator"],
    }),
    getRequests: builder.query({
      query: (user_id) => {
        return {
          url: `/community/get_requests/${user_id}`,
          method: "GET",
        };
      },
      providesTags: ["request"],
    }),
    rejectReq: builder.mutation({
      query: ({ requestID }) => {
        return {
          url: `/community/reject_user/${requestID}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["request"],
    }),
    acceptReq: builder.mutation({
      query: ({ user_ID, sentTo }) => {
        return {
          url: `/community/accept_request/${user_ID}/${sentTo}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["request"],
    }),
    getConnections: builder.query({
      query: (user_id) => {
        return {
          url: `/community/get_connections/${user_id}`,
          method: "GET",
        };
      },
      invalidatesTags: ["request"],
    }),
    cancelReq: builder.mutation({
      query: ({ userID, sentTo }) => {
        return {
          url: `/community/cancel_request/${userID}/${sentTo}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["request", "validator"],
    }),
    validateReq: builder.query({
      query: ({ userID, sentTo }) => {
        return {
          url: `/community/request_validator/${userID}/${sentTo}`,
          method: "GET",
        };
      },
      providesTags: ["validator"],
    }),
    removeFriend: builder.mutation({
      query: ({userID, reqID}) => {
        return {
          url: `/community/remove-friend/${userID}/${reqID}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useSendReqMutation,
  useGetRequestsQuery,
  useRejectReqMutation,
  useAcceptReqMutation,
  useGetConnectionsQuery,
  useValidateReqQuery,
  useCancelReqMutation,
  useRemoveFriendMutation
} = requestSlice;

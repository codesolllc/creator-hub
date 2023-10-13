import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../../Config";

export const hireSlice = createApi({
  reducerPath: "hire",
  tagTypes: ["hire"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    sendProposals: builder.mutation({
      query: ({ userID, data }) => {
        return {
          url: `/hire/request_for_proposal/${userID}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["hire"],
    }),
    sendQuotation: builder.mutation({
      query: ({ creatorID, proposalID, data }) => {
        return {
          url: `/hire/send_qutation/${proposalID}/${creatorID}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["hire"],
    }),

    getProposals: builder.query({
      query: (creatorID) => {
        return {
          url: `/hire/get_user_proposal/${creatorID}`,
          method: "GET",
        };
      },
      providesTags: ["hire"],
    }),
    getQuations: builder.query({
      query: ({proposalID,userID}) => {
        return {
          url: `/hire/get_qutations/${proposalID}/${userID}`,
          method: "GET",
        };
      },
      providesTags: ["hire"],
    }),
    getProposalsByUserID: builder.query({
      query: (userID) => {
        return {
          url: `/hire/get_proposals/${userID}`,
          method: "GET",
        };
      },
      providesTags: ["hire"],
    }),
    getQuotationsByUserID: builder.query({
      query: (userID) => {
        return {
          url: `/hire//get_qutations_for_users/${userID}`,
          method: "GET",
        };
      },
      providesTags: ["hire"],
    }),
    getQuotationsByCreatorID: builder.query({
      query: (userID) => {
        return {
          url: `/hire/get_qutations_for_creators/${userID}`,
          method: "GET",
        };
      },
      providesTags: ["hire"],
    }),
    declineQuotation: builder.mutation({
      query: ({qutationID,userID}) => {
        return {
          url: `/hire/decline_qutation/${qutationID}/${userID}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["hire"],
    }),
    completeTask: builder.mutation({
      query: ({userID,qutationID}) => {
        return {
          url: `/hire/task_completed/${userID}/${qutationID}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["hire"],
    }),
    notCompleteTask: builder.mutation({
      query: ({userID,qutationID}) => {
        return {
          url: `/hire/task_not_completed/${userID}/${qutationID}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["hire"],
    }),
    deleteQuotationByCreator: builder.mutation({
      query: ({qutationID, creatorID}) => {
        return {
          url: `/hire/delete_qutation/${qutationID}/${creatorID}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["hire"],
    }),
  }),
});

export const {
  useSendProposalsMutation,
  useSendQuotationMutation,
  useDeclineQuotationMutation,
  useCompleteTaskMutation,
  useNotCompleteTaskMutation,
  useDeleteQuotationByCreatorMutation,
  useGetProposalsQuery,
  useGetQuationsQuery,
  useGetQuotationsByUserIDQuery,
  useGetQuotationsByCreatorIDQuery,
  useGetProposalsByUserIDQuery
} = hireSlice;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../../Config";

export const chatSlice = createApi({
  reducerPath: "chat",
  tagTypes: ["chat"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    //   Post a comment on posts
    SendText: builder.mutation({
      query: ({ reqID, message }) => {
        return {
          url: `/chat/send_text/${reqID}`,
          method: "POST",
          body: { message },
        };
      },
      providesTags: ["chat"],
    }),
    getChats: builder.query({
      query: ({ sentTo, sentBy }) => {
        return {
          url: `/chat/get_meassages/${sentTo}/${sentBy}`,
          method: "GET",
        };
      },
      invalidatesTags: ["chat"],
    }),
  }),
});

export const { useSendTextMutation, useGetChatsQuery } = chatSlice;

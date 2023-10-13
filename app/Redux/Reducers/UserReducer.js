// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../../Config";

// Define a service using a base URL and expected endpoints
export const userSlice = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => {
        return {
          url: `/auth/get_user`,
          method: "GET",
        };
      },
    }),
    signUpUser: builder.mutation({
      //true
      query: (data) => {
        return {
          url: `/auth/signup`,
          method: "POST",
          body: data,
        };
      },
    }),
    loginUser: builder.mutation({
      query: (data) => {
        //true
        return {
          url: `/auth/login`,
          method: "POST",
          body: data,
        };
      },
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => {
        //true
        return {
          url: `/auth/update-users/${id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    resendOtp: builder.mutation({
      query: (data) => {
        //true
        return {
          url: `/auth/resend-otp`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    updateCategory: builder.mutation({
      query: (data) => {
        //true
        return {
          url: `/auth/update-category/`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    forgotPassword: builder.mutation({
      //true
      query: (data) => {
        return {
          url: `/auth/forgot-password`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    resetPassword: builder.mutation({
      //true
      query: (data) => {
        return {
          url: `/auth/reset-password`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    recommendedUsers: builder.query({
      query: () => {
        return {
          url: `/auth/recommender-users`,
          method: "GET",
        };
      },
    }),
    verifiedUsers: builder.query({
      query: () => {
        return {
          url: `/auth/verified-users`,
          method: "GET",
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useResendOtpMutation,
  useGetUserQuery,
  useLoginUserMutation,
  useSignUpUserMutation,
  useUpdateUserMutation,
  useUpdateCategoryMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRecommendedUsersQuery,
  useVerifiedUsersQuery
} = userSlice;

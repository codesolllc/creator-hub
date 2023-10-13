import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../../Config";


export const UserCategoriesSlice = createApi({
    
  reducerPath: "usercategories",
  tagTypes: ["usercategories"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({

    getUserCategories: builder.query({
      query: () => {
        return {
          url: `/usercategories/get_user_categories`,
          method: "GET",
        };
      },
    }),

    userByCategory: builder.query({
      query: (catID) => {
        return {
          url: `usercategories/get_user_by_categories/${catID}`,
          method: "GET",
        };
      },
    }),
  }),
});


export const { useGetUserCategoriesQuery, useUserByCategoryQuery } = UserCategoriesSlice;
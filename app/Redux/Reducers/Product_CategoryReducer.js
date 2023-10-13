import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../../Config";


export const product_Category_Slice = createApi({
  reducerPath: "product_categories",
  tagTypes: ["product_categories"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),

  endpoints: (builder) => ({
    getAllProductCategories: builder.query({
      query: () => {
        return {
          url: `/product_categories/get_all_categories`,
          method: "GET",
        };
      },
      providesTags: ["product_categories"],
    }),
  }),
});

export const { useGetAllProductCategoriesQuery } = product_Category_Slice;
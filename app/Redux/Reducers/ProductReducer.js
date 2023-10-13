import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../../Config";

export const productSlice = createApi({
  reducerPath: "product",
  tagTypes: ["product"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),

  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: ({ authorID, data }) => {
        return {
          url: `/product/${authorID}/create-product`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["product"],
    }),
    getAllProduct: builder.query({
      query: () => {
        return {
          url: `/product/all_products`,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
    getUserProduct: builder.query({
      query: (authorID) => {
        return {
          url: `/product/user_products/${authorID}`,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
    getCatProduct: builder.query({
      query: (catId) => {
        return {
          url: `/product/cat-products/${catId}`,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
    getSingleProduct: builder.query({
      query: (productId) => {
        return {
          url: `/product/single_product/${productId}`,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
    getSoldProduct: builder.query({
      query: () => {
        return {
          url: `/product/all_sold_products`,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: ({ authorID, productId, data }) => {
        return {
          url: `/product/edit_product/${authorID}/${productId}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: ({ authorID, productId }) => {
        return {
          url: `/product/delete_product/${authorID}/${productId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductQuery,
  useGetUserProductQuery,
  useGetSingleProductQuery,
  useGetCatProductQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetSoldProductQuery

} = productSlice;

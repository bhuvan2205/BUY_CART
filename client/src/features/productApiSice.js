import { API_ENDPOINTS } from "../constants/endpoints";
import apiSlice from "./apiSlice";

export const productAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: () => API_ENDPOINTS.PRODUCTS,
      keepUnusedDataFor: 5,
      providesTags: ["Products"],
    }),
    fetchProduct: builder.query({
      query: (id) => `${API_ENDPOINTS.PRODUCTS}/${id}`,
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: API_ENDPOINTS.PRODUCTS,
        method: "POST",
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${API_ENDPOINTS.PRODUCTS}/${data?.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (data) => ({
        url: `${API_ENDPOINTS.PRODUCTS}/${data?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    uploadImage: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.UPLOADS,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useFetchProductsQuery,
  useFetchProductQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUploadImageMutation,
  useUpdateProductMutation,
} = productAPI;

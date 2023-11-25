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
    deleteProduct: builder.mutation({
      query: (data) => ({
        url: `${API_ENDPOINTS.PRODUCTS}/${data?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useFetchProductsQuery,
  useFetchProductQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} = productAPI;

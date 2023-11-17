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
      providesTags: ["Products"],
    }),
  }),
});

export const { useFetchProductsQuery, useFetchProductQuery } = productAPI;

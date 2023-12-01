import { API_ENDPOINTS } from "../constants/endpoints";
import { PRODUCT_PAGE_LIMIT } from "../constants/query-key";
import apiSlice from "./apiSlice";

export const productAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: (data) =>
        `${API_ENDPOINTS.PRODUCTS}?page=${data?.page}&limit=${
          data?.limit ?? PRODUCT_PAGE_LIMIT
        }&keywords=${data?.keywords ?? ""}`,
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
    addReview: builder.mutation({
      query: (data) => ({
        url: `${API_ENDPOINTS.PRODUCTS}/${data?.id}/review`,
        method: "POST",
        body: data,
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
  useUploadImageMutation,
  useUpdateProductMutation,
  useAddReviewMutation
} = productAPI;

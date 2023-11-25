import { API_ENDPOINTS } from "../constants/endpoints";
import apiSlice from "./apiSlice";

export const orderAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: `${API_ENDPOINTS.ORDER}`,
        body: data,
        method: "POST",
      }),
    }),
    fetchOrder: builder.query({
      query: (id) => `${API_ENDPOINTS.ORDER}/${id}`,
      keepUnusedDataFor: 5,
    }),
    fetchMyOrders: builder.query({
      query: () => `${API_ENDPOINTS.ORDER}/mine`,
      keepUnusedDataFor: 5,
      providesTags: ["Order"],
    }),
    payOrder: builder.mutation({
      query: (data) => ({
        url: `${API_ENDPOINTS.ORDER}/${data?.id}/pay`,
        body: data,
        method: "POST",
      }),
    }),
    fetchPaypalClientID: builder.query({
      query: () => `${API_ENDPOINTS.PAYPAL}`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useFetchOrderQuery,
  usePayOrderMutation,
  useFetchPaypalClientIDQuery,
  useFetchMyOrdersQuery,
} = orderAPI;

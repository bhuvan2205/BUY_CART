import { API_ENDPOINTS } from "../constants/endpoints";
import apiSlice from "./apiSlice";

export const userAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: `${API_ENDPOINTS.USERS}/register`,
        body: data,
        method: "POST",
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${API_ENDPOINTS.USERS}/login`,
        body: data,
        method: "POST",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${API_ENDPOINTS.USERS}/logout`,
        method: "POST",
      }),
    }),
    profile: builder.query({
      query: () => `${API_ENDPOINTS.USERS}/profile`,
    }),
    fetchAllUsers: builder.query({
      query: () => `${API_ENDPOINTS.USERS}`,
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginMutation,
  useProfileQuery,
  useLogoutMutation,
  useFetchAllUsersQuery,
} = userAPI;

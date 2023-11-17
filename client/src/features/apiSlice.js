import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  tagTypes: ['Products', 'User'],
  endpoints: () => ({}),
});

export default apiSlice
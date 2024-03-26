import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_HOST } from "../../common/envs";
import { RootState } from "../store";

export const deliveryApiSlice = createApi({
  reducerPath: "deliveryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_HOST,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation<PostUserResponse, User>({
      query: (user) => ({
        url: "/user",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation<PostUserResponse, Login>({
      query: (login) => ({
        url: "/user/login",
        method: "POST",
        body: login,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useLoginMutation } = deliveryApiSlice;

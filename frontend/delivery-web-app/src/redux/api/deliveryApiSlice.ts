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
  tagTypes: ["User", "Order"],
  endpoints: (builder) => ({
    createUser: builder.mutation<PostUserResponse, User>({
      query: (user) => ({
        url: "/user",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    login: builder.mutation<PostUserResponse, Login>({
      query: (login) => ({
        url: "/user/login",
        method: "POST",
        body: login,
      }),
    }),
    getUsers: builder.query<UserNoPassword[], void>({
      query: () => "/user",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "User" as const, id })), "User"]
          : ["User"],
    }),
    deleteUser: builder.mutation<ResponseMessage, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "User", id: arg }],
    }),
    createOrder: builder.mutation<Id<number>, OrderRequest>({
      query: (order) => ({
        url: "/order",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Order"],
    }),
    getOrders: builder.query<OrderResponse[], void>({
      query: () => "/order",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Order" as const, id })),
              "Order",
            ]
          : ["Order"],
    }),
    getFullOrder: builder.query<FullOrderResponse, string>({
      query: (id) => `/order/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Order" as const, id }],
    }),
    updateOrderStatus: builder.mutation<ResponseMessage, StatusUpdateRequest>({
      query: ({ status, id }) => ({
        url: `/order/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Order", id }],
    }),
    getProducts: builder.query<ProductResponse[], void>({
      query: () => "/product",
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetFullOrderQuery,
  useUpdateOrderStatusMutation,
  useGetProductsQuery,
} = deliveryApiSlice;

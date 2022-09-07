import { api } from "../authApi";

export const authAction = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        data,
      }),
    }),
    register: builder.mutation({
      query: (data, token) => ({
        url: `/user/register/${token}`,
        method: "POST",
        data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "GET",
      }),
    }),
    verifyToken: builder.query({
      query: (token) => ({
        url: `/users/checkdemandeur/${token}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyTokenQuery,
  useLogoutMutation,
} = authAction;

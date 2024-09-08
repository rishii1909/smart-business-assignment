// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const JSON_PLACEHOLDER_API_PATH = "https://jsonplaceholder.typicode.com";

export interface User {
  name: string;
  username: string;
  email: string;
  phone: string;
}

export type UsersListAPIResponse = User[];

export const usersListAPISlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: JSON_PLACEHOLDER_API_PATH,
  }),
  reducerPath: "usersListAPI",
  // Tag types are used for caching and invalidation.
  tagTypes: ["UsersList"],
  endpoints: (build) => ({
    // Supply generics for the return type (in this case `QuotesApiResponse`)
    // and the expected query argument. If there is no argument, use `void`
    // for the argument type instead.
    getUsersList: build.query<UsersListAPIResponse, void>({
      query: () => `/users`,
      // `providesTags` determines which 'tag' is attached to the
      // cached data returned by the query.
    }),
  }),
});

export const { useGetUsersListQuery } = usersListAPISlice;

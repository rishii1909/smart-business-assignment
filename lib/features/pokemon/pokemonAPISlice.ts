// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface PokemonReference {
  name: string;
  url: string;
}

export interface PokemonListAPIResponse {
  results: PokemonReference[];
  count: number;
  next: string | null;
  previous: string | null;
}

export const pokemonListAPISlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/pokemon" }),
  reducerPath: "pokemonListAPI",
  // Tag types are used for caching and invalidation.
  tagTypes: ["PokemonList"],
  endpoints: (build) => ({
    // Supply generics for the return type (in this case `QuotesApiResponse`)
    // and the expected query argument. If there is no argument, use `void`
    // for the argument type instead.
    getPokemonList: build.query<PokemonListAPIResponse, number>({
      query: (limit) => `?limit=${limit}`,
      // `providesTags` determines which 'tag' is attached to the
      // cached data returned by the query.
      providesTags: (result, error, id) => [{ type: "PokemonList", id }],
    }),
  }),
});

export const { useGetPokemonListQuery } = pokemonListAPISlice;

export interface PokemonDataAPIResponse {
  name: string;
  species: PokemonReference;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
      showdown: {
        front_default: string;
      };
    };
  };
}

export const pokemonDataAPISlice = createApi({
  baseQuery: fetchBaseQuery(),
  reducerPath: "pokemonDataAPI",
  // Tag types are used for caching and invalidation.
  tagTypes: ["PokemonData"],
  endpoints: (build) => ({
    // Supply generics for the return type (in this case `QuotesApiResponse`)
    // and the expected query argument. If there is no argument, use `void`
    // for the argument type instead.
    getPokemonData: build.query<PokemonDataAPIResponse, string>({
      query: (url: string) => url,
      // `providesTags` determines which 'tag' is attached to the
      // cached data returned by the query.
      providesTags: (result, error, id) => [{ type: "PokemonData", id }],
    }),
  }),
});

export const { useGetPokemonDataQuery } = pokemonDataAPISlice;

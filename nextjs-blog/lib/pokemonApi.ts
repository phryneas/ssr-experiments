import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

export const pokemonApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2/",
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    getPokemonByName: builder.query<
      { species: { name: string }; sprites: { front_shiny: string } },
      string
    >({
      query: (name) => `pokemon/${name}`,
    }),
    getPokemonList: builder.query<{ results: Array<{ name: string }> }, void>({
      query: () => `pokemon/`,
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetPokemonByNameQuery,
  useGetPokemonListQuery,
  util: { getRunningOperationPromises },
} = pokemonApi;

// export endpoints for use in SSR
export const { getPokemonByName, getPokemonList } = pokemonApi.endpoints;

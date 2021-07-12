import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const bq = fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" });
const withoutSignal: typeof bq = (a, b, c) => {
  delete (b as any).signal;
  console.log(a, b, c);
  return bq(a, b, c);
};

export const pokemonApi = createApi({
  baseQuery: withoutSignal,
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
  getRunningOperationPromises,
} = pokemonApi;

// export endpoints for use in SSR
export const { getPokemonByName, getPokemonList } = pokemonApi.endpoints;

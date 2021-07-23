import Layout from "../../components/layout";
import Head from "next/head";
import {
  getPokemonByName,
  getPokemonList,
  getRunningOperationPromises,
  useGetPokemonByNameQuery,
} from "../../lib/pokemonApi";
import { makeStore } from "../../lib/store";

// Partial because first render (will get empty props while `getStaticProps` runs)
export default function Post(props: Partial<{ name: string }>) {
  // If the page is not yet generated, router.isFallback will be true
  // initially until getStaticProps() finishes running
  const router = useRouter();

  const result = useGetPokemonByNameQuery(props?.name ?? skipToken, {
    skip: router.isFallback,
  });
  const { isLoading, error, data } = result;

  return (
    <Layout>
      <Head>
        <title>{data?.species.name ?? ""}</title>
      </Head>
      <article>
        {error ? (
          <>Oh no, there was an error</>
        ) : router.isFallback || isLoading ? (
          <>Loading...</>
        ) : data ? (
          <>
            <h3>{data.species.name}</h3>
            <img src={data.sprites.front_shiny} alt={data.species.name} />
          </>
        ) : null}
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const store = makeStore();
  const result = await store.dispatch(getPokemonList.initiate());

  return {
    paths: result.data?.results.map((p) => `/pokemon/${p.name}`).slice(0, 10),
    fallback: true,
  };
}

import { wrapper } from "../../lib/store";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useRouter } from "next/dist/client/router";

export const getStaticProps = wrapper.getStaticProps((store) => async (x) => {
  const name = x.params?.id;
  if (typeof name === "string") {
    store.dispatch(getPokemonByName.initiate(name));
  }

  await Promise.all(getRunningOperationPromises());

  return {
    props: { name },
  };
});

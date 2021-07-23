import Layout from "../../components/layout";
import Head from "next/head";
import {
  getPokemonByName,
  getRunningOperationPromises,
  useGetPokemonByNameQuery,
} from "../../lib/pokemonApi";

// Partial because first render (will get empty props while `getStaticProps` runs)
export default function Post(props: Partial<{ name: string }>) {
  const result = useGetPokemonByNameQuery(props?.name ?? skipToken);
  console.log({ props, result });
  const { isLoading, error, data } = result;

  return (
    <Layout>
      <Head>
        <title>{data?.species.name ?? ""}</title>
      </Head>
      <article>
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
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
  return {
    paths: ["/pokemon/bulbasaur"],
    fallback: true,
  };
}

import { wrapper } from "../../lib/store";
import { skipToken } from "@reduxjs/toolkit/dist/query";

export const getStaticProps = wrapper.getStaticProps((store) => async (x) => {
  console.log(x);
  const name = x.params?.id;
  if (typeof name === "string") {
    store.dispatch(getPokemonByName.initiate(name));
  }

  await Promise.all(getRunningOperationPromises());

  return {
    props: { name },
  };
});

import Layout from "../../components/layout";
import Head from "next/head";
import {
  getPokemonByName,
  getRunningOperationPromises,
  useGetPokemonByNameQuery,
} from "../../lib/pokemonApi";

export default function Post(props: { name: string }) {
  const result = useGetPokemonByNameQuery(props?.name);
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
    fallback: false,
  };
}

import { wrapper } from "../../lib/store";

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

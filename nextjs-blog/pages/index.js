import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function Home({}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2>take a look at some pokemon</h2>
        <ul>
          <li>
            <a href="/pokemon/bulbasaur">Bulbasaur (SSG)</a>
          </li>
          <li>
            <a href="/pokemon/ivysaur">Ivysaur (SSR)</a>
          </li>
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}

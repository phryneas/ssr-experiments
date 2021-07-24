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
            Bulbasaur <a href="/pokemon/bulbasaur">dynamic</a>{" "}
            <a href="/pokemon/ssr/bulbasaur">SSR</a>{" "}
            <a href="/pokemon/ssg/bulbasaur">SSG</a>
          </li>
          <li>
            Beedrill <a href="/pokemon/beedrill">dynamic</a>{" "}
            <a href="/pokemon/ssr/beedrill">SSR</a>{" "}
            <a href="/pokemon/ssg/beedrill"> fallback SSG</a>
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

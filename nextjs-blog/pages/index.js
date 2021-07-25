import Head from "next/head";
import Link from "next/link";
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
            Bulbasaur <Link href="/pokemon/bulbasaur">dynamic</Link>{" "}
            <Link href="/pokemon/ssr/bulbasaur">SSR</Link>{" "}
            <Link href="/pokemon/ssg/bulbasaur">SSG</Link>
          </li>
          <li>
            Beedrill <Link href="/pokemon/beedrill">dynamic</Link>{" "}
            <Link href="/pokemon/ssr/beedrill">SSR</Link>{" "}
            <Link href="/pokemon/ssg/beedrill"> fallback SSG</Link>
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

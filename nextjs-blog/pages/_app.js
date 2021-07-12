import "../styles/global.css";
import { wrapper } from "../lib/store";

export function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(App);

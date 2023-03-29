import store from "@/redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import NextNProgress from "nextjs-progressbar";
import Layout from "@/components/shared/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NextNProgress color="black" />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

import store from "@/redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import NextNProgress from "nextjs-progressbar";
import Layout from "@/components/shared/Layout";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  preload: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <style jsx global>
        {`
          html {
            font-family: ${poppins.style.fontFamily};
          }
        `}
      </style>

      <NextNProgress color="black" />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

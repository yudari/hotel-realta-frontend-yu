import store from "@/redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import NextNProgress from "nextjs-progressbar";
import Layout from "@/components/shared/Layout";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  preload: false,
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hasLayout =
    !router.pathname.startsWith("/users/loginEmployee") &&
    !router.pathname.startsWith("/users/signupEmployee") &&
    !router.pathname.startsWith("/users/loginGuest") &&
    !router.pathname.startsWith("/users/signupGuest") &&
    router.pathname !== "/_error";

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

      {hasLayout ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </Provider>
  );
}

import store from "@/redux/store";
import "@/styles/globals.css";
import "react-gallery-carousel/dist/index.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import NextNProgress from "nextjs-progressbar";
import Layout from "@/components/shared/Layout";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import Head from "next/head";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  preload: false,
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hasLayout =
    router.pathname !== '/' &&
    !router.pathname.startsWith("/booking/detail-pembayaran-invoice-final") &&
    !router.pathname.startsWith("/booking/detail-booking-pembayaran-final") &&
    !router.pathname.startsWith("/resto/restoMenuPhotos") &&
    !router.pathname.startsWith("/resto/orderMenu") &&
    !router.pathname.startsWith("/booking/detail-booking-final") &&
    !router.pathname.startsWith("/booking/list-booking-final") &&
    !router.pathname.startsWith("/users/loginEmployee") &&
    !router.pathname.startsWith("/users/signupEmployee") &&
    !router.pathname.startsWith("/users/loginGuest") &&
    !router.pathname.startsWith("/users/signupGuest") &&
    !router.pathname.startsWith("/users/forgotPassword") &&
    !router.pathname.startsWith("/users/resetPassword") &&
    router.pathname !== "/_error" &&
    router.pathname !== "/404";

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
      <Head>
        <title>Hotel_Realta</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="favicon.ico" />
      </Head>
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

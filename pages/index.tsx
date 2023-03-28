import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Hotel Realta</title>
        <meta
          name="description"
          content="Welcome to our Realta Hotel, where every detail has been meticulously crafted to offer you an unparalleled experience of refinement and indulgence. From the moment you step into our elegantly designed lobby, you'll be greeted with warm hospitality and exceptional service that is tailored to your every need."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid place-content-center h-screen">
        <div className="text-center text-4xl font-bold">Hotel Realta</div>
      </main>
    </>
  );
}

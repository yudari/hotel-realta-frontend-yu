import type { NextPage } from "next";
import Head from "next/head";
import { useCallback } from "react";
import { useRouter } from "next/router";
import HeaderNavbar from "../components/ComponentsYudha/header-navbar";
import JumbotronSection from "../components/ComponentsYudha/jumbotron-section";
import ExploreSection from "../components/ComponentsYudha/explore-section";
import SectionLiburan from "../components/ComponentsYudha/section-liburan";
import HotelFavoritesSection from "../components/ComponentsYudha/hotel-favorites-section";
import HotelSubscribeSection from "../components/ComponentsYudha/hotel-subscribe-section";
import SectionFooter from "../components/ComponentsYudha/section-footer";

export default function Home() {

  const router = useRouter();

  const onFrameButtonClick = useCallback(() => {
    router.push("/booking/list-booking-final");
  }, [router]);

  const onFrameButtonClickRestaurant = useCallback(() => {
    router.push("/resto/restoMenuPhotos");
  }, [router]);

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

      <div className="relative bg-neutrals w-full flex flex-col font-body-txt-body-s-regular px-0 box-border items-start justify-start lg:h-auto ">
        <HeaderNavbar
          vector="/vector17.svg"
          vector1="/vector18.svg"
          vector2="/vector19.svg"
          vector3="/vector20.svg"
          vector4="/vector21.svg"
          vector5="/vector22.svg"
          vector6="/vector23.svg"
          vector7="/vector24.svg"
          vector8="/vector25.svg"
          vector9="/vector26.svg"
          onFrameButtonClick={onFrameButtonClick}
          onFrameButtonClickRestaurant={onFrameButtonClickRestaurant}
        />
        <JumbotronSection />
        <ExploreSection />
        <SectionLiburan />
        <HotelFavoritesSection />
        <HotelSubscribeSection />
        <SectionFooter />
      </div>
    </>
  );
}

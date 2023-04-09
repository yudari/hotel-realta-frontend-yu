import type { NextPage } from "next";
import { useEffect } from "react";

const ContainerHeaderContent: NextPage = () => {
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add("animate");
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  return (
    <div
      className="self-stretch flex flex-col items-start justify-start gap-[8px] [&.animate]:animate-[1s_ease_0s_1_normal_forwards_fade-in] opacity-[0] min-w-full z-[0] text-left text-17xl text-neutrals font-body-txt-body-s-regular md:self-stretch md:w-auto md:h-auto sm:self-stretch sm:w-auto"
      data-animate-on-scroll
    >
      <b className="relative inline-block w-[736px] sm:text-9xl mq720:text-7xl mq720:self-stretch mq720:w-auto mq720:min-w-[80%]">
        Ingin Liburan yang Tak Terlupakan? Pesan Hotelmu Disini dan Rasakan
        Kesenangan yang Sejati
      </b>
      <p className="m-0 relative text-xl capitalize font-medium inline-block w-[499px] md:self-stretch md:w-auto sm:hidden">
        Temukan Tawaran Khusus untuk Booking Hotel Sesuai dengan Rencanamu
      </p>
    </div>
  );
};

export default ContainerHeaderContent;

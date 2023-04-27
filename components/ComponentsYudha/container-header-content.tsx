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
      className="self-stretch flex flex-col items-start justify-start gap-[8px] [&.animate]:animate-[1s_ease_0s_1_normal_forwards_fade-in] opacity-[0] min-w-full z-[0] text-left text-17xl text-neutrals font-body-txt-body-s-regular yu_md:self-stretch yu_md:w-auto yu_md:h-auto yu_sm:self-stretch yu_sm:w-auto"
      data-animate-on-scroll
    >
      <b className="relative inline-block w-[736px] yu_sm:text-[28px] yu_mq720:text-[26px] yu_mq720:self-stretch yu_mq720:w-auto yu_mq720:min-w-[80%]">
        Ingin Liburan yang Tak Terlupakan? Pesan Hotelmu Disini dan Rasakan Kesenangan yang Sejati
      </b>
      <p className="m-0 relative text-[20px] capitalize font-medium inline-block w-[499px] yu_md:self-stretch yu_md:w-auto yu_sm:hidden">
        Temukan Tawaran Khusus Untuk Booking Hotel Sesuai Dengan Rencanamu.
      </p>
    </div>
  );
};

export default ContainerHeaderContent;

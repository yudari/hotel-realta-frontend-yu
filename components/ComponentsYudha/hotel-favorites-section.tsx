import type { NextPage } from "next";
import { useEffect } from "react";

const HotelFavoritesSection: NextPage = () => {
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
    <section className="self-stretch flex flex-col py-0 px-[92px] items-start justify-start text-left text-[32px] text-darkslategray-300 font-body-txt-body-s-regular yu_md:h-auto yu_md:pl-5 yu_md:pr-5 yu_md:box-border">
      <div
        className="self-stretch flex flex-col items-center justify-start gap-[24px] [&.animate]:animate-[1s_ease_0s_1_normal_forwards_fade-in] opacity-[0]"
        data-animate-on-scroll
      >
        <div className="self-stretch flex flex-row items-center justify-start gap-[24px] yu_sm:flex-col yu_sm:gap-[24px] yu_sm:items-center yu_sm:justify-start">
          <div className="flex-1 flex flex-col items-start justify-start gap-[16px] yu_sm:flex-[unset] yu_sm:self-stretch">
            <h2 className="m-0 self-stretch relative text-[inherit] font-bold font-inherit yu_sm:text-[28px] yu_sm:text-center yu_mq720:text-[28px]">
              Hotel Favorit yang Paling Disukai
            </h2>
            <p className="m-0 self-stretch relative text-[16px] yu_sm:text-center">
              Rencanakan Liburan Anda dengan Menginap di Hotel Favorit Anda: Nikmati Pengalaman Menginap yang Tak Terlupakan dengan Kenyamanan dan Fasilitas Menakjubkan!
            </p>
          </div>
          <button className="cursor-pointer py-2 px-4 bg-[transparent] box-border h-10 flex flex-col items-center justify-center border-[1px] border-solid border-darkslategray-300  hover:bg-darkslategray-300  hover:cursor-pointer group">
            <div className="relative text-[14px] font-medium font-montserrat-semibold-14 group-hover:text-white text-darkslategray-300 text-left">
              See All
            </div>
          </button>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start gap-[24px] text-21xl text-neutrals yu_lg:gap-[28px] yu_lg:flex-wrap yu_lg:justify-around yu_md:gap-[42px]">
          <div className="flex-1 rounded-[18px] bg-steelblue flex flex-col p-6 box-border items-start justify-start gap-[30px] min-w-[50%] h-fit yu_lg:min-w-[70%] yu_md:min-w-[80%] yu_sm:min-w-full ">
            <div className="self-stretch flex flex-col items-start justify-center gap-[24px]">
              <div className="self-stretch flex flex-row items-start justify-start gap-[16px] yu_mq720:flex-col">
                <h3 className="m-0 flex-1 relative text-[inherit] font-bold font-inherit yu_lg:text-17xl yu_sm:text-[28px] yu_sm:text-left yu_mq720:flex-[unset] yu_mq720:self-stretch">
                  CODEX Good Sleep Samarinda
                </h3>
                <button className="cursor-pointer [border:none] p-2 bg-neutrals rounded-lg flex flex-col items-start justify-start gap-[4px] yu_sm:min-w-full">
                  <div className="relative text-[14px] font-body-txt-body-s-regular text-darkslategray-300 text-left">
                    From
                  </div>
                  <div className="relative text-[18px] font-semibold font-body-txt-body-s-regular text-darkslategray-300 text-left">
                    Rp 1.782.000,00
                  </div>
                </button>
              </div>
              <p className="m-0 self-stretch relative text-[14px] opacity-[0.7] font-medium">
                CODEX Good Sleep Samarinda adalah hotel yang terjangkau dan nyaman yang terletak di Samarinda, Kalimantan Timur, Indonesia. Hotel ini menawarkan kamar-kamar yang fungsional dengan fasilitas seperti AC, TV, kamar mandi pribadi dengan perlengkapan mandi gratis, dan Wi-Fi gratis. Hotel ini juga menyediakan resepsionis 24 jam, parkir gratis, dan layanan kebersihan harian. Lokasinya yang strategis menjadikannya pilihan ideal bagi pelancong bisnis atau liburan di Samarinda.
              </p>
            </div>
            <button className="cursor-pointer py-3 px-[52px] bg-darkslategray-300 self-stretch rounded flex flex-row items-center justify-center border-[1px] border-solid group hover:bg-darkslategray-200 border-darkslategray-300">
              <div className="flex-1 relative text-[18px] leading-[132%] font-body-txt-body-s-regular text-neutrals text-center">
                Lihat
              </div>
            </button>
          </div>
          <div className="flex-1 flex flex-col items-start justify-start gap-[24px] min-w-[30%] w-full">
            <div className="self-stretch flex flex-row items-start justify-start gap-[20px]">
              <img
                className="flex-1 relative rounded-[18px] max-w-full overflow-hidden h-[200px] object-cover"
                alt=""
                src="/rectangle-3@2x.png"
              />
              <img
                className="flex-1 relative rounded-[18px] max-w-full overflow-hidden h-[200px] object-cover"
                alt=""
                src="/rectangle-31@2x.png"
              />
            </div>
            <div className="self-stretch flex flex-row items-start justify-start gap-[20px]">
              <img
                className="flex-1 relative rounded-[18px] max-w-full overflow-hidden h-[200px] object-cover"
                alt=""
                src="/rectangle-32@2x.png"
              />
              <img
                className="flex-1 relative rounded-[18px] max-w-full overflow-hidden h-[200px] object-cover"
                alt=""
                src="/rectangle-33@2x.png"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelFavoritesSection;

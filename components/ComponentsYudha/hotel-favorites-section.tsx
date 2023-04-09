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
    <section className="self-stretch flex flex-col py-0 px-[92px] items-start justify-start text-left text-13xl text-darkslategray-300 font-body-txt-body-s-regular md:h-auto md:pl-5 md:pr-5 md:box-border">
      <div
        className="self-stretch flex flex-col items-center justify-start gap-[24px] [&.animate]:animate-[1s_ease_0s_1_normal_forwards_fade-in] opacity-[0]"
        data-animate-on-scroll
      >
        <div className="self-stretch flex flex-row items-center justify-start gap-[24px] sm:flex-col sm:gap-[24px] sm:items-center sm:justify-start">
          <div className="flex-1 flex flex-col items-start justify-start gap-[16px] sm:flex-[unset] sm:self-stretch">
            <h2 className="m-0 self-stretch relative text-[inherit] font-bold font-inherit sm:text-9xl sm:text-center mq720:text-9xl">
              Hotel Favorit yang Paling Disukai
            </h2>
            <p className="m-0 self-stretch relative text-base sm:text-center">
              Rencanakan liburanmu dengan menginap di hotel favorit: nikmati
              pengalaman menginap yang tak terlupakan dengan kenyamanan dan
              fasilitas yang mengagumkan!
            </p>
          </div>
          <button className="cursor-pointer py-2 px-4 bg-[transparent] box-border h-10 flex flex-col items-center justify-center border-[1px] border-solid border-darkslategray-300 hover:bg-darkslategray-300 hover:text-neutrals hover:cursor-pointer">
            <div className="relative text-sm font-medium font-montserrat-semibold-14 text-darkslategray-300 text-left">
              See All
            </div>
          </button>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start gap-[24px] text-21xl text-neutrals lg:gap-[28px] lg:flex-wrap lg:justify-around md:gap-[42px]">
          <div className="flex-1 rounded-xl bg-steelblue flex flex-col p-6 box-border items-start justify-start gap-[30px] min-w-[50%] lg:min-w-[70%] md:min-w-[80%] sm:min-w-full">
            <div className="self-stretch flex flex-col items-start justify-center gap-[24px]">
              <div className="self-stretch flex flex-row items-start justify-start gap-[16px] mq720:flex-col">
                <h3 className="m-0 flex-1 relative text-[inherit] font-bold font-inherit lg:text-17xl sm:text-9xl sm:text-left mq720:flex-[unset] mq720:self-stretch">
                  Hotel Lendosis Perintis Kemerdekaan
                </h3>
                <button className="cursor-pointer [border:none] p-2 bg-neutrals rounded-lg flex flex-col items-start justify-start gap-[4px] sm:min-w-full">
                  <div className="relative text-sm font-body-txt-body-s-regular text-darkslategray-300 text-left">
                    From
                  </div>
                  <div className="relative text-xl font-semibold font-body-txt-body-s-regular text-darkslategray-300 text-left">
                    Rp 220.000,00
                  </div>
                </button>
              </div>
              <p className="m-0 self-stretch relative text-sm">
                Hotel Lendosis Perintis Kemerdekaan is a budget hotel located in
                Palembang, Indonesia. It is 4 km from Ampera Bridge, and 4 km
                from Palembang Indah Mall. OYO 90158 Hotel Lendosis Perintis
                Kemerdekaan has standardised amenities at the best value, and
                offers a superior check-in experience assured.
              </p>
            </div>
            <button className="cursor-pointer py-3 px-[52px] bg-darkslategray-300 self-stretch rounded flex flex-row items-center justify-center border-[1px] border-solid border-darkslategray-300">
              <div className="flex-1 relative text-lg leading-[132%] font-body-txt-body-s-regular text-neutrals text-center">
                Lihat Detail
              </div>
            </button>
          </div>
          <div className="flex-1 flex flex-col items-start justify-start gap-[24px] min-w-[50%]">
            <div className="self-stretch flex flex-row items-start justify-start gap-[20px]">
              <img
                className="flex-1 relative rounded-xl max-w-full overflow-hidden h-[200px] object-cover"
                alt=""
                src="/rectangle-3@2x.png"
              />
              <img
                className="flex-1 relative rounded-xl max-w-full overflow-hidden h-[200px] object-cover"
                alt=""
                src="/rectangle-31@2x.png"
              />
            </div>
            <div className="self-stretch flex flex-row items-start justify-start gap-[20px]">
              <img
                className="flex-1 relative rounded-xl max-w-full overflow-hidden h-[200px] object-cover"
                alt=""
                src="/rectangle-32@2x.png"
              />
              <img
                className="flex-1 relative rounded-xl max-w-full overflow-hidden h-[200px] object-cover"
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

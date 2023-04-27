import type { NextPage } from "next";
import { useEffect } from "react";

const HotelSubscribeSection: NextPage = () => {
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
    <div className="self-stretch flex flex-col py-[42px] px-[92px] items-start justify-start text-left text-25xl text-neutrals yu_lg:pl-5 yu_lg:pr-5 yu_lg:box-border">
      <div
        className="self-stretch rounded-[18px] bg-steelblue shadow-[0px_4px_16px_rgba(17,_34,_17,_0.05)] overflow-hidden flex flex-row py-0 px-6 items-end justify-start gap-[20px] [&.animate]:animate-[1s_ease_0s_1_normal_forwards_fade-in] opacity-[0] yu_md:flex-row yu_md:items-start yu_md:justify-start"
        data-animate-on-scroll
      >
        <div className="flex-1 flex flex-col py-6 px-0 box-border items-start justify-start gap-[24px] min-w-[70%] yu_md:min-w-[90%] yu_sm:gap-[16px] yu_sm:min-w-full">
          <h3 className="m-0 relative text-[inherit] leading-[54px] font-bold font-inherit inline-block w-[364px] yu_md:text-[44px] text-[44px] yu_sm:text-left yu_sm:min-w-full">
            Subscribe Newsletter
          </h3>
          <div className="self-stretch flex flex-col items-start justify-start gap-[16px] text-[18px]">
            <div className="self-stretch flex flex-col items-start justify-start gap-[8px]">
              <b className="relative inline-block w-[206px] opacity-[0.8]">
                The Hotels
              </b>
              <p className="m-0 relative text-[16px] font-semibold inline-block w-[400px] opacity-[0.7] yu_sm:self-stretch yu_sm:w-auto">
                Temukan Inspirasi Liburanmu! Dapatkan Diskon, Tips Perjalanan,
                dan Cerita Unik di Balik Layar Hanya di Booking Hotel Kami!
              </p>
            </div>
            <div className="self-stretch flex flex-row items-center justify-start gap-[16px] text-[14px] text-gray-400 font-montserrat-semibold-14 yu_sm:flex-col">
              <div className="flex-1 rounded-t rounded-b-none h-14 flex flex-col items-start justify-start yu_sm:flex-[unset] yu_sm:self-stretch">
                <div className="self-stretch rounded bg-neutrals flex flex-col items-start justify-start">
                  <div className="self-stretch rounded-t rounded-b-none flex flex-row py-2 pr-0 pl-4 items-center justify-start">
                    <div className="flex-1 h-10 flex flex-col items-start justify-center">
                      <div className="self-stretch bg-neutrals flex flex-row items-center justify-start">
                        <input
                          className="border-none font-body-txt-body-s-regular text-[16px] bg-[transparent] outline-none flex-1 relative text-gray-400 text-left"
                          type="text"
                          placeholder="Your email"
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <button className="cursor-pointer [border:none] py-2 px-4 bg-darkslategray-300 self-stretch rounded flex flex-row items-center justify-center hover:bg-gray-500 active:bg-gray-500">
                <div className="relative text-[14px] font-semibold font-body-txt-body-s-regular text-neutrals text-left">
                  Subscribe
                </div>
              </button>
            </div>
          </div>
        </div>
        <img
          className="relative w-[367px] h-[305px] shrink-0 overflow-hidden yu_md:hidden yu_md:min-w-[15%]"
          alt=""
          src="/emojionev1openmailboxwithloweredflag.svg"
        />
      </div>
    </div>
  );
};

export default HotelSubscribeSection;

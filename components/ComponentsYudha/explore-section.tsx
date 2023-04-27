import type { NextPage } from "next";
import { useEffect } from "react";

const ExploreSection: NextPage = () => {
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
    <div className="self-stretch overflow-hidden flex flex-col pt-[170px] px-[92px] pb-[25px] items-start justify-start text-left text-[32px] text-darkslategray-300 font-body-txt-body-s-regular yu_md:h-auto yu_md:pl-5 yu_md:pt-[46px] yu_md:pr-5 yu_md:box-border">
      <div
        className="self-stretch flex flex-col items-start justify-start gap-[32px] [&.animate]:animate-[1s_ease_0s_1_normal_forwards_shake-horizontal] opacity-[1] yu_md:self-stretch yu_md:w-auto yu_md:h-auto"
        data-animate-on-scroll
      >
        <b className="self-stretch relative">Explore Indonesia!</b>
        <div className="self-stretch flex flex-row items-start justify-start gap-[12px] flex-wrap text-[16px] font-montserrat-semibold-14 yu_lgself-stretch yu_lgw-auto yu_lgh-auto yu_lgflex-row yu_lggap-[20px] yu_lgitems-start yu_lgjustify-start yu_md:self-stretch yu_md:w-auto yu_md:flex-row yu_md:gap-[20px] yu_md:items-start yu_md:justify-start yu_sm:flex-row">
          <div className="w-[284px] shrink-0 flex flex-row items-center justify-start gap-[16px] min-w-[20%]">
            <img
              className="rounded-lg w-[90px] h-[90px] shrink-0 object-cover"
              alt=""
              src="/frame-74@2x.png"
            />
            <div className="flex-1 flex flex-col items-start justify-start gap-[8px]">
              <div className="self-stretch relative font-semibold">
                Kalimantan Timur
              </div>
              <div className="self-stretch relative text-[12px] text-blackish-green opacity-[0.75]">
                325 hotel
              </div>
            </div>
          </div>
          <div className="w-[284px] shrink-0 flex flex-row items-center justify-start gap-[16px] min-w-[20%]">
            <img
              className="rounded-lg w-[90px] h-[90px] shrink-0 object-cover"
              alt=""
              src="/frame-741@2x.png"
            />
            <div className="flex-1 flex flex-col items-start justify-center gap-[8px]">
              <div className="relative font-semibold">Bandung</div>
              <div className="self-stretch relative text-[12px] text-blackish-green opacity-[0.75]">
                325 hotel
              </div>
            </div>
          </div>
          <div className="w-[284px] shrink-0 flex flex-row items-center justify-start gap-[16px] min-w-[20%]">
            <img
              className="rounded-lg w-[90px] h-[90px] shrink-0 object-cover"
              alt=""
              src="/frame-742@2x.png"
            />
            <div className="flex-1 flex flex-col items-start justify-center gap-[8px]">
              <div className="self-stretch relative font-semibold">
                Kalimantan Barat
              </div>
              <div className="self-stretch relative text-[12px] text-blackish-green opacity-[0.75]">
                325 hotel
              </div>
            </div>
          </div>
          <div className="w-[284px] shrink-0 flex flex-row items-center justify-start gap-[16px] min-w-[20%]">
            <img
              className="rounded-lg w-[90px] h-[90px] shrink-0 object-cover"
              alt=""
              src="/frame-743@2x.png"
            />
            <div className="flex-1 flex flex-col items-start justify-center gap-[8px]">
              <div className="self-stretch relative font-semibold">
                Semarang
              </div>
              <div className="self-stretch relative text-[12px] text-blackish-green opacity-[0.75]">
                325 hotel
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreSection;

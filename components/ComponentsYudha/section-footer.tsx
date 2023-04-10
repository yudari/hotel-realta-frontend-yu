import type { NextPage } from "next";
import { useMemo } from "react";
import CSS, { Property } from "csstype";

type SectionFooterType = {
  /** Style props */
  footerSectionSectionFooteHeight?: Property.Height;
};

const SectionFooter: NextPage<SectionFooterType> = ({
  footerSectionSectionFooteHeight,
}) => {
  const sectionFooterStyle: CSS.Properties = useMemo(() => {
    return {
      height: footerSectionSectionFooteHeight,
    };
  }, [footerSectionSectionFooteHeight]);

  return (
    <div
      className="self-stretch bg-darkslategray-300 h-[360px] shrink-0 flex flex-col py-16 px-[104px] box-border items-start justify-center text-left text-lg text-neutrals font-yeseva-one lg:pl-16 lg:pr-16 lg:box-border md:py-[22px] md:px-8 md:box-border sm:h-auto sm:pt-[08px] sm:px-3 sm:pb-2 sm:box-border mq720:h-auto"
      style={sectionFooterStyle}
    >
      <div className="self-stretch flex flex-row items-start justify-start gap-[140px] mq720:flex-col mq720:gap-[42px] mq720:items-center mq720:justify-start">
        <div className="flex flex-col items-center justify-start gap-[24px]">
          <div className="w-[190px] flex flex-col items-center justify-start">
            <img
              className="relative w-[34px] h-[34px] shrink-0 overflow-hidden"
              alt=""
              src="/hotelrealta1.svg"
            />
            <div className="w-[190px] h-[33px] shrink-0 flex flex-col items-center justify-start gap-[2px]">
              <div className="relative">HOTEL REALTA</div>
              <div className="relative text-5xs font-montserrat-semibold-14">
                EXPERIENCE ELEVATED LUXURY AT ITS FINEST
              </div>
            </div>
          </div>
          <div className="flex flex-row items-start justify-start gap-[12px]">
            <img
              className="relative w-5 h-5 shrink-0 overflow-hidden"
              alt=""
              src="/akariconsfacebookfill.svg"
            />
            <img
              className="relative w-5 h-5 shrink-0 overflow-hidden"
              alt=""
              src="/akariconstwitterfill.svg"
            />
            <img
              className="relative w-5 h-5 shrink-0 overflow-hidden"
              alt=""
              src="/akariconsyoutubefill1.svg"
            />
            <img
              className="relative w-5 h-5 shrink-0 overflow-hidden"
              alt=""
              src="/antdesigninstagramfilled.svg"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-row items-start justify-start gap-[24px] text-base font-body-txt-body-s-regular sm:flex-col mq720:flex-[unset] mq720:self-stretch">
          <div className="w-[151px] shrink-0 flex flex-col items-start justify-start gap-[16px]">
            <b className="relative">Hotel Kita</b>
            <div className="self-stretch flex flex-col items-start justify-start gap-[12px] text-sm">
              <div className="self-stretch relative font-medium opacity-[0.7]">
                Jakarta
              </div>
              <div className="self-stretch relative font-medium opacity-[0.7]">
                Bandung
              </div>
              <div className="self-stretch relative font-medium opacity-[0.7]">
                Samarinda
              </div>
              <div className="self-stretch relative font-medium opacity-[0.7]">
                Semarang
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-start justify-start gap-[16px] sm:flex-[unset] sm:self-stretch">
            <b className="relative">About Us</b>
            <div className="self-stretch flex flex-col items-start justify-start text-sm">
              <div className="self-stretch relative leading-[175%] font-medium opacity-[0.7]">
                Kami adalah platform booking hotel terpercaya yang menyediakan
                pengalaman menginap terbaik dengan harga terbaik. Kami
                berkomitmen untuk memberikan layanan yang ramah, mudah, dan
                efisien sehingga pelanggan kami dapat menikmati liburan yang tak
                terlupakan.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionFooter;

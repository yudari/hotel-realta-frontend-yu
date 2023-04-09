import type { NextPage } from "next";

const FooterContainer: NextPage = () => {
  return (
    <footer className="bg-darkslategray-300 h-[316px] shrink-0 flex flex-col py-0 px-[104px] box-border items-center justify-center text-left text-lg text-neutrals font-yeseva-one">
      <div className="w-[1232px] flex flex-row items-start justify-start gap-[140px]">
        <div className="flex flex-col items-center justify-start gap-[24px]">
          <div className="relative w-[190px] h-[67px] shrink-0">
            <img
              className="absolute top-[0px] left-[78px] w-[34px] h-[34px] overflow-hidden"
              alt=""
              src="/hotelrealta.svg"
            />
            <div className="absolute top-[34px] left-[0px] w-[190px] h-[33px]">
              <div className="absolute top-[0px] left-[27px]">HOTEL REALTA</div>
              <div className="absolute top-[23px] left-[0px] text-5xs font-montserrat-semibold-14">
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
              src="/akariconsyoutubefill.svg"
            />
            <img
              className="relative w-5 h-5 shrink-0 overflow-hidden"
              alt=""
              src="/antdesigninstagramfilled.svg"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-row items-start justify-start gap-[24px] text-base font-body-txt-body-s-regular">
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
          <div className="w-[510px] shrink-0 flex flex-col items-start justify-start gap-[16px]">
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
    </footer>
  );
};

export default FooterContainer;

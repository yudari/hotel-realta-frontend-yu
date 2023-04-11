import type { NextPage } from "next";
import { useEffect } from "react";

const SectionLiburan: NextPage = () => {
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
    <div className="self-stretch flex flex-col py-[42px] px-[92px] items-start justify-start text-left text-[32px] text-darkslategray-300 font-body-txt-body-s-regular yu_lg:pl-5 yu_lg:pr-5 yu_lg:box-border">
      <div
        className="self-stretch flex flex-col items-start justify-start gap-[32px] [&.animate]:animate-[1s_ease-in_0s_1_normal_forwards_fade-in] opacity-[0]"
        data-animate-on-scroll
      >
        <div className="self-stretch flex flex-row items-center justify-start gap-[24px] yu_sm:flex-col">
          <div className="flex-1 flex flex-col items-start justify-start gap-[16px] yu_sm:flex-[unset] yu_sm:self-stretch">
            <h3 className="m-0 self-stretch relative text-[inherit] font-bold font-inherit yu_sm:text-[28px] yu_sm:text-center yu_sm:self-stretch yu_sm:w-auto">
              Jatuh Cinta pada Liburan
            </h3>
            <p className="m-0 self-stretch relative text-[16px] yu_sm:font-body-txt-body-s-regular yu_sm:text-[14px] yu_sm:text-center">
              Ingin Merayakan Musim Ini dengan Liburan yang Tepat? Temukan
              Penginapan Idealmu Bersama Kami dan Nikmati Perjalanan yang Tak
              Terlupakan!
            </p>
          </div>
          <button className="cursor-pointer py-2 px-4 bg-[transparent] flex flex-col items-start justify-start border-[1px] border-solid border-darkslategray-300 group hover:bg-darkslategray-300 hover:text-neutrals hover:cursor-pointer">
            <div className="relative text-[14px] font-medium font-montserrat-semibold-14 group-hover:text-white text-darkslategray-300 text-left">
              See All
            </div>
          </button>
        </div>
        <div className="flex w-full flex-row items-start justify-start gap-4 text-[18px] text-neutrals yu_lg:flex-row yu_lg:flex-wrap yu_lg:justify-center">
          <div className="relative rounded-[18px] w-[302px] h-[420px] overflow-hidden">
            <img className="absolute inset-0 w-full h-full object-cover" src="/frame-78@3x.png" alt="background image" />
            <div className="absolute inset-0 bg-black opacity-50 transition duration-300 hover:opacity-0"></div>
            <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end">
              <div className="py-3 px-4 bg-gray-900 bg-opacity-0 rounded-b-xl transition duration-300 hover:bg-opacity-90  cursor-pointer">
                <h3 className="text-white text-[18px] font-semibold mb-1 transition duration-300 hover:text-gray-900">Samarinda</h3>
                <span className="text-white text-[14px] font-medium transition duration-300 hover:text-gray-900">Rp 500.000,00</span>
              </div>
            </div>
          </div>
          <div className="relative rounded-[18px] w-[302px] h-[420px] overflow-hidden">
            <img className="absolute inset-0 w-full h-full object-cover" src="/frame-79@3x.png" alt="background image" />
            <div className="absolute inset-0 bg-black opacity-50 transition duration-300 hover:opacity-0"></div>
            <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end">
              <div className="py-3 px-4 bg-gray-900 bg-opacity-0 rounded-b-xl transition duration-300 hover:bg-opacity-90  cursor-pointer">
                <h3 className="text-white text-[18px] font-semibold mb-1 transition duration-300 ">Balikpapan</h3>
                <span className="text-white text-[14px] font-medium transition duration-300 hover:text-gray-900">Rp 300.000,00</span>
              </div>
            </div>
          </div>
          <div className="relative rounded-[18px] w-[302px] h-[420px] overflow-hidden">
            <img className="absolute inset-0 w-full h-full object-cover" src="/frame-80@3x.png" alt="background image" />
            <div className="absolute inset-0 bg-black opacity-50 transition duration-300 hover:opacity-0"></div>
            <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end">
              <div className="py-3 px-4 bg-gray-900 bg-opacity-0 rounded-b-xl transition duration-300 hover:bg-opacity-90  cursor-pointer">
                <h3 className="text-white text-[18px] font-semibold mb-1 transition duration-300 hover:text-gray-900">Yogyakarta</h3>
                <span className="text-white text-[14px] font-medium transition duration-300 hover:text-gray-900">Rp 600.000,00</span>
              </div>
            </div>
          </div>
          <div className="relative rounded-[18px] w-[302px] h-[420px] overflow-hidden">
            <img className="absolute inset-0 w-full h-full object-cover" src="/frame-78@3x.png" alt="background image" />
            <div className="absolute inset-0 bg-black opacity-50 transition duration-300 hover:opacity-0"></div>
            <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end">
              <div className="py-3 px-4 bg-gray-900 bg-opacity-0 rounded-b-xl transition duration-300 hover:bg-opacity-90  cursor-pointer">
                <h3 className="text-white text-[18px] font-semibold mb-1 transition duration-300 hover:text-gray-900">Semarang</h3>
                <span className="text-white text-[14px] font-medium transition duration-300 hover:text-gray-900">Rp 400.000,00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionLiburan;

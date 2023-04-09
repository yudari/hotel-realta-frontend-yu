import type { NextPage } from "next";
import { Ref, forwardRef, useEffect, useState } from "react";
import ContainerHeaderContent from "./container-header-content";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type InputPickDateCheckOpenProps = {
  value: string;
  onClick: () => void;
};

const JumbotronSection: NextPage = () => {
  const [startDateOpen, setStartDateOpen] = useState<Date>(new Date());
  const [startDateClose, setStartDateClose] = useState<Date>(new Date());
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

  const InputPickDateCheckOpen = forwardRef<HTMLInputElement, InputPickDateCheckOpenProps>(
    ({ value, onClick }, ref) => (
      <div className="relative z-0 w-full">
        <input
          type="text"
          id="floating_standard"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          onClick={onClick}
          value={value}
          ref={ref}
        />
        <label
          htmlFor="floating_standard"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Check Buka
        </label>
      </div>
    )
  );

  const InputPickDateCheckClose = forwardRef<HTMLInputElement, InputPickDateCheckOpenProps>(
    ({ value, onClick }, ref) => (
      <div className="relative z-0 w-full">
        <input
          type="text"
          id="floating_standard"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          onClick={onClick}
          value={value}
          ref={ref}
        />
        <label
          htmlFor="floating_standard"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Check Close
        </label>
      </div>
    )
  );

  return (
    <div className="self-stretch h-[634px] shrink-0 flex flex-col py-0 px-[92px] box-border items-start justify-center bg-[url(/section-jumbotron@3x.png)] bg-cover bg-no-repeat bg-[top] relative text-left text-17xl text-neutrals font-body-txt-body-s-regular lg:pl-24 lg:pr-24 lg:box-border md:h-[800px] md:items-start md:justify-start md:pl-8 md:pt-5 md:pr-8 md:box-border sm:pl-2 sm:pr-2 sm:pb-0 sm:box-border sm:relative">
      <div className="self-stretch flex flex-col items-start justify-start relative gap-[10px] sm:flex-1 sm:gap-[10px]">
        <ContainerHeaderContent />
        <div
          className="self-stretch my-0 mx-[!important] absolute top-[274px] left-[12px] rounded-2xl bg-neutrals shadow-[0px_4px_16px_rgba(17,_34,_17,_0.05)] flex flex-col py-8 px-6 box-border items-end justify-center gap-[32px] [&.animate]:animate-[1s_ease-in_0s_1_normal_forwards_fade-in] opacity-[0] min-w-full z-[1] text-xl text-darkslategray-300 font-montserrat-semibold-14 lg:self-stretch lg:w-auto md:self-stretch md:w-auto md:h-auto sm:self-stretch sm:w-auto sm:items-center sm:justify-center"
          data-animate-on-scroll
        >
          <div className="self-stretch relative font-semibold">
            Temukan Hotel Impianmu Sekarang!
          </div>
          <div className="self-stretch flex flex-row items-center justify-start gap-[16px] text-base md:flex-col">
            <div className="relative z-0 w-full">
              <input type="text" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label htmlFor="floating_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cari kota, negara, provinsi</label>
            </div>


            <DatePicker
              selected={startDateOpen}
              onChange={(date: Date) => setStartDateOpen(date)}
              customInput={<InputPickDateCheckOpen value={startDateOpen.toDateString()} onClick={() => { }} />}
              value={startDateOpen ? startDateOpen.toDateString() : ''}
            />

            <DatePicker
              selected={startDateClose}
              onChange={(date: Date) => setStartDateClose(date)}
              customInput={<InputPickDateCheckClose value={startDateClose.toDateString()} onClick={() => { }} />}
              value={startDateClose ? startDateClose.toDateString() : ''}
            />


          </div>
          <div className="self-stretch flex flex-row items-center justify-end">
            <div className="flex flex-col items-start justify-start">
              <button className="cursor-pointer [border:none] py-2 px-4 bg-darkslategray-300 rounded h-12 shrink-0 flex flex-row box-border items-center justify-center gap-[4px] hover:bg-gray-700 active:bg-gray-700">
                <img
                  className="relative w-4 h-4 shrink-0 overflow-hidden"
                  alt=""
                  src="/building2.svg"
                />
                <div className="relative text-sm font-medium font-montserrat-semibold-14 text-neutrals text-left">
                  Show Places
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JumbotronSection;

import type { NextPage } from "next";

const SectionHotelPolicy: NextPage = () => {
  return (
    <div className="self-stretch flex flex-col py-9 px-[92px] items-start justify-start text-left text-[18px] text-darkslategray-300 font-body-txt-body-s-regular">
      <div className="self-stretch flex flex-col items-start justify-start">
        <div className="self-stretch flex flex-col items-start justify-start gap-[20px]">
          <b className="self-stretch relative">Hotel Policy</b>
          <div className="self-stretch flex flex-col items-start justify-start">
            <div className="relative font-medium">
              Terms and Conditions
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start text-[inherit] text-darkslategray-100 font-inherit">
            <div className="self-stretch relative font-medium opacity-[0.75]">
              <ul className="m-0 pl-[27px] flex flex-col">
                <li className="mb-0">
                  a. Check-in time is 14:00 and check-out time is 12:00.
                </li>
                <li className="mb-0">
                  b. Early check-in and late check-out are subject to room availability and may incur additional charges.
                </li>
                <li className="mb-0">
                  c. A government-issued identification card and a valid credit card are required upon check-in.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionHotelPolicy;

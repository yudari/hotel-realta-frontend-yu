import type { NextPage } from "next";

const SectionDetailDiri: NextPage = () => {
  return (
    <div className="self-stretch flex flex-col py-0 px-[92px] items-start justify-start text-left text-base text-black font-body-txt-body-s-regular">
      <div className="rounded-xl bg-neutrals shadow-[0px_4px_16px_rgba(0,_0,_0,_0.25)] w-[1232px] flex flex-row items-start justify-start">
        <div className="flex-1 flex flex-col py-3 px-4 items-start justify-start gap-[16px]">
          <div className="self-stretch flex flex-row items-start justify-start">
            <div className="flex-1 relative font-semibold">
              Hotel Lendosis Perintis Kemerdekaan
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start text-sm">
            <div className="flex-1 relative font-medium">
              Jln. Awang Long RT.030, Samarinda
            </div>
          </div>
          <div className="self-stretch flex flex-row py-3 px-0 items-start justify-start gap-[10px] border-t-[1px] border-solid border-black">
            <div className="flex-1 overflow-hidden flex flex-col items-start justify-start gap-[24px]">
              <div className="self-stretch flex flex-col items-start justify-start gap-[2px]">
                <div className="self-stretch relative font-semibold">
                  Full Name
                </div>
                <div className="self-stretch relative">Yudha Satria</div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[2px]">
                <div className="self-stretch relative font-semibold">
                  No. Handphone
                </div>
                <div className="self-stretch relative">Yudha Satria</div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[2px]">
                <div className="self-stretch relative font-semibold">
                  Email Address
                </div>
                <div className="self-stretch relative">
                  yuda.satria024@gmail.com
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-hidden flex flex-col items-start justify-start gap-[24px]">
              <div className="self-stretch flex flex-col items-start justify-start gap-[2px]">
                <div className="self-stretch relative font-semibold">
                  Check In
                </div>
                <div className="self-stretch relative">02-24-2023</div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[2px]">
                <div className="self-stretch relative font-semibold">
                  Check Out
                </div>
                <div className="self-stretch relative">02-24-2023</div>
              </div>
            </div>
            <div className="flex-1 overflow-hidden flex flex-col items-start justify-start gap-[24px]">
              <div className="self-stretch flex flex-col items-start justify-start gap-[2px]">
                <div className="self-stretch relative font-semibold">Guest</div>
                <div className="self-stretch relative">4 People</div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[2px]">
                <div className="self-stretch relative font-semibold">Rooms</div>
                <div className="self-stretch relative">2 Rooms</div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[2px]">
                <div className="self-stretch relative font-semibold">
                  Rooms Type
                </div>
                <div className="self-stretch relative">
                  Indonesia Deluxe Double
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionDetailDiri;

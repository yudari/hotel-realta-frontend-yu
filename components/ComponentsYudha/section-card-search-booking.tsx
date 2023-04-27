import type { NextPage } from "next";

const SectionCardSearchBooking: NextPage = () => {
  return (
    <div className="self-stretch rounded-2xl bg-neutrals shadow-[0px_4px_16px_rgba(17,_34,_17,_0.05)] flex flex-col py-8 px-[92px] items-end justify-center gap-[32px] text-left text-[16px] text-darkslategray-300 font-montserrat-semibold-14">
      <div className="self-stretch flex flex-row items-start justify-start gap-[16px] flex-wrap yu_mq720:self-stretch yu_mq720:w-auto yu_mq720:h-auto yu_mq720:flex-col">
        <div className="flex-1 rounded-t rounded-b-none h-14 flex flex-col items-start justify-start yu_mq720:flex-[unset] yu_mq720:self-stretch">
          <div className="self-stretch rounded bg-neutrals flex flex-col items-start justify-start border-[1px] border-solid border-gray-300">
            <div className="self-stretch rounded-t rounded-b-none flex flex-row py-1 pr-4 pl-0 items-center justify-start">
              <div className="w-12 h-12 shrink-0 flex flex-col items-center justify-center">
                <div className="rounded-81xl overflow-hidden flex flex-row items-center justify-center">
                  <div className="flex flex-row p-2 items-center justify-center">
                    <img
                      className="relative w-6 h-6 shrink-0 overflow-hidden"
                      alt=""
                      src="/component-24.svg"
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1 h-10 flex flex-col items-start justify-center relative">
                <div className="self-stretch flex flex-row items-center justify-start z-[0]">
                  <div className="flex-1 relative">
                    DKI Jakarta, Jakarta Barat
                  </div>
                </div>
                <div className="my-0 mx-[!important] absolute top-[-16px] left-[-36px] bg-neutrals flex flex-row py-0 px-1 items-center justify-start z-[1] text-[14px]">
                  <div className="relative">Enter Destination</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 rounded-t rounded-b-none h-14 flex flex-col items-start justify-start yu_mq720:flex-[unset] yu_mq720:self-stretch">
          <div className="self-stretch rounded bg-neutrals flex flex-col items-start justify-start border-[1px] border-solid border-gray-300">
            <div className="self-stretch rounded-t rounded-b-none flex flex-row py-1 pr-0 pl-4 items-center justify-start">
              <div className="flex-1 flex flex-col items-start justify-center relative">
                <div className="self-stretch flex flex-row items-center justify-start z-[0]">
                  <div className="flex-1 relative">Fri 12/2</div>
                </div>
                <div className="my-0 mx-[!important] absolute top-[-16px] left-[-4px] bg-neutrals flex flex-row py-0 px-1 items-center justify-start z-[1] text-[14px]">
                  <div className="relative">Check Open</div>
                </div>
              </div>
              <div className="w-12 h-12 shrink-0 flex flex-col p-3 box-border items-center justify-center">
                <img
                  className="relative w-6 h-6 shrink-0 overflow-hidden"
                  alt=""
                  src="/calendar.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 rounded-t rounded-b-none h-14 flex flex-col items-start justify-start yu_mq720:flex-[unset] yu_mq720:self-stretch">
          <div className="self-stretch rounded bg-neutrals flex flex-col items-start justify-start border-[1px] border-solid border-gray-300">
            <div className="self-stretch rounded-t rounded-b-none flex flex-row py-1 pr-0 pl-4 items-center justify-start">
              <div className="flex-1 flex flex-col items-start justify-center relative">
                <div className="self-stretch flex flex-row items-center justify-start z-[0]">
                  <div className="flex-1 relative">Sun 12/4</div>
                </div>
                <div className="my-0 mx-[!important] absolute top-[-16px] left-[-4px] bg-neutrals flex flex-row py-0 px-1 items-center justify-start z-[1] text-[14px]">
                  <div className="relative">Check Close</div>
                </div>
              </div>
              <div className="w-12 h-12 shrink-0 flex flex-col p-3 box-border items-center justify-center">
                <img
                  className="relative w-6 h-6 shrink-0 overflow-hidden"
                  alt=""
                  src="/calendar.svg"
                />
              </div>
            </div>
          </div>
          <div className="self-stretch hidden flex-row pt-1 px-4 pb-0 items-start justify-start text-[14px] text-gray-400">
            <div className="flex-1 relative">Supporting text</div>
          </div>
        </div>
        <div className="flex-1 rounded-t rounded-b-none h-14 flex flex-col items-start justify-start yu_mq720:flex-[unset] yu_mq720:self-stretch">
          <div className="self-stretch rounded bg-neutrals flex flex-col items-start justify-start border-[1px] border-solid border-gray-300">
            <div className="self-stretch rounded-t rounded-b-none flex flex-row py-1 px-0 items-center justify-start">
              <div className="w-12 h-12 shrink-0 flex flex-col items-center justify-center">
                <div className="rounded-81xl overflow-hidden flex flex-row items-center justify-center">
                  <div className="flex flex-row p-2 items-center justify-center">
                    <img
                      className="relative w-6 h-6 shrink-0 overflow-hidden"
                      alt=""
                      src="/user.svg"
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-center relative">
                <div className="self-stretch flex flex-row items-center justify-start z-[0]">
                  <div className="flex-1 relative">1 room, 2 guests</div>
                </div>
                <div className="my-0 mx-[!important] absolute top-[-16px] left-[-36px] bg-neutrals flex flex-row py-0 px-1 items-center justify-start z-[1] text-[14px]">
                  <div className="relative">{`Rooms & Guests`}</div>
                </div>
              </div>
              <div className="w-12 h-12 shrink-0 flex flex-col p-3 box-border items-center justify-center">
                <img
                  className="relative w-6 h-6 shrink-0 overflow-hidden"
                  alt=""
                  src="/chevron-down.svg"
                />
              </div>
            </div>
          </div>
          <div className="self-stretch hidden flex-row pt-1 px-4 pb-0 items-start justify-start text-[14px] text-gray-400">
            <div className="flex-1 relative">Supporting text</div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-row items-center justify-end">
        <div className="flex flex-col items-start justify-start">
          <button className="cursor-pointer [border:none] py-2 px-4 bg-darkslategray-300 rounded h-12 shrink-0 flex flex-row box-border items-center justify-center gap-[4px]">
            <img
              className="relative w-4 h-4 shrink-0 overflow-hidden"
              alt=""
              src="/building.svg"
            />
            <div className="relative text-[14px] font-medium font-montserrat-semibold-14 text-neutrals text-left">
              Show Places
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionCardSearchBooking;

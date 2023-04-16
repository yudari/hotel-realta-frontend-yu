import type { NextPage } from "next";

interface SectionDetailDiriProps {
  dataDetailDiri: any;
  onComponentRef: any;
}

const SectionDetailDiri: NextPage<SectionDetailDiriProps> = (props) => {
  return (
    <div ref={props.onComponentRef} className="self-stretch print:px-[0px] w-full  print:max-w-[1330px] flex flex-col py-0 px-[92px]  items-start justify-start text-left text-[16px] text-black font-body-txt-body-s-regular">
      <div className="rounded-[18px] bg-neutrals shadow-[0px_4px_16px_rgba(17,_34,_17,_0.05)] w-full flex flex-row items-start justify-start">
        <div className="flex-1 flex flex-col py-3 px-4 items-start justify-start gap-[16px]">
          <div className="self-stretch flex flex-row items-start justify-start">
            <div className="flex-1 relative font-semibold">
              {props.dataDetailDiri.name_hotel}
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start text-[14px]">
            <div className="flex-1 relative font-medium">
              {props.dataDetailDiri.alamat_hotel}
            </div>
          </div>
          <div className="self-stretch flex flex-row py-3 px-0 items-start justify-start gap-[10px] border-t-[1px] border-solid border-black">
            <div className="flex-1 overflow-hidden flex flex-col items-start justify-start gap-[24px]">
              <div className="self-stretch flex flex-col items-start justify-start gap-[2px]">
                <div className="self-stretch relative font-semibold">
                  Full Name
                </div>
                <div className="self-stretch relative">{props.dataDetailDiri.user_booking_full_name}</div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[2px]">
                <div className="self-stretch relative font-semibold">
                  No. Handphone
                </div>
                <div className="self-stretch relative">{props.dataDetailDiri.user_handphone}</div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[2px]">
                <div className="self-stretch relative font-semibold">
                  Email Address
                </div>
                <div className="self-stretch relative">
                  {props.dataDetailDiri.user_email}
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-hidden flex flex-col items-start justify-start gap-[24px]">
              <div className="self-stretch flex flex-col items-start justify-start gap-[2px]">
                <div className="self-stretch relative font-semibold">
                  Check In
                </div>
                <div className="self-stretch relative">{props.dataDetailDiri.user_book_checkIn}</div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[2px]">
                <div className="self-stretch relative font-semibold">
                  Check Out
                </div>
                <div className="self-stretch relative">{props.dataDetailDiri.user_book_checkOut}</div>
              </div>
            </div>
            <div className="flex-1 overflow-hidden flex flex-col items-start justify-start gap-[24px]">
              <div className="self-stretch flex flex-col items-start justify-start gap-[2px]">
                <div className="self-stretch relative font-semibold">Guest</div>
                <div className="self-stretch relative">{props.dataDetailDiri.user_book_total_guest} People</div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[2px]">
                <div className="self-stretch relative font-semibold">Rooms</div>
                <div className="self-stretch relative">{props.dataDetailDiri.user_book_total_rooms} Rooms</div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[2px]">
                <div className="self-stretch relative font-semibold">
                  Rooms Type
                </div>
                <div className="self-stretch relative">
                  {props.dataDetailDiri.user_room_type}
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

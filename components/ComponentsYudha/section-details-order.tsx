import type { NextPage } from "next";
import { forwardRef, useCallback, useState } from "react";
import { useRouter } from "next/router";
import ReactDatePicker from "react-datepicker";

interface SectionDetailsOrderInterface {
  dataBookings: any;
  startDateFinal: any;
  endDateFinal: any;
}

const SectionDetailsOrder: NextPage<SectionDetailsOrderInterface> = (props) => {
  const [startDateOpen, setStartDateOpen] = useState<Date>(new Date());
  const [startDateClose, setStartDateClose] = useState<Date>(new Date());

  const router = useRouter();

  const onButtonLanjutBookingClick = useCallback(() => {
    router.push("/detail-booking-pembayaran-fina");
  }, [router]);

  const ButtonPickDateCheckIn = forwardRef<HTMLButtonElement, { value: string; onClick: () => void }>((props, ref) => (
    <button onClick={props.onClick} ref={ref} className="cursor-pointer border-none py-1 px-0.5 bg-seagreen rounded w-95 shrink-0 flex flex-row box-border items-center justify-center gap-2">
      <img
        className="relative w-5 h-19 shrink-0 overflow-hidden"
        alt=""
        src="/claritydatesolid2.svg"
      />
      <div className="flex-1 relative text-xs font-semibold font-montserrat-semibold-14 text-neutrals text-center">
        {props.value}
      </div>
    </button>
  ));

  const ButtonPickDateCheckOut = forwardRef<HTMLButtonElement, { value: string; onClick: () => void }>((props, ref) => (
    <div onClick={props.onClick} className="rounded bg-crimson cursor-pointer w-[95px] shrink-0 flex flex-row py-1 px-0.5 box-border items-center justify-center gap-[2px]">
      <img
        className="relative w-5 h-[19px] shrink-0 overflow-hidden"
        alt=""
        src="/claritydatesolid2.svg"
      />
      <div className="flex-1 relative font-semibold">{props.value}</div>
    </div>
  ));




  if (!(props.startDateFinal instanceof Date && !isNaN(props.startDateFinal.getTime()))) {
    console.error("Invalid start date", props.startDateFinal);
    // Handle the error as appropriate
  } else {
    setStartDateOpen(props.startDateFinal);
  }

  if (!(props.endDateFinal instanceof Date && !isNaN(props.endDateFinal.getTime()))) {
    console.error("Invalid end date", props.endDateFinal);
    // Handle the error as appropriate
  } else {
    setStartDateClose(props.endDateFinal);
  }
  const formattedStartDate = startDateOpen.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  const totalPrice: number = parseInt(props.dataBookings.data.total_price.replace(/[^\d]/g, '').slice(0, -2));
  const totalPriceReal: number = parseInt(props.dataBookings.data.total_price_real.replace(/[^\d]/g, '').slice(0, -2));
  const JumlahPenguranganPrice = totalPriceReal - totalPrice
  const finalTotalPrice = totalPriceReal - JumlahPenguranganPrice

  // Output: Hasil pengurangan uang dalam bentuk number
  return (
    <div className="self-stretch body-txt-body-s-regular flex flex-col py-[42px] px-[92px] items-start justify-start text-left text-xl text-darkslategray-300 font-body-txt-body-s-regular">
      <div className="rounded-t rounded-b-none w-[1232px] flex flex-row py-1 pr-4 pl-0 box-border items-center justify-start gap-[30px]">
        <div className="flex-1 flex flex-col items-start justify-start gap-[16px]">
          <div className="w-[498px] flex flex-row items-center justify-start text-3xl">
            <b className="flex-1 relative">
              {props.dataBookings.data.data_rooms[0].hotel.hotel_name}
            </b>
          </div>
          <div className="flex flex-col items-start justify-start gap-[8px] text-sm text-darkslategray-100">
            <div className="self-stretch flex flex-row items-start justify-between">
              <img
                className="relative w-[18px] h-[18px] shrink-0 overflow-hidden"
                alt=""
                src="/location.svg"
              />
              <div className="relative font-medium opacity-[0.75]">{`${props.dataBookings.data.data_rooms[0].hotel.address.addr_line1}, ${props.dataBookings.data.data_rooms[0].hotel.address.city.city_name}, ${props.dataBookings.data.data_rooms[0].hotel.address.city.provinces.prov_name}, ${props.dataBookings.data.data_rooms[0].hotel.address.city.provinces.country.country_name}`} </div>
            </div>
            <div className="self-stretch flex flex-row items-center justify-start gap-[4px] text-xs text-darkslategray-300 font-montserrat-semibold-14">
              <div className="w-10 shrink-0 flex flex-col items-start justify-start">
                <div className="self-stretch rounded box-border h-8 shrink-0 flex flex-row py-2 px-4 items-center justify-center border-[1px] border-solid border-darkslategray-300">
                  <div className="relative font-medium">{props.dataBookings.data.data_rooms[0].hotel.hotel_rating_star}</div>
                </div>
              </div>
              <div className="relative font-medium text-darkslategray-100 opacity-[0.75]">
                Very Good {props.dataBookings.data.data_rooms[0].hotel.hotel_reviews.length} reviews
              </div>
            </div>
            <div className="rounded-sm bg-slamon shadow-[0px_1px_4px_rgba(0,_0,_0,_0.25)] w-[88px] flex flex-col py-1 px-3 box-border items-center justify-center text-5xs text-neutrals">
              <div className="self-stretch relative font-medium ">
                {props.dataBookings.data.data_rooms[0].faci_memb_name} MEMBER
              </div>
            </div>
          </div>
          <div className="self-stretch overflow-hidden flex flex-col py-[25px] px-0 items-start justify-start gap-[10px]">
            <b className="self-stretch relative">Deskripsi</b>
            <div className="self-stretch relative text-base font-medium text-darkslategray-100 opacity-[0.75]">
              {props.dataBookings.data.data_rooms[0].hotel.hotel_description}
            </div>
          </div>
          <div className="self-stretch overflow-hidden flex flex-col pt-0 px-0 pb-[25px] items-start justify-start text-blackish-green">
            <div className="self-stretch flex flex-col items-start justify-start gap-[32px]">
              <b className="self-stretch relative">Fasilitas</b>
              <div className="self-stretch flex flex-row items-start justify-between text-base font-montserrat-semibold-14">
                <div className="w-[229px] shrink-0 flex flex-col items-start justify-start gap-[24px]">
                  {props.dataBookings.data.data_rooms[0].hotel.facilities_support.map((dataFaciSupport: any) => {
                    return <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">
                      <img
                        className="relative w-6 h-6 shrink-0 overflow-hidden"
                        alt={dataFaciSupport.fs_name}
                        src={dataFaciSupport.fs_icon_url}
                      />
                      <div className="relative font-medium text-darkslategray-100 opacity-[0.75]">{dataFaciSupport.fs_name}</div>
                    </div>
                  })}

                </div>
                {/* <div className="flex flex-col items-start justify-start gap-[24px]">
                  <div className="flex flex-row items-center justify-start gap-[8px]">
                    <img
                      className="relative w-6 h-6 shrink-0 overflow-hidden"
                      alt=""
                      src="/makifitnesscentre.svg"
                    />
                    <div className="relative font-medium">Fitness center</div>
                  </div>
                  <div className="flex flex-row items-center justify-start gap-[8px]">
                    <img
                      className="relative w-6 h-6 shrink-0 overflow-hidden"
                      alt=""
                      src="/ionwine.svg"
                    />
                    <div className="relative font-medium">Bar/Lounge</div>
                  </div>
                  <div className="flex flex-row items-center justify-start gap-[8px]">
                    <img
                      className="relative w-6 h-6 shrink-0 overflow-hidden"
                      alt=""
                      src="/wifi.svg"
                    />
                    <div className="relative font-medium">Free Wi-Fi</div>
                  </div>
                  <div className="self-stretch flex flex-row items-center justify-between">
                    <img
                      className="relative w-6 h-6 shrink-0 overflow-hidden"
                      alt=""
                      src="/breakfast.svg"
                    />
                    <div className="relative font-medium">
                      Tea/coffee machine
                    </div>
                  </div>
                  <button className="cursor-pointer [border:none] p-0 bg-[transparent] self-stretch relative text-base font-semibold font-montserrat-semibold-14 text-slamon text-left inline-block">
                    +24 more
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-neutrals shadow-[0px_4px_16px_rgba(17,_34,_17,_0.05)] w-[391px] shrink-0 flex flex-col py-8 px-6 box-border items-center justify-start text-center text-xs">
          <div className="self-stretch flex flex-col items-start justify-start gap-[10px]">
            <div className="self-stretch flex flex-row items-center justify-start gap-[32px] text-left text-base">
              <div className="flex-1 relative font-semibold">
                Login untuk booking
              </div>
              <button className="cursor-pointer [border:none] py-2 px-7 bg-darkslategray-300 rounded w-[110px] h-10 shrink-0 flex flex-row box-border items-center justify-center">
                <div className="relative text-base leading-[148%] font-body-txt-body-s-regular text-neutrals text-center">
                  Login
                </div>
              </button>
            </div>
            <div className="self-stretch relative bg-darkslategray-300 h-[0.5px] shrink-0 opacity-[0.25]" />
            <div className="self-stretch flex flex-row items-start justify-start gap-[14px] text-neutrals font-montserrat-semibold-14">
              <ReactDatePicker className="z-50"
                selected={startDateOpen}
                onChange={(date: Date) => setStartDateOpen(date)}
                dateFormat="MM/dd/yyyy"
                customInput={<ButtonPickDateCheckIn value={startDateOpen.toLocaleDateString()} onClick={function (): void {
                }} />}
              />
              {/* <button className="cursor-pointer [border:none] py-1 px-0.5 bg-seagreen rounded w-[95px] shrink-0 flex flex-row box-border items-center justify-center gap-[2px]">
                <img
                  className="relative w-5 h-[19px] shrink-0 overflow-hidden"
                  alt=""
                  src="/claritydatesolid2.svg"
                />
                <div className="flex-1 relative text-xs font-semibold font-montserrat-semibold-14 text-neutrals text-center">
                  {props.startDateFinal}
                </div>
              </button> */}
              <ReactDatePicker
                selected={startDateClose}
                onChange={(date: Date) => setStartDateClose(date)}
                dateFormat="MM/dd/yyyy"
                customInput={<ButtonPickDateCheckOut value={startDateClose.toLocaleDateString()} onClick={function (): void {
                }} />}
              />
              <div className="self-stretch rounded bg-slamon w-[125px] shrink-0 flex flex-row py-1 px-0.5 box-border items-center justify-center">
                <div className="flex-1 relative font-semibold">
                  {props.dataBookings.data.data_rooms[0].faci_room_number} Room, 2 Guest
                </div>
              </div>
            </div>
            <div className="self-stretch relative bg-darkslategray-300 h-[0.5px] shrink-0 opacity-[0.25]" />
            <div className="self-stretch flex flex-col items-start justify-start gap-[8px]">
              <div className="self-stretch flex flex-col items-start justify-start">
                <div className="self-stretch flex flex-row items-start justify-between">
                  <div className="relative font-medium text-left">
                    {props.dataBookings.data.total_price}/malam
                  </div>
                  <div className="relative [text-decoration:line-through] font-medium inline-block w-[96.5px] shrink-0">
                    {props.dataBookings.data.total_price_real}
                  </div>
                  <div className="relative text-slamon inline-block w-[96.5px] shrink-0">
                    {parseFloat(props.dataBookings.data.data_rooms[0].faci_discount) * 100}% Off
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start text-left">
                <div className="self-stretch flex flex-row items-start justify-start">
                  <div className="flex-1 relative">Include Pajak</div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start text-left">
                <div className="self-stretch flex flex-row items-start justify-start">
                  <div className="flex-1 relative font-semibold">
                    {props.dataBookings.data.data_rooms[0].faci_name}
                  </div>
                </div>
              </div>
              <button className="cursor-pointer py-3 px-[52px] bg-neutrals flex-1 rounded box-border w-[343px] flex flex-row items-center justify-center border-[1px] border-solid border-darkslategray-300">
                <div className="flex-1 relative text-lg leading-[132%] font-body-txt-body-s-regular text-darkslategray-300 text-center">
                  Pilih Kupon
                </div>
              </button>
              <div className="self-stretch rounded bg-darkslategray-300 flex flex-row py-2.5 px-1.5 items-center justify-start gap-[16px] text-left text-neutrals">
                <div className="flex-1 relative leading-[132%] font-semibold">
                  Pilih Membership Gold Poin
                </div>
                <div className="relative leading-[132%] text-right hidden w-[78px] shrink-0">
                  Rp 20.000,00
                </div>
              </div>
              <div className="self-stretch flex flex-col pt-3 px-0 pb-0 items-start justify-start gap-[16px]">
                <div className="self-stretch relative bg-darkslategray-300 h-[0.5px] shrink-0 opacity-[0.25]" />
                <div className="self-stretch flex flex-row items-start justify-between">
                  <div className="relative leading-[132%]">Your Savings</div>
                  <div className="relative leading-[132%]">-{new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(JumlahPenguranganPrice)}</div>
                </div>
              </div>
              <div className="self-stretch flex flex-col pt-3 px-0 pb-0 items-start justify-start gap-[16px]">
                <div className="self-stretch relative bg-darkslategray-300 h-[0.5px] shrink-0 opacity-[0.25]" />
                <div className="self-stretch flex flex-row items-start justify-between">
                  <div className="flex flex-col items-start justify-start gap-[2px]">
                    <div className="relative leading-[132%]">Total Price</div>
                    <div className="relative leading-[132%]">
                      (*termasuk pajak*)
                    </div>
                  </div>
                  <div className="relative leading-[132%]">{new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(finalTotalPrice)}</div>
                </div>
              </div>
              <button
                className="cursor-pointer [border:none] py-2 px-4 bg-darkslategray-300 self-stretch rounded flex flex-row items-center justify-center"
                onClick={onButtonLanjutBookingClick}
              >
                <div className="flex-1 relative text-sm font-semibold font-montserrat-semibold-14 text-neutrals text-center">
                  Lanjut Booking
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionDetailsOrder;

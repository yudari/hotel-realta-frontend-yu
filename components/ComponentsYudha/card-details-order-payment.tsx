import type { NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/router";

const CardDetailsOrderPayment: NextPage = () => {
  const router = useRouter();

  const onButton3Click = useCallback(() => {
    router.push("/detail-pembayaran-invoice-fina");
  }, [router]);

  return (
    <div className="flex-1 rounded-xl bg-neutrals shadow-[0px_4px_16px_rgba(17,_34,_17,_0.05)] overflow-hidden flex flex-col p-6 items-start justify-start gap-[16px] text-left text-xs text-blackish-green font-montserrat-semibold-14">
      <div className="self-stretch flex flex-row items-center justify-start gap-[24px]">
        <img
          className="rounded-xl w-[121px] h-[120px] shrink-0 object-cover"
          alt=""
          src="/frame-186@2x.png"
        />
        <div className="self-stretch w-[257px] shrink-0 flex flex-col items-start justify-center gap-[16px]">
          <div className="self-stretch flex flex-col items-start justify-start gap-[4px]">
            <div className="self-stretch relative font-medium opacity-[0.75]">
              CVK Park Bosphorus...
            </div>
            <div className="self-stretch relative text-sm font-semibold text-darkslategray-300">
              CVK Park Bosphorus Hotel Kempinski Botani
            </div>
          </div>
          <div className="self-stretch flex flex-row items-center justify-between">
            <div className="w-10 shrink-0 flex flex-col items-start justify-start">
              <div className="self-stretch rounded box-border h-8 shrink-0 flex flex-row py-2 px-4 items-center justify-center border-[1px] border-solid border-mint-green">
                <div className="relative font-medium">4.2</div>
              </div>
            </div>
            <div className="relative">
              <b>Very Good</b>
              <span className="font-medium"> 54 reviews</span>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-row py-4 px-0 items-start justify-between text-center text-seagreen border-t-[1px] border-solid border-beige border-b-[1px]">
        <div className="rounded bg-neutrals w-[95px] shrink-0 flex flex-row py-1 px-0.5 box-border items-center justify-center gap-[2px]">
          <img
            className="relative w-5 h-[19px] shrink-0 overflow-hidden"
            alt=""
            src="/claritydatesolid.svg"
          />
          <div className="flex-1 relative font-semibold">12-02-2023</div>
        </div>
        <div className="rounded bg-neutrals w-[95px] shrink-0 flex flex-row py-1 px-0.5 box-border items-center justify-center gap-[2px] text-crimson">
          <img
            className="relative w-5 h-[19px] shrink-0 overflow-hidden"
            alt=""
            src="/claritydatesolid1.svg"
          />
          <div className="flex-1 relative font-semibold">12-02-2023</div>
        </div>
        <div className="self-stretch rounded bg-neutrals w-[115px] shrink-0 flex flex-row py-1 px-0.5 box-border items-center justify-center text-slamon">
          <div className="flex-1 relative font-semibold">20 Room, 2 Guest</div>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[16px] text-base">
        <b className="relative font-body-txt-body-s-regular">Detail Harga</b>
        <div className="self-stretch flex flex-row items-start justify-between">
          <div className="relative font-medium">Harga Ruangan</div>
          <div className="relative font-semibold">Rp 200.000,00</div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-between">
          <div className="relative font-medium">Diskon</div>
          <div className="relative font-semibold">-Rp 20.000,00</div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-between">
          <div className="relative font-medium">Pajak</div>
          <div className="relative font-semibold">+Rp 20.000,00</div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-between">
          <div className="relative font-medium">20% Kupon Diskon</div>
          <div className="relative font-semibold">-Rp 40.000,00</div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-between">
          <div className="relative font-medium">Member Gold</div>
          <div className="relative font-semibold">-Rp 15.000,00</div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-between">
          <div className="relative font-medium">Items</div>
          <div className="relative font-semibold">+Rp 40.000,00</div>
        </div>
      </div>
      <div className="self-stretch relative bg-blackish-green h-[0.5px] shrink-0 opacity-[0.25]" />
      <div className="self-stretch flex flex-row items-start justify-between text-base">
        <div className="relative font-medium">{`Total `}</div>
        <div className="relative font-semibold">Rp 165.000,00</div>
      </div>
      <div className="self-stretch flex flex-row items-start justify-start">
        <button
          className="cursor-pointer [border:none] py-2 px-4 bg-darkslategray-300 flex-1 rounded flex flex-row items-center justify-center"
          onClick={onButton3Click}
        >
          <div className="flex-1 relative text-sm font-semibold font-montserrat-semibold-14 text-neutrals text-center">
            Create Booking Order
          </div>
        </button>
      </div>
    </div>
  );
};

export default CardDetailsOrderPayment;

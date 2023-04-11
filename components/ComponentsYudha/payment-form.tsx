import type { NextPage } from "next";
import { useMemo } from "react";
import CSS, { Property } from "csstype";

type PaymentFormType = {
  /** Style props */
  propWidth?: Property.Width;
  propColor?: Property.Color;
};

const PaymentForm: NextPage<PaymentFormType> = ({ propWidth, propColor }) => {
  const inputDropdownTxtStyle: CSS.Properties = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  const bCAStyle: CSS.Properties = useMemo(() => {
    return {
      color: propColor,
    };
  }, [propColor]);

  return (
    <div className="flex-1 h-[146px] flex flex-col items-start justify-start gap-[6px] text-left text-[16px] text-grayscale-black font-body-txt-body-s-regular">
      <div
        className="w-[167.7px] flex flex-row items-start justify-start"
        style={inputDropdownTxtStyle}
      >
        <div className="relative leading-[148%]">Tipe Pembayaran</div>
      </div>
      <div className="self-stretch rounded-sm bg-neutrals shadow-[0px_8px_16px_rgba(62,_19,_77,_0.07)] flex flex-col py-0 px-px items-start justify-start text-[14px] text-grayscale-border border-[1px] border-solid border-grayscale-spacer-light">
        <div className="self-stretch rounded-sm flex flex-row p-3 items-center justify-start gap-[12px]">
          <div className="flex-1 flex flex-row items-start justify-start">
            <div className="flex-1 relative leading-[140%]" style={bCAStyle}>
              BCA
            </div>
          </div>
          <img
            className="relative w-4 h-4 shrink-0 overflow-hidden"
            alt=""
            src="/input-icon1.svg"
          />
        </div>
        <div className="self-stretch flex flex-col items-start justify-start text-grayscale-black">
          <div className="self-stretch flex flex-col pt-0 px-0 pb-2 items-start justify-start gap-[8px]">
            <div className="self-stretch relative box-border h-px shrink-0 border-t-[1px] border-solid border-grayscale-spacer-light" />
            <div className="self-stretch flex flex-row py-0 px-[11px] items-start justify-start">
              <div className="flex-1 flex flex-row items-start justify-start">
                <div className="flex-1 relative leading-[140%]">BCA</div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start text-neutrals">
            <div className="self-stretch relative box-border h-px shrink-0 border-t-[1px] border-solid border-grayscale-spacer-light" />
            <div className="self-stretch bg-darkslategray-300 flex flex-row py-2 px-[11px] items-start justify-start">
              <div className="flex-1 relative leading-[140%]">Go To</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;

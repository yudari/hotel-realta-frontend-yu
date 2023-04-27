import type { NextPage } from "next";

type ModalAddItemType = {
  onClose?: () => void;
};

const ModalAddItem: NextPage<ModalAddItemType> = ({ onClose }) => {
  return (
    <div className="relative rounded bg-neutrals shadow-[0px_5px_10px_rgba(62,_19,_77,_0.47)] w-[517px] h-[389px] overflow-hidden max-w-full max-h-full text-left text-[14px] text-neutrals font-body-txt-body-s-regular">
      <div className="absolute top-[0px] left-[0px] bg-darkslategray-300 w-[517px] overflow-hidden flex flex-row py-[18px] px-[45px] box-border items-center justify-start text-[12px]">
        <div className="flex-1 relative leading-[150%] font-semibold">
          Tambah Items
        </div>
      </div>
      <div className="absolute top-[97px] left-[45px] w-[398px] h-[74px] text-grayscale-border">
        <div className="absolute top-[30px] left-[0px] rounded-sm w-[398px] flex flex-col items-start justify-start">
          <div className="self-stretch rounded-sm bg-neutrals shadow-[0px_4px_5px_rgba(33,_1,_38,_0.03)_inset] box-border h-11 shrink-0 flex flex-row p-3 items-start justify-start gap-[10px] border-[1px] border-solid border-grayscale-spacer-light">
            <div className="flex-1 relative leading-[140%]">Pilih Item</div>
            <img
              className="relative w-4 h-4 shrink-0 overflow-hidden"
              alt=""
              src="/input-icon.svg"
            />
          </div>
        </div>
        <div className="absolute top-[0px] left-[0px] w-[117.98px] flex flex-row items-start justify-start text-[16px] text-grayscale-black">
          <div className="relative leading-[148%]">Nama Item</div>
        </div>
      </div>
      <div className="absolute top-[193px] left-[45px] w-[398px] h-[77px] text-grayscale-border">
        <div className="absolute top-[33px] left-[0px] rounded-sm bg-neutrals box-border w-[398px] flex flex-row p-3 items-center justify-start border-[1px] border-solid border-grayscale-spacer-light">
          <div className="flex-1 flex flex-row items-start justify-start">
            <div className="flex-1 relative leading-[140%]">2</div>
          </div>
        </div>
        <div className="absolute top-[0px] left-[0px] w-[167.7px] h-6 text-[16px] text-grayscale-black">
          <div className="absolute top-[0px] left-[0px] w-[167.7px] flex flex-row items-start justify-start">
            <div className="relative leading-[148%]">Jumlah Item</div>
          </div>
        </div>
      </div>
      <div className="absolute top-[303px] left-[261px] w-[182px] h-[34px] text-center">
        <div className="absolute top-[0px] left-[97px] rounded bg-mediumseagreen box-border w-[85px] h-[34px] flex flex-row p-3 items-center justify-center border-[1px] border-solid border-mediumseagreen">
          <div className="relative leading-[140%]">Save</div>
        </div>
        <button
          className="cursor-pointer p-3 bg-neutrals absolute top-[0px] left-[0px] rounded box-border w-[85px] h-[34px] flex flex-row items-center justify-center border-[1px] border-solid border-brown"
          onClick={onClose}
        >
          <div className="relative text-[14px] leading-[140%] font-body-txt-body-s-regular text-brown text-center">
            Cancel
          </div>
        </button>
      </div>
    </div>
  );
};

export default ModalAddItem;

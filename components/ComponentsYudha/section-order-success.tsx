import type { NextPage } from "next";

type SectionOrderSuccessType = {
  confirmationMessage?: string;

  /** Action props */
  onFrameContainer4Click?: () => void;
};

const SectionOrderSuccess: NextPage<SectionOrderSuccessType> = ({
  confirmationMessage,
  onFrameContainer4Click,
}) => {
  return (
    <div className="self-stretch no-print flex flex-col py-7 px-[92px] items-start justify-start text-left text-[16px] text-slamon font-body-txt-body-s-regular">
      <div
        className="flex flex-row items-center justify-start gap-[4px] cursor-pointer hover:text-lightcoral hover:cursor-pointer"
        onClick={onFrameContainer4Click}
      >
        {/* <img
          className="relative w-[18px] h-[18px] shrink-0 overflow-hidden"
          alt=""
          src="/materialsymbolsarrowbackiosnewrounded.svg"
        /> */}
        <p className="m-0 relative font-semibold">{confirmationMessage}</p>
      </div>
    </div>
  );
};

export default SectionOrderSuccess;

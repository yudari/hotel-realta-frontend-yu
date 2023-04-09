import type { NextPage } from "next";
import { useCallback, useMemo } from "react";
import CSS, { Property } from "csstype";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

type HeaderNavbarType = {
  vector?: string;
  vector1?: string;
  vector2?: string;
  vector3?: string;
  vector4?: string;
  vector5?: string;
  vector6?: string;
  vector7?: string;
  vector8?: string;
  vector9?: string;

  /** Style props */
  headerLogginSectionHeaderJustifyContent?: Property.JustifyContent;
  headerLogginSectionHeaderAlignSelf?: Property.AlignSelf;
  headerLogginSectionHeaderWidth?: Property.Width;
  vectorRight?: Property.Right;
  vectorLeft?: Property.Left;
  vectorLeft1?: Property.Left;
  vectorLeft2?: Property.Left;

  /** Action props */
  onFrameButtonClick?: () => void;
};

const HeaderNavbar: NextPage<HeaderNavbarType> = ({
  vector,
  vector1,
  vector2,
  vector3,
  vector4,
  vector5,
  vector6,
  vector7,
  vector8,
  vector9,
  headerLogginSectionHeaderJustifyContent,
  headerLogginSectionHeaderAlignSelf,
  headerLogginSectionHeaderWidth,
  vectorRight,
  vectorLeft,
  vectorLeft1,
  vectorLeft2,
  onFrameButtonClick,
}) => {
  const headerLoggedInStyle: CSS.Properties = useMemo(() => {
    return {
      justifyContent: headerLogginSectionHeaderJustifyContent,
      alignSelf: headerLogginSectionHeaderAlignSelf,
      width: headerLogginSectionHeaderWidth,
    };
  }, [
    headerLogginSectionHeaderJustifyContent,
    headerLogginSectionHeaderAlignSelf,
    headerLogginSectionHeaderWidth,
  ]);

  const vectorIconStyle: CSS.Properties = useMemo(() => {
    return {
      right: vectorRight,
      left: vectorLeft,
    };
  }, [vectorRight, vectorLeft]);

  const vectorIcon1Style: CSS.Properties = useMemo(() => {
    return {
      left: vectorLeft1,
    };
  }, [vectorLeft1]);

  const vectorIcon2Style: CSS.Properties = useMemo(() => {
    return {
      left: vectorLeft2,
    };
  }, [vectorLeft2]);
  const router = useRouter()

  const onBannerHeaderClick = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div
      className="self-stretch bg-neutrals shadow-[0px_4px_16px_rgba(17,_34,_17,_0.05)] flex flex-col py-[21px] px-[92px] items-start justify-center text-left text-lg text-dimgray font-yeseva-one md:pl-5 md:pt-[21px] md:pr-5 md:box-border"
      style={headerLoggedInStyle}
    >
      <div className="self-stretch flex flex-row items-center justify-between sm:flex-col sm:gap-[32px]">
        <button
          className="cursor-pointer [border:none] p-0 bg-[transparent] w-[111px] h-10 shrink-0 flex flex-col items-start justify-between"
          onClick={onFrameButtonClick}
        >
          <div className="w-[111px] flex flex-row items-center justify-start gap-[4px]">
            <img
              className="relative w-6 h-6 shrink-0 overflow-hidden"
              alt=""
              src="/ionbed.svg"
            />
            <div className="flex-1 relative text-sm font-semibold font-montserrat-semibold-14 text-darkslategray-300 text-left">
              Find Places
            </div>
          </div>
          <div className="self-stretch relative bg-darkslategray-300 h-[5px] shrink-0" />
        </button>
        <div className="w-[190px] shrink-0 flex flex-col items-center justify-start sm:order-[-1]">
          <div className="relative w-[34px] h-[34px] shrink-0 overflow-hidden">
            <img
              className="absolute h-[99.19%] w-[99.17%] top-[0.4%] right-[0.41%] bottom-[0.41%] left-[0.41%] max-w-full overflow-hidden max-h-full"
              alt=""
              src="/vector.svg"
            />
            <img
              className="absolute h-[3.12%] w-[3.12%] top-[27.38%] right-[84.91%] bottom-[69.5%] left-[11.97%] max-w-full overflow-hidden max-h-full"
              alt=""
              src={vector}
            />
            <img
              className="absolute h-[3.12%] w-[3.12%] top-[11.97%] right-[69.5%] bottom-[84.91%] left-[27.38%] max-w-full overflow-hidden max-h-full"
              alt=""
              src={vector1}
            />
            <img
              className="absolute h-[3.12%] w-[3.12%] top-[11.97%] right-[27.38%] bottom-[84.91%] left-[69.5%] max-w-full overflow-hidden max-h-full"
              alt=""
              src="/vector3.svg"
            />
            <img
              className="absolute h-[3.12%] w-[3.12%] top-[27.38%] right-[11.98%] bottom-[69.5%] left-[84.9%] max-w-full overflow-hidden max-h-full"
              alt=""
              src="/vector4.svg"
            />
            <img
              className="absolute h-[3.12%] w-[3.12%] top-[69.5%] right-[11.98%] bottom-[27.38%] left-[84.9%] max-w-full overflow-hidden max-h-full"
              alt=""
              src="/vector5.svg"
            />
            <img
              className="absolute h-[3.12%] w-[3.12%] top-[84.91%] right-[27.38%] bottom-[11.97%] left-[69.5%] max-w-full overflow-hidden max-h-full"
              alt=""
              src="/vector6.svg"
            />
            <img
              className="absolute h-[3.12%] w-[3.12%] top-[84.91%] right-[69.5%] bottom-[11.97%] left-[27.38%] max-w-full overflow-hidden max-h-full"
              alt=""
              src={vector2}
            />
            <img
              className="absolute h-[3.12%] w-[3.12%] top-[69.5%] right-[84.91%] bottom-[27.38%] left-[11.97%] max-w-full overflow-hidden max-h-full"
              alt=""
              src={vector3}
            />
            <img
              className="absolute h-[7.67%] w-[3.6%] top-[46.16%] right-[0%] bottom-[46.17%] left-[96.4%] max-w-full overflow-hidden max-h-full"
              alt=""
              src={vector4}
              style={vectorIconStyle}
            />
            <img
              className="absolute h-[3.6%] w-[7.67%] top-[96.4%] right-[46.17%] bottom-[0%] left-[46.16%] max-w-full overflow-hidden max-h-full"
              alt=""
              src="/vector10.svg"
            />
            <img
              className="absolute h-[7.67%] w-[3.6%] top-[46.16%] right-[96.4%] bottom-[46.17%] left-[0%] max-w-full overflow-hidden max-h-full"
              alt=""
              src="/vector11.svg"
            />
            <img
              className="absolute h-[3.6%] w-[7.68%] top-[0%] right-[46.16%] bottom-[96.4%] left-[46.16%] max-w-full overflow-hidden max-h-full"
              alt=""
              src={vector5}
            />
            <img
              className="absolute h-[4.3%] w-[4.3%] top-[15.19%] right-[80.49%] bottom-[80.51%] left-[15.2%] max-w-full overflow-hidden max-h-full"
              alt=""
              src={vector6}
              style={vectorIcon1Style}
            />
            <img
              className="absolute h-[4.3%] w-[4.3%] top-[15.19%] right-[15.2%] bottom-[80.51%] left-[80.49%] max-w-full overflow-hidden max-h-full"
              alt=""
              src={vector7}
            />
            <img
              className="absolute h-[4.3%] w-[4.3%] top-[80.51%] right-[80.49%] bottom-[15.19%] left-[15.2%] max-w-full overflow-hidden max-h-full"
              alt=""
              src={vector8}
              style={vectorIcon2Style}
            />
            <img
              className="absolute h-[4.3%] w-[4.3%] top-[80.51%] right-[15.2%] bottom-[15.19%] left-[80.49%] max-w-full overflow-hidden max-h-full"
              alt=""
              src={vector9}
            />
          </div>
          <div onClick={() => {
            onBannerHeaderClick()
          }} className="w-[190px] cursor-pointer h-[33px] shrink-0 flex flex-col items-center justify-start gap-[2px]">
            <div className="relative">HOTEL REALTA</div>
            <div className="relative text-5xs text-center font-body-txt-body-s-regular text-gray-800">
              EXPERIENCE ELEVATED LUXURY AT ITS FINEST
            </div>
          </div>
        </div>
        <div className="w-[252px] shrink-0 flex flex-row items-center justify-between text-center text-base text-darkslategray-300 font-body-txt-body-s-regular">
          <div className="rounded bg-neutrals box-border w-[110px] h-10 shrink-0 flex flex-row py-2 px-7 items-center justify-center border-[1px] border-solid border-darkslategray-300 hover:mix-blend-normal hover:bg-darkslategray-300 hover:text-white hover:cursor-pointer">
            <div className="relative leading-[148%]">Daftar</div>
          </div>
          <button className="cursor-pointer [border:none] py-2 px-7 bg-darkslategray-300 rounded w-[110px] h-10 shrink-0 flex flex-row box-border items-center justify-center hover:bg-gray-800 hover:cursor-pointer">
            <div className="relative text-base leading-[148%] font-body-txt-body-s-regular text-neutrals text-center">
              Login
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderNavbar;

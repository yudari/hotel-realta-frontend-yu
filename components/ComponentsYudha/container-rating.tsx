import type { NextPage } from "next";

interface propsContainerRating {
  dataRatings: any;
}

const ContainerRating: NextPage<propsContainerRating> = (props) => {
  return (
    <div className="self-stretch flex flex-col items-start justify-start gap-[24px] text-left text-xl text-darkslategray-300 font-body-txt-body-s-regular">
      <div className="self-stretch flex flex-row items-center justify-between">
        <b className="relative">Reviews</b>
        <button className="cursor-pointer [border:none] py-3 px-4 bg-darkslategray-300 self-stretch rounded w-[180px] shrink-0 flex flex-row box-border items-center justify-center">
          <div className="relative text-sm font-semibold font-montserrat-semibold-14 text-neutrals text-left">
            Berikan review anda
          </div>
        </button>
      </div>
      <div className="self-stretch flex flex-row items-center justify-start gap-[76px] text-31xl">
        <div className="flex flex-row items-center justify-between gap-2">
          <b className="relative">{props.dataRatings.hotel_rating_final_star}</b>
          <div className="flex flex-col items-start justify-start gap-[8px] text-xl font-montserrat-semibold-14">
            <div className="relative font-semibold">{props.dataRatings.hotel_rating_status}</div>
            <div className="relative text-sm font-body-txt-body-s-regular text-darkslategray-100">
              {props.dataRatings.hotel_review_count} reviews
            </div>
          </div>
        </div>
        <div className="w-[335px] shrink-0 flex flex-col items-start justify-start gap-[10px] text-base">
          {Object.entries(props.dataRatings.hotel_review_percentage).map(([key, value]: any) => {
            return <div key={key} className="self-stretch overflow-hidden flex flex-row items-center justify-between">
              <div className="flex flex-row items-center justify-start gap-[2px]">
                <img
                  className="relative w-6 h-6 shrink-0 overflow-hidden"
                  alt=""
                  src="/materialsymbolsstarrounded.svg"
                />
                <b className="relative">{key}</b>
              </div>
              <div
                className="w-[124px] h-1 shrink-0 flex flex-row items-center justify-start gap-[5px]"
                style={{
                  backgroundImage: "repeating-linear-gradient(to right, black, black 5px, transparent 5px, transparent 10px)"
                }}
              />
              <div className="w-[76px] shrink-0 flex flex-row items-center justify-start text-sm">
                <div className="relative font-medium">{value}</div>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
  );
};

export default ContainerRating;
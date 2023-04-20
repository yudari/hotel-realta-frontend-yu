import type { NextPage } from "next";

interface ReviewUsersProps {
  dataReviews: any;

}

const ContainerReviewsUsers: NextPage<ReviewUsersProps> = (props) => {
  console.log(props.dataReviews.hotel_reviews)
  return (
    <div className="self-stretch flex flex-col items-start justify-start gap-[24px] mt-6 text-left text-[14px] text-blackish-green font-body-txt-body-s-regular">
      {props.dataReviews.hotel_reviews.slice().reverse().map((data: any) => {
        return <div className="self-stretch flex flex-row items-start justify-start gap-[16px]">
          <img
            className="relative w-5 h-5 shrink-0 overflow-hidden opacity-[0.75]"
            src={`${process.env.BACKEND_URL}/image/users/${data.users && data.users.user_photo_profile ? data.users.user_photo_profile : 'dummy-1.png'}`}
          />
          <div className="flex-1 flex flex-col items-start justify-start gap-[8px]">
            <div className="w-[360px] flex flex-row items-start justify-start gap-[8px] min-w-[360px]">
              <div className="flex-1 relative font-semibold text-darkslategray-300">
                {data.users.user_full_name}
              </div>
              <div className="flex-1 relative font-montserrat-semibold-14 text-center">
                |
              </div>

              <div className="flex-1 relative text-darkslategray-300"> {new Date(data.hore_created_on).toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric"
              })}</div>
            </div>
            <div className="self-stretch relative text-darkslategray-100">
              {data.hore_user_review}
            </div>
          </div>

        </div>
      })}

      <div className="self-stretch relative bg-blackish-green h-[0.5px] shrink-0 opacity-[0.25]" />
      {/* <div className="self-stretch flex flex-row items-center justify-center gap-[24px] font-montserrat-semibold-14">
        <img
          className="relative w-6 h-6 shrink-0 overflow-hidden"
          alt=""
          src="/chevron-forward.svg"
        />
        <div className="relative">1 of 40</div>
        <img
          className="relative w-6 h-6 shrink-0 overflow-hidden"
          alt=""
          src="/chevron-forward1.svg"
        />
      </div> */}
    </div>
  );
};

export default ContainerReviewsUsers;

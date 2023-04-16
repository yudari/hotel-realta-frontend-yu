import type { NextPage } from "next";


interface InterfaceSectionRooms {
  dataOtherRooms: any;

}

const SectionRooms: NextPage<InterfaceSectionRooms> = (props) => {
  let dataRooms = props.dataOtherRooms.data.map((room: any) => {
    const priceRate = parseFloat(room.faci_rate_price.replace(/[$,]/g, ''));

    let priceDiscount = priceRate - room.faci_discount * priceRate;
    let subTotal = priceDiscount + room.faci_tax_rate * priceDiscount;

    return {
      ...room, faci_subtotal: subTotal
    }
  })
  console.log(dataRooms)
  return (
    <div className="self-stretch flex flex-col py-0 px-[92px] items-start justify-start text-left text-[18px] text-darkslategray-300 font-body-txt-body-s-regular">
      <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
        <div className="self-stretch relative bg-blackish-green h-[0.5px] shrink-0 opacity-[0.25]" />
        <div className="self-stretch flex flex-col items-start justify-start gap-[32px]">
          <b className="self-stretch relative">Ruangan Lain</b>
          <div className="self-stretch flex flex-col items-start justify-start gap-[16px] text-[16px] text-darkslategray-100">
            {dataRooms.length > 0 ? dataRooms.map((data: any) => {
              return <div className="self-stretch flex flex-row items-center justify-between">
                <div className="flex flex-row items-center justify-between">
                  <img
                    className="relative rounded w-12 h-12 shrink-0 object-cover"
                    alt=""
                    src={data.facility_photos[0].fapho_url}
                  />
                  <div className="relative font-medium ml-3">
                    {data.faci_name}
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between text-right text-[12px]">
                  <div className="relative font-semibold mr-3">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    }).format(data.faci_subtotal)}/malam
                  </div>
                  <button className="cursor-pointer py-3 px-9 bg-neutrals rounded flex flex-row items-center justify-center border-[1px] border-solid border-darkslategray-300">
                    <div className="relative text-[14px] leading-[132%] font-semibold font-body-txt-body-s-regular text-darkslategray-300 text-center">
                      Lihat Dulu
                    </div>
                  </button>
                </div>
              </div>
            }) : <p className="text-[16px] text-darkslategray-100">Tidak Ada Ruangan Lain</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionRooms;

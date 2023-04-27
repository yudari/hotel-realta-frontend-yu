import type { NextPage } from "next";
import ReactToPrint from "react-to-print";


interface SectionDataInvoiceProps {
  dataInvoice: any;
  onHandlePrint: any;
  onComponentRef: any;
}

const SectionInvoice: NextPage<SectionDataInvoiceProps> = (props) => {
  console.log(props.dataInvoice)
  let totalAmount = 0
  props.dataInvoice.user_subtotal_booking_list.forEach((data: any) => {
    totalAmount = totalAmount + data
  })

  const converInvoiceOrder = new Date(props.dataInvoice.user_booking_invoice_date);
  converInvoiceOrder.setDate(converInvoiceOrder.getDate() - 1);
  const formattedDateInvoice = converInvoiceOrder.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '/');




  const dateObj = new Date(props.dataInvoice.user_booking_order_date);
  const month = dateObj.getMonth() + 1;
  const date = dateObj.getDate();
  const year = dateObj.getFullYear();
  // Menggabungkan bulan, tanggal, dan tahun dalam format yang diinginkan
  const formattedDateOrder = `${month.toString().padStart(2, '0')}/${date.toString().padStart(2, '0')}/${year}`;


  const dateObjMemberDate = new Date(props.dataInvoice.user_booking_member_date);

  // Mendapatkan bulan, tanggal, dan tahun dari objek date
  const month2 = dateObjMemberDate.getMonth() + 1;
  const date2 = dateObjMemberDate.getDate();
  const year2 = dateObjMemberDate.getFullYear();

  // Menggabungkan bulan, tanggal, dan tahun dalam format yang diinginkan
  const formattedDateMemberDate = `${month2.toString().padStart(2, '0')}/${date2.toString().padStart(2, '0')}/${year2}`;


  return (
    <div ref={props.onComponentRef} className=" self-stretch flex flex-col py-10 px-[92px] print:px-[0px] items-start justify-start text-left text-[16px] text-darkslategray-300 font-body-txt-body-s-regular print:max-w-[1330px]">
      <div className="self-stretch flex flex-row items-start justify-start">
        <div className="flex-1 flex flex-col items-start justify-start">
          <div className="self-stretch flex flex-col items-start justify-start">
            <div className="self-stretch rounded-[18px] bg-neutrals shadow-[0px_4px_16px_rgba(17,_34,_17,_0.05)] flex flex-col p-4 items-start justify-start gap-[42px]">
              <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
                <div className="self-stretch rounded-[18px] bg-gainsboro-200 flex flex-row p-4 items-start justify-start">
                  <div className="flex-1 flex flex-row items-start justify-between">
                    <b className="relative">Invoice</b>
                    <div className="relative font-semibold">
                      Booking Order {props.dataInvoice.user_booking_order_number}
                    </div>
                  </div>
                </div>
                <div className="self-stretch overflow-hidden flex flex-row py-0 px-4 items-start justify-between">
                  <div className="flex flex-col items-start justify-start gap-[10px]">
                    <div className="relative font-semibold">Order Date</div>
                    <div className="relative font-semibold">{formattedDateOrder}</div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[10px]">
                    <div className="relative font-semibold">Invoice Number</div>
                    <div className="relative font-semibold">
                      {props.dataInvoice.user_booking_invoice_number}
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[10px]">
                    <div className="relative font-semibold">Invoice Date</div>
                    <div className="relative font-semibold">{formattedDateInvoice}</div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[10px]">
                    <div className="relative font-semibold">Status</div>
                    <div className="relative font-semibold">{props.dataInvoice?.user_booking_status_is_paid === 'P ' ? "Paid" : ''}</div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[10px]">
                    <div className="relative font-semibold">Payment Type</div>
                    <div className="relative font-semibold">{props.dataInvoice.user_booking_payment_type}</div>
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
                <div className="self-stretch rounded-[18px] bg-gainsboro-200 flex flex-row p-4 items-start justify-start">
                  <div className="flex-1 flex flex-row items-start justify-between">
                    <b className="relative">Customer</b>

                  </div>
                </div>
                <div className="self-stretch overflow-hidden flex flex-row py-0 px-4 items-start justify-between">
                  <div className="flex flex-col items-start justify-start gap-[10px]">
                    <div className="relative font-semibold">Full Name</div>
                    <div className="relative font-semibold">{props.dataInvoice.user_booking_full_name}</div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[10px]">
                    <div className="relative font-semibold">Contact Number</div>
                    <div className="relative font-semibold">{props.dataInvoice.user_handphone}</div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[10px]">
                    <div className="relative font-semibold">Member</div>
                    <div className="relative font-semibold">{props.dataInvoice.user_booking_member}</div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[10px]">
                    <div className="relative font-semibold">Member Date</div>
                    <div className="relative font-semibold">{formattedDateMemberDate}</div>
                  </div>

                  <div className="flex flex-col items-start justify-start gap-[10px]">
                    <div className="relative font-semibold">Remaining Points</div>
                    <div className="relative font-semibold">{Math.abs(props.dataInvoice.user_booking_member_remaining_points)}</div>
                  </div>

                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
                <div className="self-stretch rounded-[18px] bg-gainsboro-200 flex flex-row p-4 items-start justify-start">
                  <div className="flex-1 flex flex-row items-start justify-start">
                    <b className="flex-1 relative">Billing</b>
                  </div>
                </div>
                <div className="self-stretch overflow-hidden flex flex-row py-0 px-4 items-start justify-start gap-[18px] text-center">
                  <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[10px] text-left">
                    <div className="relative font-semibold">Facilities</div>
                    <div className="self-stretch flex flex-col items-start justify-start gap-[10px]">
                      {props.dataInvoice.user_booking_facilities_list.map((data: any, index: any) => {
                        return <div className="self-stretch relative font-semibold">
                          {props.dataInvoice.user_booking_facilities_list[index]}
                        </div>
                      })}
                    </div>
                  </div>
                  <div className="w-[66px] shrink-0 flex flex-col items-start justify-start gap-[10px]">
                    <div className="self-stretch relative font-semibold">
                      Qty
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start gap-[10px] text-left">
                      {props.dataInvoice.user_booking_facilities_qty_list.map((data: any, index: any) => {
                        return <div className="relative font-semibold">{props.dataInvoice.user_booking_facilities_qty_list[index]}</div>
                      })}
                    </div>
                  </div>
                  <div className="w-[143px] shrink-0 flex flex-col items-start justify-start gap-[10px]">
                    <div className="self-stretch relative font-semibold">
                      Vacant
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start text-left">
                      <div className="relative font-semibold">
                        {props.dataInvoice.user_booking_facilities_total_vacant} Peoples
                      </div>
                    </div>
                  </div>
                  <div className="w-[164px] shrink-0 flex flex-col items-start justify-start gap-[10px] text-left">
                    <div className="self-stretch relative font-semibold text-center">
                      Price
                    </div>
                    {props.dataInvoice.user_booking_price_list.map((dataPriceItem: any) => {
                      return <div className="self-stretch flex flex-col items-center justify-start">
                        <div className="relative font-semibold">
                          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(dataPriceItem)}
                        </div>
                      </div>
                    })}
                  </div>
                  <div className="w-[164px] shrink-0 flex flex-col items-start justify-start gap-[10px]">
                    <div className="self-stretch relative font-semibold">
                      Discount & Kupon
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start text-left">
                      <div className="relative font-semibold">-{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(props.dataInvoice.user_booking_discount_price)}</div>

                      <div className="relative font-semibold">-{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(props.dataInvoice.user_booking_discount_price_bonus)}</div>
                    </div>
                  </div>
                  <div className="w-[207px] shrink-0 flex flex-col items-start justify-start gap-[10px]">
                    <div className="self-stretch relative font-semibold">
                      Point Member
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start">
                      <div className="self-stretch relative font-semibold">
                        -{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(props.dataInvoice.user_booking_point_member_price)} ({props.dataInvoice.user_booking_point_member}pts)
                      </div>
                    </div>
                  </div>
                  <div className="w-[164px] shrink-0 flex flex-col items-start justify-start gap-[10px] text-left">
                    <div className="self-stretch relative font-semibold text-center">
                      Sub Total
                    </div>
                    {props.dataInvoice.user_subtotal_booking_list.map((itemsubtotal: any) => {
                      return <div className="self-stretch flex flex-col items-center justify-start">
                        <div className="relative font-semibold">
                          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(itemsubtotal)}
                        </div>
                      </div>
                    })}
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[16px] text-right">
                <div className="self-stretch rounded-[18px] bg-darkslategray-300 flex flex-row p-4 items-start justify-start">
                  <div className="flex-1" />
                </div>
                <div className="self-stretch overflow-hidden flex flex-row py-0 px-4 items-start justify-end gap-[18px]">
                  <div className="self-stretch w-[164px] shrink-0 flex flex-col items-center justify-end">
                    <button onClick={() => props.onHandlePrint()} className="cursor-pointer py-3 px-9 bg-neutrals self-stretch rounded flex flex-row items-center justify-center border-[1px] border-solid border-darkslategray-300">
                      <div className="relative text-[14px] leading-[132%] font-semibold font-body-txt-body-s-regular text-darkslategray-300 text-center">
                        Print
                      </div>
                    </button>

                  </div>
                  <div className="self-stretch w-[207px] shrink-0 flex flex-col items-end justify-between">
                    <div className="self-stretch relative font-semibold">
                      Total Amount
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start">
                      <div className="self-stretch relative font-semibold">
                        Tax
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start">
                      <div className="self-stretch relative font-semibold">
                        Payment Amount
                      </div>
                    </div>
                  </div>
                  <div className="w-[164px] shrink-0 flex flex-col items-start justify-start gap-[10px]">
                    <div className="self-stretch h-6 shrink-0 flex flex-col items-center justify-start">
                      <div className="self-stretch flex-1 relative font-semibold">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalAmount)}
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start">
                      <div className="self-stretch relative font-semibold">
                        {props.dataInvoice.user_booking_tax_percent}%
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start">
                      <div className="self-stretch relative font-semibold">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(props.dataInvoice.user_booking_total_payment)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionInvoice;

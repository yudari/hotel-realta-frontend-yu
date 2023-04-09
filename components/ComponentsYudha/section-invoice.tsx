import type { NextPage } from "next";

const SectionInvoice: NextPage = () => {
  return (
    <div className="self-stretch flex flex-col py-10 px-[92px] items-start justify-start text-left text-base text-darkslategray-300 font-body-txt-body-s-regular">
      <div className="self-stretch flex flex-row items-start justify-start">
        <div className="flex-1 flex flex-col items-start justify-start">
          <div className="self-stretch flex flex-col items-start justify-start">
            <div className="self-stretch rounded-xl bg-neutrals shadow-[0px_4px_16px_rgba(17,_34,_17,_0.05)] flex flex-col p-4 items-start justify-start gap-[42px]">
              <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
                <div className="self-stretch rounded-xl bg-gainsboro-200 flex flex-row p-4 items-start justify-start">
                  <div className="flex-1 flex flex-row items-start justify-between">
                    <b className="relative">Invoice</b>
                    <div className="relative font-semibold">
                      Booking Order #BO-20220224-0001
                    </div>
                  </div>
                </div>
                <div className="self-stretch overflow-hidden flex flex-row py-0 px-4 items-start justify-between">
                  <div className="flex flex-col items-start justify-start gap-[10px]">
                    <div className="relative font-semibold">Order Date</div>
                    <div className="relative font-semibold">23-Jan-2023</div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[10px]">
                    <div className="relative font-semibold">Invoice Number</div>
                    <div className="relative font-semibold">
                      TRX#20220223-0001
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[10px]">
                    <div className="relative font-semibold">Invoice Date</div>
                    <div className="relative font-semibold">23-Jan-2023</div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[10px]">
                    <div className="relative font-semibold">Status</div>
                    <div className="relative font-semibold">Paid</div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[10px]">
                    <div className="relative font-semibold">Payment Type</div>
                    <div className="relative font-semibold">Go To</div>
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
                <div className="self-stretch rounded-xl bg-gainsboro-200 flex flex-row p-4 items-start justify-start">
                  <div className="flex-1 flex flex-row items-start justify-between">
                    <b className="relative">Customer</b>
                    <div className="relative font-semibold">
                      Account Number 111-222-333-444
                    </div>
                  </div>
                </div>
                <div className="self-stretch overflow-hidden flex flex-row py-0 px-4 items-start justify-between">
                  <div className="flex flex-col items-start justify-start gap-[10px]">
                    <div className="relative font-semibold">Full Name</div>
                    <div className="relative font-semibold">Yudha Satria</div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[10px]">
                    <div className="relative font-semibold">Contact Number</div>
                    <div className="relative font-semibold">082154531854</div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[10px]">
                    <div className="relative font-semibold">Member</div>
                    <div className="relative font-semibold">GOLD</div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[10px]">
                    <div className="relative font-semibold">Member Date</div>
                    <div className="relative font-semibold">20-May-2023</div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[10px]">
                    <div className="relative font-semibold">
                      Remaining Points
                    </div>
                    <div className="relative font-semibold">+150</div>
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
                <div className="self-stretch rounded-xl bg-gainsboro-200 flex flex-row p-4 items-start justify-start">
                  <div className="flex-1 flex flex-row items-start justify-start">
                    <b className="flex-1 relative">Billing</b>
                  </div>
                </div>
                <div className="self-stretch overflow-hidden flex flex-row py-0 px-4 items-start justify-start gap-[18px] text-center">
                  <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[10px] text-left">
                    <div className="relative font-semibold">Facilities</div>
                    <div className="self-stretch flex flex-col items-start justify-start gap-[10px]">
                      <div className="self-stretch relative font-semibold">
                        Indonesian Standard Double
                      </div>
                      <div className="relative font-semibold">Extrabeds</div>
                      <div className="relative font-semibold">Softdrank</div>
                    </div>
                  </div>
                  <div className="w-[66px] shrink-0 flex flex-col items-start justify-start gap-[10px]">
                    <div className="self-stretch relative font-semibold">
                      Qty
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start gap-[10px] text-left">
                      <div className="relative font-semibold">1</div>
                      <div className="relative font-semibold">1</div>
                      <div className="relative font-semibold">2</div>
                    </div>
                  </div>
                  <div className="w-[143px] shrink-0 flex flex-col items-start justify-start gap-[10px]">
                    <div className="self-stretch relative font-semibold">
                      Vacant
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start text-left">
                      <div className="relative font-semibold">
                        2 Adult, 0 Child
                      </div>
                    </div>
                  </div>
                  <div className="w-[164px] shrink-0 flex flex-col items-start justify-start gap-[10px] text-left">
                    <div className="self-stretch relative font-semibold text-center">
                      Price
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start">
                      <div className="relative font-semibold">
                        Rp 300.000,00
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start">
                      <div className="relative font-semibold">Rp 45.000,00</div>
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start">
                      <div className="relative font-semibold">Rp 15.000,00</div>
                    </div>
                  </div>
                  <div className="w-[164px] shrink-0 flex flex-col items-start justify-start gap-[10px]">
                    <div className="self-stretch relative font-semibold">
                      Discount
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start text-left">
                      <div className="relative font-semibold">-Rp 12.000</div>
                    </div>
                  </div>
                  <div className="w-[207px] shrink-0 flex flex-col items-start justify-start gap-[10px]">
                    <div className="self-stretch relative font-semibold">
                      Point Member
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start">
                      <div className="self-stretch relative font-semibold">
                        -Rp 15.000,00 (100pts)
                      </div>
                    </div>
                  </div>
                  <div className="w-[164px] shrink-0 flex flex-col items-start justify-start gap-[10px] text-left">
                    <div className="self-stretch relative font-semibold text-center">
                      Sub Total
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start">
                      <div className="relative font-semibold">
                        Rp 270.000,00
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start">
                      <div className="relative font-semibold">Rp 45.000,00</div>
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start">
                      <div className="relative font-semibold">Rp 20.000,00</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[16px] text-right">
                <div className="self-stretch rounded-xl bg-darkslategray-300 flex flex-row p-4 items-start justify-start">
                  <div className="flex-1" />
                </div>
                <div className="self-stretch overflow-hidden flex flex-row py-0 px-4 items-start justify-end gap-[18px]">
                  <div className="self-stretch w-[164px] shrink-0 flex flex-col items-center justify-end">
                    <button className="cursor-pointer py-3 px-9 bg-neutrals self-stretch rounded flex flex-row items-center justify-center border-[1px] border-solid border-darkslategray-300">
                      <div className="relative text-sm leading-[132%] font-semibold font-body-txt-body-s-regular text-darkslategray-300 text-center">
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
                        Rp 335.000,00
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start">
                      <div className="self-stretch relative font-semibold">
                        10%
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start">
                      <div className="self-stretch relative font-semibold">
                        Rp 368.000,00
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

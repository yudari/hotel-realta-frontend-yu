import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { BsCalendar2Date } from "react-icons/bs";
import { useRouter } from "next/router";
import { doUpdateProdVendor } from "@/redux/purchasing/action/prodVendorActionReducer";
import { doStockList } from "@/redux/purchasing/action/stockActionReducer";

export default function EditProduct(props: any) {
  let { stock = [], refresh } = useSelector((state: any) => state.stockReducers);
  console.log("tes:", stock);

  const router = useRouter().query;
  type FormValues = {
    vepro_qty_stocked: number;
    vepro_qty_remaining: number;
    vepro_price: number;
    vepro_stock_id: number;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const dispatch = useDispatch();

  const [data, setData] = useState<any>(props.dataProdVendor);

  const handleError = (errors: any) => {};
  const handleSave = async (data: FormValues) => {
    try {
      const dataAll = {
        vepro_qty_stocked: data.vepro_qty_stocked,
        vepro_qty_remaining: data.vepro_qty_remaining,
        vepro_price: data.vepro_price,
        vepro_stock_id: data.vepro_stock_id,
        vepro_vendor_id: router.id,
      };
      console.log("data:", dataAll);
      dispatch(doUpdateProdVendor(props.isEdit.id, dataAll));
      props.closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(doStockList());
  }, [dispatch, refresh]);

  const registerOptions = {
    vepro_qty_stocked: { required: "Qty is required" },
    vepro_qty_remaining: { required: "Qty remaining is required" },
    vepro_price: { required: "Price is required" },
    vepro_stock_id: { required: "Stock ID is required" },
  };

  return (
    <div>
      <Transition appear show={props.isEdit.status} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={props.closeModal}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">Edit Product</Dialog.Title>
                  <div className="mt-4">
                    <form onSubmit={handleSubmit(handleSave, handleError)}>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="vendor_active">
                          Stock Name
                        </label>
                        <div className="relative">
                          <select
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            id="vepro_stock_id"
                            {...register("vepro_stock_id", {
                              ...registerOptions.vepro_stock_id,
                            })}>
                            <option selected>Choose Product</option>
                            {stock.map((data: any) => (
                              <option value={data.stock_id} key={data.stock_id}>
                                {data.stock_name}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        {errors?.vepro_stock_id && <p className="text-red-500 text-xs italic">{errors.vepro_stock_id.message}</p>}
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Qty Stocked</label>
                        <input className="shadow appearance-none border rounded w-full py-3 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " id="price" type="text" defaultValue={data?.vepro_qty_stocked ?? ""} {...register("vepro_qty_stocked", registerOptions.vepro_qty_stocked)} />
                        {errors?.vepro_qty_stocked && <p className="text-red-500 text-xs italic">{errors.vepro_qty_stocked.message}</p>}
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Qty Remaining</label>
                        <input className="shadow appearance-none border rounded w-full py-3 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " id="price" type="text" defaultValue={data?.vepro_qty_remaining ?? ""} {...register("vepro_qty_remaining", registerOptions.vepro_qty_remaining)} />
                        {errors?.vepro_qty_remaining && <p className="text-red-500 text-xs italic">{errors.vepro_qty_remaining.message}</p>}
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Price</label>
                        <input className="shadow appearance-none border rounded w-full py-3 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " id="price" type="text" defaultValue={data?.vepro_price ?? ""} {...register("vepro_price", registerOptions.vepro_price)} />
                        {errors?.vepro_price && <p className="text-red-500 text-xs italic">{errors.vepro_price.message}</p>}
                      </div>

                      <div className="flex justify-end">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                          Submit
                        </button>

                        <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800" onClick={props.closeModal}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

import Button from "@/components/Button/button";
import { doUpdatePriceItems } from "@/redux/masterSchema/action/priceitemAction";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export default function EditPriceMaster(props: any) {
  let { priceitems } = useSelector((state: any) => state.priceitemsReducer);
  type FormValues = {
    prit_name: string;
    prit_price: string;
    prit_description: string;
    prit_type: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm<FormValues>();

  const [priceItemData, setPriceItemData] = useState({
    prit_id: 0,
    prit_name: "",
    prit_description: "",
    prit_price: "",
    prit_type: "",
  });

  useEffect(() => {
    const filter = priceitems?.data.filter((price: any) => {
      return price.prit_id === props.isEdit.id;
    })[0];

    setPriceItemData({ ...filter, prit_price: filter.prit_price });
  }, [priceitems, props.isEdit.id]);

  const dispatch = useDispatch();

  const handleEdit = async (data: any) => {
    dispatch(doUpdatePriceItems({ id: props.isEdit.id, data }));
    props.closeModal();
  };

  const handleError = (errors: any) => {};

  const registerOptions = {
    prit_name: { required: "Name is required" },
    prit_price: {
      required: "price is required",
    },
    prit_description: { required: "description is required" },
    prit_type: { required: "type is required" },
  };
  return (
    <div>
      <Transition appear show={props.isEdit.status} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={props.closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="w-full max-w-md transform overflow-hidden rounded-2xl
                            bg-white p-6 text-left align-middle shadow-xl transition-all"
                >
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Mohon isi dahulu
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(handleEdit, handleError)}>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="col-span-1">
                          <label className="block text-gray-700">
                            Item Name
                          </label>
                          <input
                            // name="name"
                            type="text"
                            {...register(
                              "prit_name",
                              registerOptions.prit_name
                            )}
                            defaultValue={priceItemData.prit_name}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-gray-200"
                          />
                          <small className="text-danger">
                            {errors?.prit_name && errors.prit_name.message}
                          </small>
                        </div>
                        {/* <div className="col-span-1">
                          <label className="block text-gray-700">desc</label>
                          <input
                            type="desc"
                            // name="desc"
                            {...register(
                              "cagro_description",
                              registerOptions.cagro_description
                            )}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-gray-200"
                          />
                          <small className="text-danger">
                            {errors?.cagro_description &&
                              errors.cagro_description.message}
                          </small>
                        </div> */}
                        <div className="col-span-1">
                          {/* <label className="block text-gray-700">type</label>
                          <input
                          type="cateid"
                          // name="cateid"
                          {...register("cagro_type", registerOptions.cagro_type)}
                          className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-gray-200"
                        /> */}

                          <label className="block text-gray-700">
                            Select an option
                          </label>
                          <select
                            {...register(
                              "prit_type",
                              registerOptions.prit_type
                            )}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-gray-200"
                          >
                            <option selected>Type</option>
                            <option value="Snack">SNACK</option>
                            <option value="Facilty">FACILITY</option>
                            <option value="Food">FOOD</option>
                            <option value="Softdrink">SOFTDRINK</option>
                            <option value="Service">SERVICE</option>
                          </select>

                          <small className="text-danger">
                            {errors?.prit_type && errors.prit_type.message}
                          </small>
                        </div>
                        <div className="col-span-1">
                          <label className="block text-gray-700">desc</label>
                          <textarea
                            {...register(
                              "prit_description",
                              registerOptions.prit_description
                            )}
                            defaultValue={priceItemData.prit_description}
                            className="description w-full p-5 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-gray-200"
                          />
                          <small className="text-danger">
                            {errors?.prit_description &&
                              errors.prit_description.message}
                          </small>
                        </div>
                        <div className="col-span-1">
                          <label className="block text-gray-700">price</label>
                          <input
                            type="text"
                            {...register(
                              "prit_price",
                              registerOptions.prit_price
                            )}
                            defaultValue={priceItemData.prit_price.replace(
                              "$",
                              ""
                            )}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-gray-200"
                          />
                          <small className="text-danger">
                            {errors?.prit_price && errors.prit_price.message}
                          </small>
                        </div>
                      </div>
                      <div className="flex flex-row space-x-4 mt-4 text-right">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blug-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          Save
                        </button>

                        <button
                          className="inline-flex justify-center rounded-md border border-transparent bg-blug-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={props.closeModal}
                        >
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

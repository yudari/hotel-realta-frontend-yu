import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { Switch } from "@headlessui/react";
import { doAddVendor } from "@/redux/purchasing/action/vendorActionReducer";
import { BsCalendar2Date } from "react-icons/bs";
import { doAddStock } from "@/redux/purchasing/action/stockActionReducer";

export default function AddStock(props: any) {
  type FormValues = {
    stock_name: string;
    stock_description: string;
    stock_quantity: number;
    stock_reorder_point: number;
    stock_used: number;
    stock_scrap: number;
    stock_size: string;
    stock_color: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const dispatch = useDispatch();

  const handleError = (errors: any) => {};
  const handleSave = async (data: FormValues) => {
    try {
      const dataAll = {
        stock_name: data.stock_name,
        stock_description: data.stock_description,
        stock_quantity: data.stock_quantity,
        stock_reorder_point: data.stock_reorder_point,
        stock_used: data.stock_used,
        stock_scrap: data.stock_scrap,
        stock_size: data.stock_size,
        stock_color: data.stock_color,
      };
      await dispatch(doAddStock(dataAll));
      props.closeModal();
    } catch (error) {
      console.error(error);
    }
  };
  // !

  const registerOptions = {
    stock_name: { required: "Name is required" },
    stock_description: { required: "Description is required" },
    stock_quantity: { required: "Qty is required" },
    stock_reorder_point: { required: "Reorder is required" },
    stock_used: { required: "Stock use is required" },
    stock_scrap: { required: "Stock scrap is required" },
    stock_size: { required: "Size is required" },
    stock_color: { required: "Color is required" },
  };

  return (
    <div>
      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={props.closeModal}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-bold leading-6 text-gray-900 mb-5">Add Stock</Dialog.Title>

                  <div className="mt-4">
                    <form onSubmit={handleSubmit(handleSave, handleError)}>
                      <div className="w-full mb-4">
                        <label className="text-gray-700 font-medium mr-4">Stock Name</label>
                        <input className="flex-1 shadow appearance-none border rounded w-full py-3 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="stock_name" type="text" {...register("stock_name", registerOptions.stock_name)} />
                        {errors?.stock_name && <p className="text-redf-500 text-xs italic">{errors.stock_name.message}</p>}
                      </div>

                      <div className="w-full mb-4">
                        <label className="text-gray-700 font-medium mr-4">Stock Description</label>
                        <input className="flex-1 shadow appearance-none border rounded w-full py-3 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="stock_description" type="text" {...register("stock_description", registerOptions.stock_description)} />
                        {errors?.stock_description && <p className="text-redf-500 text-xs italic">{errors.stock_description.message}</p>}
                      </div>

                      <div className="flex flex-wrap -mx-4">
                        <div className="w-full md:w-1/2 px-4 mb-4">
                          <label className="text-gray-700 font-medium mr-4">Qty</label>
                          <input className="shadow appearance-none border rounded w-full py-3 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="qty" type="number" {...register("stock_quantity", registerOptions.stock_quantity)} />
                          {errors?.stock_quantity && <p className="text-redf-500 text-xs italic">{errors.stock_quantity.message}</p>}
                        </div>
                        <div className="w-full md:w-1/2 px-4 mb-4">
                          <label className="text-gray-700 font-medium mr-4">Reorder Point</label>
                          <input className="shadow appearance-none border rounded w-full py-3 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="stock_reorder_point" type="number" {...register("stock_reorder_point", registerOptions.stock_reorder_point)} />
                          {errors?.stock_reorder_point && <p className="text-redf-500 text-xs italic">{errors.stock_reorder_point.message}</p>}
                        </div>
                        <div className="w-full md:w-1/2 px-4 mb-4">
                          <label className="text-gray-700 font-medium mr-4">Stock Used</label>
                          <input className="shadow appearance-none border rounded w-full py-3 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="stock_used" type="number" {...register("stock_used", registerOptions.stock_used)} />
                          {errors?.stock_used && <p className="text-redf-500 text-xs italic">{errors.stock_used.message}</p>}
                        </div>
                        <div className="w-full md:w-1/2 px-4 mb-4">
                          <label className="text-gray-700 font-medium mr-4">Stock Scrap</label>
                          <input className="shadow appearance-none border rounded w-full py-3 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="stock_scrap" type="number" {...register("stock_scrap", registerOptions.stock_scrap)} />
                          {errors?.stock_scrap && <p className="text-redf-500 text-xs italic">{errors.stock_scrap.message}</p>}
                        </div>
                        <div className="w-full md:w-1/2 px-4 mb-4">
                          <label className="text-gray-700 font-medium mr-4">Size</label>
                          <input className="shadow appearance-none border rounded w-full py-3 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="stock_size" type="text" {...register("stock_size", registerOptions.stock_size)} />
                          {errors?.stock_size && <p className="text-redf-500 text-xs italic">{errors.stock_size.message}</p>}
                        </div>
                        <div className="w-full md:w-1/2 px-4 mb-7">
                          <label className="text-gray-700 font-medium mr-4">Color</label>
                          <input className="shadow appearance-none border rounded w-full py-3 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="color" type="text" {...register("stock_color", registerOptions.stock_color)} />
                          {errors?.stock_color && <p className="text-redf-500 text-xs italic">{errors.stock_color.message}</p>}
                        </div>
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

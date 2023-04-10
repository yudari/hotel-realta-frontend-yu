import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { Switch } from "@headlessui/react";
import { doAddVendor } from "@/redux/purchasing/action/vendorActionReducer";
import { BsCalendar2Date } from "react-icons/bs";

export default function AddVendor(props: any) {
  type FormValues = {
    vendor_entity_id: number;
    vendor_name: string;
    vendor_active: number;
    vendor_priority: number;
    vendor_register_date: string;
    vendor_weburl: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleRegistDate = async (data: FormValues) => {
    const hari = new Date(selectedDate ? selectedDate : "").getDate();
    const bulan = new Date(selectedDate ? selectedDate : "").getMonth();
    const tahun = new Date(selectedDate ? selectedDate : "").getFullYear();
    const fullDate = tahun + "/" + (bulan + 1) + "/" + hari;
  };

  const handleDateChange = (date: any | null) => {
    setSelectedDate(date);
    register("vendor_register_date", {
      required: "Register date is required",
      value: date,
    });
  };

  const handleError = (errors: any) => {};
  const handleSave = async (data: FormValues) => {
    try {
      const dataAll = {
        vendor_entity_id: data.vendor_entity_id,
        vendor_name: data.vendor_name,
        vendor_active: data.vendor_active,
        vendor_priority: data.vendor_priority,
        vendor_register_date: data.vendor_register_date,
        vendor_weburl: data.vendor_weburl,
      };
      await dispatch(doAddVendor(dataAll));
      props.closeModal();
      console.log(doAddVendor);
    } catch (error) {
      console.error(error);
    }
  };
  // !

  const registerOptions = {
    vendor_entity_id: { required: "ID is required" },
    vendor_name: { required: "Vendor name is required" },
    vendor_active: { required: "Status is required" },
    vendor_priority: { required: "Priority is required" },
    vendor_register_date: { required: "Date is required" },
    vendor_weburl: { required: "Url is required" },
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">Add Vendor</Dialog.Title>
                  <div className="mt-4">
                    <form onSubmit={handleSubmit(handleSave, handleError)}>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Entity ID</label>
                        <input className="shadow appearance-none border rounded w-full py-3 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" {...register("vendor_entity_id", registerOptions.vendor_entity_id)} />
                        {errors?.vendor_entity_id && <p className="text-red-500 text-xs italic">{errors.vendor_entity_id.message}</p>}
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Vendor Name</label>
                        <input className="shadow appearance-none border rounded w-full py-3 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" {...register("vendor_name", registerOptions.vendor_name)} />
                        {errors?.vendor_name && <p className="text-red-500 text-xs italic">{errors.vendor_name.message}</p>}
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="vendor_active">
                          Vendor Status
                        </label>
                        <div className="relative">
                          <select
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            id="vendor_active"
                            {...register("vendor_active", {
                              ...registerOptions.vendor_active,
                              setValueAs: (value) => (value === "active" ? 1 : 0),
                              shouldUnregister: true,
                            })}>
                            <option value="">Choose status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        {errors?.vendor_active && <p className="text-red-500 text-xs italic">{errors.vendor_active.message}</p>}
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="vendor_priority">
                          Vendor Priority
                        </label>
                        <div className="relative">
                          <select
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            id="vendor_priority"
                            {...register("vendor_priority", {
                              ...registerOptions.vendor_priority,
                              setValueAs: (value) => (value === "highest" ? 1 : 0),
                              shouldUnregister: true,
                            })}>
                            <option value="">Choose priority</option>
                            <option value="highest">Highest</option>
                            <option value="lowest">Lowest</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        {errors?.vendor_priority && <p className="text-red-500 text-xs italic">{errors.vendor_priority.message}</p>}
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="vendor-register-date">
                          Vendor Register
                        </label>
                        <div className="relative">
                          <DatePicker dateFormat="yyyy/MM/dd" className="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-3 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500" selected={selectedDate} onChange={handleDateChange} id="vendor-register-date" />
                          <div className="pointer-events-none absolute inset-y-0 right-0 px-4 py-3">
                            <BsCalendar2Date className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                        {errors?.vendor_register_date && <p className="text-red-500 text-xs italic">{errors.vendor_register_date.message}</p>}
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Web Url</label>
                        <input className="shadow appearance-none border rounded w-full py-3 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " id="price" type="text" {...register("vendor_weburl", registerOptions.vendor_weburl)} />
                        {errors?.vendor_weburl && <p className="text-red-500 text-xs italic">{errors.vendor_weburl.message}</p>}
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

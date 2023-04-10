import { doAddCategoryGroup } from "@/redux/masterSchema/action/categorygroupAction";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function AddCategoryMaster(props: any) {
  type FormValues = {
    cagro_name: string;
    cagro_description: string;
    cagro_type: string;
    cagro_icon: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const dispatch = useDispatch();

  const handleRegistration = async (data: any) => {
    const formData = new FormData();
    formData.append("cagro_name", data.cagro_name);
    formData.append("cagro_description", data.cagro_description);
    formData.append("cagro_type", data.cagro_type);
    formData.append("cagro_icon", data.cagro_icon[0]);

    // console.log("data", formData);
    dispatch(doAddCategoryGroup(formData));
    props.closeModal();
  };

  const handleError = (errors: any) => {};

  const registerOptions = {
    cagro_name: { required: "Name is required" },
    cagro_description: { required: "desc is required" },
    cagro_type: { required: "cateid is required" },
  };

  return (
    <div>
      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={props.closeModal}>
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
                    <form
                      onSubmit={handleSubmit(handleRegistration, handleError)}
                    >
                      <div className="grid grid-cols-1 gap-4">
                        <div className="col-span-1">
                          <label className="block text-gray-700">
                            Group name
                          </label>
                          <input
                            // name="name"
                            type="text"
                            {...register(
                              "cagro_name",
                              registerOptions.cagro_name
                            )}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-gray-200"
                          />
                          <small className="text-danger">
                            {errors?.cagro_name && errors.cagro_name.message}
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
                              "cagro_type",
                              registerOptions.cagro_type
                            )}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-gray-200"
                          >
                            <option selected>Choose a type</option>
                            <option value="Facility">Facility</option>
                            <option value="Service">Service</option>
                            <option value="Room">Room</option>
                          </select>

                          <small className="text-danger">
                            {errors?.cagro_type && errors.cagro_type.message}
                          </small>
                        </div>
                        <div className="col-span-1">
                          <label className="block text-gray-700">desc</label>
                          <textarea
                            {...register(
                              "cagro_description",
                              registerOptions.cagro_description
                            )}
                            className="description w-full p-5 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-gray-200"
                          />
                          <small className="text-danger">
                            {errors?.cagro_description &&
                              errors.cagro_description.message}
                          </small>
                        </div>
                        {/* <div className="col-span-1">
                          <label className="block text-gray-700">price</label>
                          <input
                            type="price"
                            // name="price"
                            {...register("price", registerOptions.price)}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-gray-200"
                          />
                          <small className="text-danger">
                            {errors?.price && errors.price.message}
                          </small>
                        </div> */}
                        <div className="mt-4">
                          <label>Product Image</label>
                          <label className="block">
                            <span className="sr-only">
                              Choose Product Image
                            </span>
                            <input
                              type="file"
                              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                              // name="image"
                              {...register("cagro_icon")}
                            />
                          </label>
                        </div>
                      </div>
                      <div className="flex-row space-x-4 mt-4 text-rigt">
                        <button
                          className="inline-flex justify-center rounded-md border border-transparent 
                                    bg-blug-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none 
                                    focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          Submit
                        </button>
                        <button
                          className="inline-flex justify-center rounded-md border border-transparent bg-blug-100 px-4 py-2 text-sm 
                        font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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

import { doUpdateCity } from "@/redux/masterSchema/action/city";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export default function EditCityMaster(props: any) {
  const [cityData, setCityData] = useState({
    city_id: 0,
    city_name: "",
  });
  let { city } = useSelector((state: any) => state.cityReducer);
  type FormValues = {
    city_name?: string;
    city_prov_id?: number;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const dispatch = useDispatch();

  const handleEdit = async (data: any) => {
    const dataEdit = {
      city_name: data.city_name,
      city_prov_id: Number(data.city_prov_id),
    };
    dispatch(
      doUpdateCity({
        id: props.isEdit.id,
        dataEdit,
      })
    );
    props.closeModal();
  };

  const handleError = (errors: any) => {};

  const registerOptions = {
    city_name: { required: "Name is required" },
  };

//   console.log(city);
  useEffect(() => {
    const filter = city.filter((pro: any) => {
      return pro.city_id === props.isEdit.id;
    })[0];

    setCityData(filter);
  }, [props.isEdit.id, city.data, city]);
  return (
    <div>
      <Transition appear show={props.isEdit.status} as={Fragment}>
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
                    Add/Edit Province {props.name}
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(handleEdit, handleError)}>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex gap-4 mt-4">
                          <label htmlFor="regionName">Country Name</label>
                          <p>{props.province.name}</p>
                        </div>
                        <div className="col-span-1">
                          <label className="block text-gray-700">
                            Province Name
                          </label>
                          <input
                            type="text"
                            {...register(
                              "city_name",
                              registerOptions.city_name
                            )}
                            defaultValue={cityData.city_name}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-gray-200"
                          />

                          <input
                            type="hidden"
                            {...register("city_prov_id")}
                            value={Number(props.province.provinceID)}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-gray-200"
                          />
                          <small className="text-danger">
                            {errors?.city_name && errors.city_name.message}
                          </small>
                        </div>
                      </div>
                      <div className="flex-row space-x-4 mt-4 text-rigt">
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

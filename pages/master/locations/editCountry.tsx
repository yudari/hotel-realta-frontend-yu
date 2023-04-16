import { doUpdateCountry } from "@/redux/masterSchema/action/countryAction";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export default function EditCountryMaster(props: any) {
  const [countryData, setCountryData] = useState({
    country_id: 0,
    country_name: "",
  });
  let { country } = useSelector((state: any) => state.countryReducer);
  type FormValues = {
    country_name: string;
    country_region_id: any;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm<FormValues>();

  const dispatch = useDispatch();

  const handleEdit = async (data: any) => {
    const dataEdit = {
      country_name: data.country_name,
      country_region_id: Number(data.country_region_id),
    };
    dispatch(doUpdateCountry({ id: props.isEdit.id, data: dataEdit }));
    props.closeModal();
  };

  const handleError = (errors: any) => {};

  const registerOptions = {
    country_name: { required: "Name is required" },
  };
  useEffect(() => {
    const filter = country.filter((cou: any) => {
      return cou.country_id === props.isEdit.id;
    })[0];

    setCountryData(filter);
  }, [props.isEdit.id, country, country.data]);
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
                    Add/Edit Country {props.name}
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(handleEdit, handleError)}>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex gap-4 mt-4">
                          <label htmlFor="regionName">Region Name</label>
                          <p>{props.region.name}</p>
                        </div>
                        <div className="col-span-1">
                          <label className="block text-gray-700">
                            Country Name
                          </label>
                          <input
                            type="text"
                            {...register(
                              "country_name",
                              registerOptions.country_name
                            )}
                            defaultValue={countryData.country_name}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-gray-200"
                          />

                          <input
                            type="hidden"
                            {...register("country_region_id")}
                            value={props.region.regionID}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-gray-200"
                          />
                          <small className="text-danger">
                            {errors?.country_name &&
                              errors.country_name.message}
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

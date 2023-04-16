import { doUpdateProvince } from "@/redux/masterSchema/action/provinceAction";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export default function EditProvinceMaster(props: any) {
  const [provinceData, setProvinceData] = useState({
    prov_id: 0,
    prov_name: "",
  });
  let { province } = useSelector((state: any) => state.provinceReducer);
  type FormValues = {
    prov_name: string;
    prov_country_id: any;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const dispatch = useDispatch();

  const handleEdit = async (data: any) => {
    const dataEdit = {
      prov_name: data.prov_name,
      prov_country_id: Number(data.prov_country_id),
    };
    dispatch(
      doUpdateProvince({
        id: props.isEdit.id,
        dataEdit,
      })
    );
    props.closeModal();
  };

  const handleError = (errors: any) => {};

  const registerOptions = {
    prov_name: { required: "Name is required" },
  };
  useEffect(() => {
    const filter = province.filter((pro: any) => {
      return pro.prov_id === props.isEdit.id;
    })[0];

    setProvinceData(filter);
  }, [props.isEdit.id, province, province.data]);
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
                          <p>{props.country.name}</p>
                        </div>
                        <div className="col-span-1">
                          <label className="block text-gray-700">
                            Province Name
                          </label>
                          <input
                            type="text"
                            {...register(
                              "prov_name",
                              registerOptions.prov_name
                            )}
                            defaultValue={provinceData.prov_name}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-gray-200"
                          />

                          <input
                            type="hidden"
                            {...register("prov_country_id")}
                            value={Number(props.country.countryID)}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-gray-200"
                          />
                          <small className="text-danger">
                            {errors?.prov_name && errors.prov_name.message}
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

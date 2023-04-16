import { doUpdateServiceTask } from "@/redux/masterSchema/action/servicetaskAction";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export default function EditServiceMaster(props: any) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let { servicetask } = useSelector((state: any) => state.servicetaskReducer);
  type FormValues = {
    seta_name: string;
    seta_seq: number;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm<FormValues>();

  const [serviceData, setServiceData] = useState({
    seta_id: 0,
    seta_name: "",
    seta_seq: 0,
  });

  useEffect(() => {
    const filter = servicetask?.data.filter((serv: any) => {
      return serv.seta_id === props.isEdit.id;
    })[0];

    setServiceData(filter);
  }, [props.isEdit.id, servicetask]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  //   const [servicetas, setServicetask] = useState<any>({});

  const handleEdit = async (data: any) => {
    dispatch(doUpdateServiceTask({ id: props.isEdit.id, data }));
    props.closeModal();
  };
  //   console.log(props)

  const handleError = (errors: any) => {};

  // eslint-disable-next-line react-hooks/rules-of-hooks
  //   useEffect(() => {
  //     setServicetask(
  //       servicetask.filter((data: any) => data.id === props.isEdit.id)[0]
  //     );
  //   }, [props.isEdit.id, servicetask]);

  //   console.log(servicetask)
  const registerOptions = {
    seta_name: { required: "Name is required" },
    seta_seq: {
      required: "sequence is required",
    },
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
                    Add/Edit Task Name
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(handleEdit, handleError)}>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="col-span-1">
                          <label className="block text-gray-700">
                            Task Name
                          </label>
                          <input
                            type="text"
                            {...register(
                              "seta_name",
                              registerOptions.seta_name
                            )}
                            defaultValue={serviceData.seta_name}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-gray-200"
                          />
                          <small className="text-danger">
                            {errors?.seta_name && errors.seta_name.message}
                          </small>
                        </div>

                        <div className="col-span-1">
                          <label className="block text-gray-700">
                            Sequence Order
                          </label>
                          <input
                            type="text"
                            {...register("seta_seq", registerOptions.seta_seq)}
                            defaultValue={serviceData.seta_seq}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-gray-200"
                          />
                          <small className="text-danger">
                            {errors?.seta_seq && errors.seta_seq.message}
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

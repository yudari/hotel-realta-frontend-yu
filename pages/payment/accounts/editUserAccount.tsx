import { doUpadateUserAcc } from "@/redux/payment/action/userAccActionReducer";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function EditUserAccount(props: any) {
  type FormValues = {
    usac_entity_id: number;
    usac_user_id: number;
    usac_account_number: number;
    usac_saldo: number;
    usac_type: string;
    usac_expmonth: number;
    usac_expyear: number;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const dispatch = useDispatch();
  const [data, setData] = useState<any>(props.dataUserAcc);
  const handleError = (errors: any) => {};
  const handleSave = async (data: FormValues) => {
    const loginData: any = localStorage.getItem("loginData")
    const objLoginData = JSON.parse(loginData)
    const user_id = objLoginData.user_id
    try {
      const dataAll = {
        usac_entity_id: data.usac_entity_id,
        usac_user_id: user_id,
        usac_account_number: data.usac_account_number,
        usac_saldo: data.usac_saldo,
        usac_type: data.usac_type,
        usac_expmonth: data.usac_expmonth,
        usac_expyear: data.usac_expyear,
      };
      dispatch(doUpadateUserAcc(props.isEdit.id, data));
      toast.success(`Successfully Edited Your Account`)
      props.closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const registerOptions = {
    usac_entity_id: { required: "Entity id is required" },
    usac_user_id: { required: "User id is required" },
    usac_account_number: { required: "Account Number is required" },
    usac_saldo: { required: "Saldo is required" },
    usac_type: { required: "Type is required" },
    usac_expmonth: { required: "Exp month is required" },
    usac_expyear: { required: "Exp years is required" },
  };

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                    Edit User Account
                  </Dialog.Title>
                  <div className="mt-4">
                    <form onSubmit={handleSubmit(handleSave, handleError)}>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                          Account Number
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-3 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:bg-blue-100"
                          id="description"
                          type="text"
                          defaultValue={data?.usac_account_number ?? ""}
                          {...register(
                            "usac_account_number",
                            registerOptions.usac_account_number
                          )}
                        />
                        {errors?.usac_account_number && (
                          <p className="text-red-500 text-xs italic">
                            {errors.usac_account_number.message}
                          </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                          Saldo
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-3 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:bg-blue-100"
                          id="description"
                          type="text"
                          defaultValue={data?.usac_saldo ?? ""}
                          {...register(
                            "usac_saldo",
                            registerOptions.usac_saldo
                          )}
                        />
                        {errors?.usac_saldo && (
                          <p className="text-red-500 text-xs italic">
                            {errors.usac_saldo.message}
                          </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                          Type Account
                        </label>
                        <input
                          readOnly
                          className="shadow appearance-none border rounded w-full py-3 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:input-read-only"
                          id="description"
                          type="text"
                          defaultValue={data?.usac_type ?? ""}
                          {...register("usac_type", registerOptions.usac_type)}
                        />

                        {errors?.usac_type && (
                          <p className="text-red-500 text-xs italic">
                            {errors.usac_type.message}
                          </p>
                        )}
                      </div>

                      <div className="flex justify-between items-center gap-8">
                        <div className="mb-4">
                          <label className="block text-gray-700 font-bold mb-2">
                            Exp Month
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-3 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:bg-blue-100"
                            id="description"
                            type="text"
                            defaultValue={data?.usac_expmonth ?? ""}
                            {...register(
                              "usac_expmonth",

                              registerOptions.usac_expmonth
                            )}
                          />
                          {errors?.usac_expmonth && (
                            <p className="text-red-500 text-xs italic">
                              {errors.usac_expmonth.message}
                            </p>
                          )}
                        </div>

                        <div className="mb-4">
                          <label className="block text-gray-700 font-bold mb-2">
                            Exp Years
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-3 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:bg-blue-100"
                            id="description"
                            type="text"
                            defaultValue={data?.usac_expyear ?? ""}
                            {...register(
                              "usac_expyear",
                              registerOptions.usac_expyear
                            )}
                          />
                          {errors?.usac_expyear && (
                            <p className="text-red-500 text-xs italic">
                              {errors.usac_expyear.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <button
                          type="submit"
                          className="text-white bg-primary hover:bg-primary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          Submit
                        </button>

                        <button
                          className='text-white bg-danger-secondary hover:bg-danger-secondary-hover focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800'
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

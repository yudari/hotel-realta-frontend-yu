import {
  doAddUserAcc,
  doGetBankFintech,
} from "@/redux/payment/action/userAccActionReducer";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";


export default function AddUserAccount(props: any) {
  let { bankFintech, message, refresh } = useSelector(
    (state: any) => state.userAccountReducers
  );
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
      dispatch(doAddUserAcc(dataAll));
      props.closeModal();
    } catch (error) {
      console.error(error);
    }
  };
  const [pilih, setPilih] = useState()
  const handleSelect = (e:any) =>{
    const data = e.target.value
    setPilih(data)
    
  }

  useEffect(() => {
    dispatch(doGetBankFintech());
  }, [refresh]);

  const registerOptions = {
    usac_entity_id: { required: "Entity id is required" },
    usac_account_number: { required: "Account Number is required" },
    usac_saldo: { required: "Saldo is required" },
    usac_type: { required: "Type is required" },
    usac_expmonth: { required: "Exp month is required" },
    usac_expyear: { required: "Exp years is required" },
  };

  return (
    <div>

      
      <Transition appear show={props.isOpen} as={Fragment}>
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

          <div className="fixed inset-0 overflow-y-auto ">
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
                    Add User Account
                  </Dialog.Title>
                  <div className="mt-4">
                    <form onSubmit={handleSubmit(handleSave, handleError)}>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                          Pilih Bank/Fintech
                        </label> 
                        <div className="w-full flex gap-3"> 
                            <select
                            className="w-8/12"
                          {...register(
                            "usac_entity_id",
                            registerOptions.usac_entity_id
                          )}
                          onChange={handleSelect}
                        >
                          <option value="">Pilih Bank or Fintech</option>
                          {(bankFintech || []).map((d: any) => (
                            <option key={d.entity_id} value={d.entity_id}>
                              {d.bankname || d.fintechname}
                            </option>
                              ))}
                        </select>
                           
                            {
                              pilih == null ? (
                                <select className="w-4/12 disabled:bg-gray-200 disabled:cursor-not-allowed" disabled>
                                  <option value="">Silahkan</option>
                                </select>
                              ) : (
                                <select
                                className="w-4/12"
                                {...register("usac_type")}
                                // disabled={!watch("usac_entity_id")}
                              >
                                
                                {bankFintech?.find(
                                  (d: any) =>
                                    d.entity_id.toString() ===
                                   pilih
                                )?.bankname && (
                                  <>
                                    <option value="">Pilih Tipe</option>
                                    <option value="Debit">Debit</option>
                                    <option value="Credit">Kredit</option>
                                  </>
                                )}
                                {bankFintech?.find(
                                  (d: any) =>
                                    d.entity_id.toString() ===
                                    pilih
                                )?.fintechname && (
                                  <>
                                    <option value="Fintech">Fintech</option>
                                  </>
                                )}
                              </select>
                              )
                            }
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                          Account Number
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-3 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:bg-blue-100"
                          id="description"
                          type="number"
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
                      <div className="flex justify-between items-center gap-8">
                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                          Exp Month
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-3 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:bg-blue-100"
                          id="description"
                          type="text"
                          {...register(
                            "usac_expmonth",
                            registerOptions.usac_expmonth
                          )}
                          placeholder="MM"
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
                          placeholder="YYYY"
                          id="description"
                          type="text"
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

                      <div className='flex justify-between'>
                        <button
                          type='submit'
                          className='text-white bg-primary/90 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                        >
                          Submit
                        </button>

                        <button
                          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
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

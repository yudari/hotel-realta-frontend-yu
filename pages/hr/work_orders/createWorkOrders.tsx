import { doAddWorkOrders } from "@/redux/human_resources/action/workordersActionReducer";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function CreateWorkOrders(props: any) {
  type FormValues = {
    woro_start_date: Date;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const dispatch = useDispatch();

  const handleRegistration = async (data: any) => {
    const dataForm = {
      woro_start_date: data.woro_start_date,
    };
    dispatch(doAddWorkOrders(dataForm));
    console.log(dataForm)
    props.closeModal();
  };

  const handleError = (errors: any) => [];

  const registerOptions = {
    woro_start_date: { required: "Tanggal harus diisi!" },
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
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Create Start Date
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(handleRegistration, handleError)}>
                      <div>
                        <label htmlFor="tanggal">Tanggal:</label>
                        <input type="date" {...register("woro_start_date", registerOptions.woro_start_date)} />
                        {errors.woro_start_date && <span>{errors.woro_start_date.message}</span>}
                      </div>
                      <button type="submit" className="flex-row space-x-4 mt-4 text-rigt">
                        Tambahkan Tanggal
                      </button>

                      <button
                        className="inline-flex justify-center rounded-md border border-transparent bg-blug-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={props.closeModal}>
                        Cancel
                      </button>
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

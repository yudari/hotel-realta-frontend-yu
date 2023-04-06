import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "@/components/Button/button";
import { useForm } from "react-hook-form";
import InputText from "@/components/Input/InputText";
import { MdError } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { doUpdatePassword } from "@/redux/users/action/usersActionReducer";
import { useRouter } from "next/router";
import { BsCheckCircleFill } from "react-icons/bs";

export default function EditPassword({ isEdit, closeModal }: any) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { payload, message, refresh } = useSelector(
    (state: any) => state.usersReducers
  );

  type FormValueType = {
    current_password: string;
    new_password: string;
    retype_password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValueType>();

  const onSubmit = (data: any) => {
    const { id } = router.query;
    dispatch(doUpdatePassword({ id, data }));
  };

  const registerOptions = {
    current_password: { required: "Current Password is Required" },
    new_password: { required: "New Password is Required" },
    retype_password: { required: "Confirmation Password is Required" },
  };
  return (
    <>
      <Transition appear show={isEdit.status} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded text-left align-middle shadow-xl transition-all bg-white">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white bg-primary p-5"
                  >
                    Edit Password
                  </Dialog.Title>
                  <div className="mt-2 p-6">
                    <h2 className="text-2xl font-bold text-primary">
                      Change Password
                    </h2>

                    <hr className="mt-2" />

                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                      {message &&
                        (payload?.statusCode >= 400 ||
                          message?.response?.data?.statusCode >= 400) && (
                          <div
                            className="p-4 my-4 text-sm text-danger-secondary rounded bg-danger font-medium bg-opacity-10 border-2 border-danger"
                            role="alert"
                          >
                            {message?.response?.data ? (
                              message?.response?.data?.message.map(
                                (m: string, index: number) => {
                                  return (
                                    <ul
                                      key={index}
                                      className="flex flex-1 items-center gap-2 my-2"
                                    >
                                      <MdError className="text-xl" />
                                      <li className="flex-1">{m}</li>
                                    </ul>
                                  );
                                }
                              )
                            ) : (
                              <div className="flex flex-1 items-center gap-2 my-2">
                                <MdError className="text-xl" />
                                <p>{message}</p>
                              </div>
                            )}
                          </div>
                        )}

                      {message && payload?.statusCode === 200 && (
                        <div
                          className="p-4 mb-4 text-sm text-secondary rounded bg-secondary font-medium bg-opacity-10 flex items-center gap-2 border-2 border-secondary"
                          role="alert"
                        >
                          <BsCheckCircleFill className="text-xl" />
                          {message.errors ? message.errors[0].message : message}
                        </div>
                      )}

                      <div className="form-group mt-6">
                        <InputText
                          name="current_password"
                          label="Current Password"
                          placeholder="Your Current Password"
                          type="password"
                          errors={errors}
                          register={register}
                          registerOptions={registerOptions}
                          className="w-full md:w-1/2"
                        />
                      </div>

                      <div className="form-group mt-6">
                        <InputText
                          name="new_password"
                          label="New Password"
                          placeholder="Your New Password"
                          type="password"
                          errors={errors}
                          register={register}
                          registerOptions={registerOptions}
                          className="w-full md:w-1/2"
                        />
                      </div>

                      <div className="form-group mt-6">
                        <InputText
                          name="retype_password"
                          label="Confirmation Password"
                          placeholder="Confirmation Password"
                          type="password"
                          errors={errors}
                          register={register}
                          registerOptions={registerOptions}
                          className="w-full md:w-1/2"
                        />
                      </div>
                      <div className="flex justify-end p-6 mt-2 gap-4">
                        <Button
                          label="Cancel"
                          size="small"
                          type="main"
                          variant="danger-secondary"
                          onClick={closeModal}
                        />

                        <Button
                          label="Edit"
                          size="small"
                          type="main"
                          variant="secondary"
                        />
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

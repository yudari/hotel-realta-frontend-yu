import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import InputText from "@/components/Input/InputText";
import Button from "@/components/Button/button";
import { Listbox } from "@headlessui/react";
import ListBoxInput from "@/components/ListBoxInput";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { doUpdateProfile } from "@/redux/users/action/usersActionReducer";
import { useRouter } from "next/router";

export default function EditProfile({
  data,
  isEdit,
  closeModal,
  refreshData,
}: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userType, setUserType] = useState({
    label:
      data.user_type === "T"
        ? "Travel Agent"
        : data.user_type === "C"
        ? "Corporate"
        : "Individual",
    value: data.user_type,
  });

  const [roleUser, setRoleUser] = useState({
    label:
      data.usro_role_id === 1
        ? "Guest"
        : data.usro_role_id === 2
        ? "Manager"
        : data.usro_role_id === 3
        ? "Office Boy"
        : data.usro_role_id === 4
        ? "Admin"
        : "User",
    value: data.usro_role_id,
  });

  const [userGender, setUserGender] = useState({
    label: data.uspro_gender === "M" ? "Male" : "Female",
    value: data.uspro_gender,
  });

  const [userMaritalStatus, setUserMaritalStatus] = useState({
    label: data.user_marital_status === "M" ? "Marriage" : "Single",
    value: data.user_marital_status,
  });

  const handleChangeUserRole = (value: string) => {
    setRoleUser((prev) => {
      return { ...prev, label: value, value: value };
    });
  };

  const handleChangeUserType = (value: string) => {
    setUserType((prev) => {
      return { ...prev, label: value, value: value };
    });
  };
  const handleChangeUserGender = (value: string) => {
    setUserGender((prev) => {
      return { ...prev, label: value, value: value };
    });
  };

  const handleChangeUserMaritalStatus = (value: string) => {
    setUserMaritalStatus((prev) => {
      return { ...prev, label: value, value: value };
    });
  };

  const userTypeList = [
    {
      label: "Travel Agent",
      value: "T",
    },
    {
      label: "Individual",
      value: "I",
    },
    {
      label: "Corporate",
      value: "C",
    },
  ];

  const rolesList = [
    {
      label: "Guest",
      value: 1,
    },
    {
      label: "Manager",
      value: 2,
    },
    {
      label: "Office Boy",
      value: "3",
    },
    {
      label: "Admin",
      value: "4",
    },
    {
      label: "User",
      value: "5",
    },
  ];

  type FormValueType = {
    user_full_name?: string;
    user_type?: "T" | "I" | "C";
    user_phone_number?: string;
    user_photo_profile?: string;
    user_email?: string;
    user_company_name?: string;
    uspro_national_id?: string;
    uspro_job_title?: string;
    uspro_gender?: "M" | "F";
    uspro_birt_date?: Date | string;
    uspro_marital_status?: "M" | "S";
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValueType>();

  const onSubmit = (data: any) => {
    const { id } = router.query;

    const profileData = {
      ...data,
      user_type: userType.value,
      uspro_gender: userGender.value,
      uspro_marital_status: userMaritalStatus.value,
    };

    console.log(profileData);
    dispatch(doUpdateProfile({ id, data: profileData }));

    refreshData();

    setTimeout(() => {
      closeModal();
    }, 700);
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
                    Edit General
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-2 p-6">
                      <h2 className="text-2xl font-bold text-primary">
                        General
                      </h2>

                      <hr className="mt-2" />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 items-center">
                        <div className="form-group">
                          <InputText
                            name="user_full_name"
                            label="Username"
                            placeholder="Your Username"
                            type="text"
                            errors={errors}
                            register={register}
                            className="w-full"
                            defaultValue={data.user_full_name}
                          />
                          {/* <input
                            type="text"
                            className="outline-none border border-spacing-2 border-variant block p-3 mt-2 active:border-blue-700 focus:border-blue-700 active:bg-blue-200 focus:bg-blue-200 rounded w-full"
                            value={data.user_full_name}
                          /> */}
                        </div>

                        <div className="form-group">
                          {/* <label htmlFor="password" className="block text-lg">
                            Email
                          </label> */}

                          <InputText
                            name="user_email"
                            label="Email"
                            placeholder="Your Email"
                            type="email"
                            errors={errors}
                            register={register}
                            className="w-full"
                            defaultValue={data.user_email}
                          />

                          {/* 
                          <input
                            type="text"
                            className="outline-none border border-spacing-2 border-variant block p-3 mt-2 active:border-blue-700 focus:border-blue-700 active:bg-blue-200 focus:bg-blue-200 rounded w-full"
                            value={data.user_email}
                          /> */}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 items-center">
                        <div className="form-group mt-5">
                          <label
                            htmlFor="password"
                            className="block text-lg font-medium"
                          >
                            Type User
                          </label>

                          <ListBoxInput
                            data={userTypeList}
                            selectedValue={userType}
                            handleChangeUserType={handleChangeUserType}
                          />
                          {/* <input
                          type="text"
                          className="outline-none border border-spacing-2 border-variant block p-3 mt-2 active:border-blue-700 focus:border-blue-700 active:bg-blue-200 focus:bg-blue-200 rounded w-full"
                          value={data.user_full_name}
                        /> */}
                        </div>

                        <div className="form-group">
                          {/* <label htmlFor="password" className="block text-lg">
                            Company
                          </label> */}

                          <InputText
                            name="user_company_name"
                            label="Company Name"
                            placeholder="Your Company Name"
                            type="text"
                            errors={errors}
                            register={register}
                            className="w-full"
                            defaultValue={data.user_company_name}
                          />
                          {/* <input
                            type="text"
                            className="outline-none border border-spacing-2 border-variant block p-3 mt-2 active:border-blue-700 focus:border-blue-700 active:bg-blue-200 focus:bg-blue-200 rounded w-full"
                            value={data.user_company_name}
                          /> */}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div className="form-group">
                          {/* <label htmlFor="password" className="block text-lg">
                            No. Handphone
                          </label> */}

                          <InputText
                            name="user_phone_number"
                            label="Phone Number"
                            placeholder="Your Phone Number"
                            type="text"
                            errors={errors}
                            register={register}
                            className="w-full"
                            defaultValue={data.user_phone_number}
                          />

                          {/* <input
                            type="text"
                            className="outline-none border border-spacing-2 border-variant block p-3 mt-2 active:border-blue-700 focus:border-blue-700 active:bg-blue-200 focus:bg-blue-200 rounded w-full"
                            value={data.user_phone_number}
                          /> */}
                        </div>

                        {Number(data.usro_role_id) === 4 ? (
                          <div className="form-group mt-4">
                            <label htmlFor="password" className="block text-lg">
                              Role Type
                            </label>

                            <ListBoxInput
                              data={rolesList}
                              selectedValue={roleUser}
                              handleChangeUserType={handleChangeUserRole}
                            />

                            {/* <input
                            type="text"
                            className="outline-none border border-spacing-2 border-variant block p-3 mt-2 active:border-blue-700 focus:border-blue-700 active:bg-blue-200 focus:bg-blue-200 rounded w-full"
                            value={data.user_company_name}
                          /> */}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-2 p-6">
                      <h2 className="text-2xl font-bold text-primary">
                        Profile
                      </h2>

                      <hr className="mt-2" />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 items-center">
                        <div className="form-group">
                          {/* <label htmlFor="password" className="block text-lg">
                            National ID
                          </label> */}

                          <InputText
                            name="uspro_national_id"
                            label="National ID"
                            placeholder="Your National ID"
                            type="text"
                            errors={errors}
                            register={register}
                            className="w-full"
                            defaultValue={data.uspro_national_id}
                          />
                          {/* <input
                            type="text"
                            className="outline-none border border-spacing-2 border-variant block p-3 mt-2 active:border-blue-700 focus:border-blue-700 active:bg-blue-200 focus:bg-blue-200 rounded w-full"
                            value={data.user_national_id}
                          /> */}
                        </div>

                        <div className="form-group">
                          {/* <label htmlFor="password" className="block text-lg">
                            Email
                          </label> */}

                          {/* <InputText
                            name="user_email"
                            label="Email"
                            placeholder="Your Email"
                            type="text"
                            errors={errors}
                            register={register}
                            className="w-full"
                            defaultValue={data.user_email}
                          /> */}

                          {/* <input
                            type="text"
                            className="outline-none border border-spacing-2 border-variant block p-3 mt-2 active:border-blue-700 focus:border-blue-700 active:bg-blue-200 focus:bg-blue-200 rounded w-full"
                            value={data.user_email}
                          /> */}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 items-center">
                        <div className="form-group">
                          {/* <label htmlFor="password" className="block text-lg">
                            Job Title
                          </label> */}

                          <InputText
                            name="uspro_job_title"
                            label="Job Title"
                            placeholder="Your Job Title"
                            type="text"
                            errors={errors}
                            register={register}
                            className="w-full"
                            defaultValue={data.uspro_job_title}
                          />

                          {/* <input
                            type="text"
                            className="outline-none border border-spacing-2 border-variant block p-3 mt-2 active:border-blue-700 focus:border-blue-700 active:bg-blue-200 focus:bg-blue-200 rounded w-full"
                            value={data.user_job_title}
                          /> */}
                        </div>

                        <div className="form-group mt-4">
                          <label htmlFor="password" className="block text-lg">
                            Marital Status
                          </label>

                          <ListBoxInput
                            data={[
                              { label: "Marriage", value: "M" },
                              { label: "Single", value: "S" },
                            ]}
                            selectedValue={userMaritalStatus}
                            handleChangeUserType={handleChangeUserMaritalStatus}
                          />
                          {/* <input
                          type="text"
                          className="outline-none border border-spacing-2 border-variant block p-3 mt-2 active:border-blue-700 focus:border-blue-700 active:bg-blue-200 focus:bg-blue-200 rounded w-full"
                          value={data.user_company_name}
                        /> */}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                        <div className="form-group">
                          <label htmlFor="password" className="block text-lg">
                            Gender
                          </label>

                          <ListBoxInput
                            data={[
                              { label: "Male", value: "M" },
                              { label: "Female", value: "F" },
                            ]}
                            selectedValue={userGender}
                            handleChangeUserType={handleChangeUserGender}
                          />
                          {/* <input
                          type="text"
                          className="outline-none border border-spacing-2 border-variant block p-3 mt-2 active:border-blue-700 focus:border-blue-700 active:bg-blue-200 focus:bg-blue-200 rounded w-full"
                          value={data.user_phone_number}
                        /> */}
                        </div>
                      </div>
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

                  {/* 
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

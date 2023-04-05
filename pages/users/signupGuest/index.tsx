import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/public/logo-realta.png";
import Button from "@/components/Button/button";
import { useForm } from "react-hook-form";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import phoneNumberCode from "@/utils/phoneNumberCode";
import { useDispatch, useSelector } from "react-redux";
import { doRegisterGuest } from "@/redux/users/action/registerActionReducers";

import { MdArrowDropDown, MdError } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import { useRouter } from "next/router";

export default function SignupGuest() {
  const [selected, setSelected] = useState(phoneNumberCode[0].value);
  const dispatch = useDispatch();
  const { message, payload } = useSelector(
    (state: any) => state.registerReducers
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {
    payload: loginPayload,
    message: loginMessage,
    refresh,
    isLogin,
  } = useSelector((state: any) => state.loginReducers);
  const router = useRouter();

  type FormValues = {
    phone_number_code: string;
    phone_number: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: any) => {
    const phoneNumber = selected + data.phone_number;
    dispatch(doRegisterGuest({ ...data, phone_number: phoneNumber }));
  };

  const registerOptions = {
    phone_number_code: { required: "Phone Number Code is required" },
    phone_number: { required: "Phone Number is required" },
  };

  return (
    <>
      <Head>
        <title>Hotel Realta - Login Guest</title>
      </Head>
      <main className="grid grid-cols-2 h-screen items-center">
        <Image
          src="https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDA5NzMwNg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
          width={1024}
          height={1024}
          alt="hotel-realta"
          className="h-screen w-full object-cover"
        />

        <div className="w-3/4 mx-auto">
          <Link href="/">
            <Image
              src={Logo}
              alt="hotel logo"
              width={450}
              height={250}
              className="mx-auto mt-10"
              priority
            />
          </Link>

          <hr className="w-3/4 mx-auto mt-5" />

          <h1 className="text-3xl text-center uppercase font-medium mt-7">
            Guest Signup
          </h1>

          <form
            className="w-3/4 mx-auto mt-7"
            onSubmit={handleSubmit(onSubmit)}
          >
            {message && payload?.statusCode >= 400 && (
              <div
                className="p-4 mb-4 text-sm text-danger-secondary rounded bg-danger font-medium bg-opacity-10 flex items-center gap-2 border-2 border-danger"
                role="alert"
              >
                <MdError className="text-xl" />
                {message}
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

            <label htmlFor="phone_number" className="text-lg font-medium">
              Phone Number
            </label>

            <div className="flex gap-2 items-center">
              <Listbox value={selected} onChange={setSelected}>
                <div className="relative w-1/2">
                  <Listbox.Button className="w-full relative p-3 mt-2 border-2 border-gray-500 outline-none active:border-blue-600 focus:border-blue-800 rounded text-left">
                    <span className="block truncate">{selected}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <MdArrowDropDown
                        className="h-5 w-5 text-variant"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {phoneNumberCode.map((code, index) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            `relative cursor-default select-none p-3 ${
                              active ? "bg-primary text-white" : "text-black"
                            }`
                          }
                          value={code.value}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {code.label}
                              </span>
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>

              <input
                type="text"
                {...register("phone_number", registerOptions.phone_number)}
                className="w-full p-3 mt-2 border-2 border-gray-500 outline-none active:border-blue-600 focus:border-blue-800 rounded"
                placeholder="Phone Number"
              />
            </div>
            <small className="text-red-600 block mt-2">
              {errors?.phone_number_code && errors.phone_number_code.message}
            </small>

            <small className="text-red-600 block mt-2">
              {errors?.phone_number && errors.phone_number.message}
            </small>

            <Button
              label="Signup"
              size="large"
              type="main"
              variant="primary"
              className="w-full mt-6"
            />
          </form>

          <p className="font-medium text-center mt-4">
            If You are Realta Hotel,{" "}
            <Link
              href="/users/signupEmployee"
              className="text-blue-600 hover:text-blue-700"
            >
              Click This For Signup
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}

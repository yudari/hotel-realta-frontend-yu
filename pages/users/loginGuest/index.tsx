import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/public/logo-realta.png";
import Button from "@/components/Button/button";
import { useForm } from "react-hook-form";
import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { MdArrowDropDown, MdError } from "react-icons/md";
import phoneNumberCode from "@/utils/phoneNumberCode";
import { useDispatch, useSelector } from "react-redux";
import { doLoginGuest } from "@/redux/users/action/loginActionReducers";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function LoginGuest() {
  const [selected, setSelected] = useState(phoneNumberCode[0].value);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { payload, message, isLogin } = useSelector(
    (state: any) => state.loginReducers
  );
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

    dispatch(doLoginGuest({ ...data, phone_number: phoneNumber }));
  };

  const registerOptions = {
    phone_number_code: { required: "Phone Number Code is required" },
    phone_number: { required: "Phone Number is required" },
  };

  useEffect(() => {
    const loginStorage = localStorage.getItem("login");
    const token = localStorage.getItem("token");
    const loginData = JSON.parse(localStorage.getItem("loginData") || "{}");

    if (loginStorage && token) {
      dispatch({ type: "LOGIN_SUCCESS", payload: { token, loginData } });
    } else {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (isLogin && payload && payload.token) {
      localStorage.setItem("token", payload.token);
      localStorage.setItem("login", "true");
      localStorage.setItem("loginData", JSON.stringify(payload.loginData));
      Cookies.set("loginData", JSON.stringify(payload.loginData), {
        expires: 1,
        path: "/",
      });
      Cookies.set("token", payload.token, { expires: 1, path: "/" });

      router.push(`/`);
    }
  }, [isLogin, payload, router]);

  if (isLoading || isLogin) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Hotel Realta - Login Guest</title>
        <meta
          name="description"
          content="Log in to your Hotel Realtà account to manage your reservations, view your booking history, and access exclusive member benefits. Enter your email address and password to access your account."
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="grid grid-cols-1 md:grid-cols-2 h-screen items-center px-4 md:px-0 bg-[url(https://images.unsplash.com/photo-1563911302283-d2bc129e7570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3Mzk1Njk4MA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080)] md:bg-none bg-no-repeat bg-center">
        <Image
          src="https://images.unsplash.com/photo-1563911302283-d2bc129e7570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3Mzk1Njk4MA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
          width={1024}
          height={1024}
          alt="hotel-realta"
          className="h-screen w-full object-cover hidden md:block"
        />

        <div className="w-full px-6 py-6 md:px-0 md:py-0 md:w-3/4 mx-auto bg-white md:bg-transparent rounded-md md:rounded-none">
          <h1 className="uppercase text-center text-4xl font-medium text-gray-600">
            Welcome To
          </h1>

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

          <hr className="w-full md:w-3/4 mx-auto mt-5" />

          <form
            className="w-full md:w-3/4 mx-auto mt-7"
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

            <div className="form-group mt-3">
              <label htmlFor="phone_number" className="text-lg font-medium">
                Phone Number<span className="text-danger">*</span>
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
                              `relative cursor-default select-none p-3 ${active ? "bg-primary text-white" : "text-black"
                              }`
                            }
                            value={code.value}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${selected ? "font-medium" : "font-normal"
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
            </div>

            <Button
              label="Sign In"
              size="large"
              type="main"
              variant="primary"
              className="w-full mt-6"
            />
          </form>

          <p className="font-medium text-center mt-4 text-sm md:text-base">
            If You are Realta Hotel,{" "}
            <Link
              href="/users/loginEmployee"
              className="text-blue-600 hover:text-blue-700"
            >
              Click This For Login
            </Link>
          </p>

          <div className="w-full md:w-3/4 mx-auto flex items-center gap-2 mt-7">
            <hr className="w-full border border-gray-300" />
            <span className="font-medium uppercase text-gray-700">Signup</span>
            <hr className="w-full border border-gray-300" />
          </div>

          <div className="w-full md:w-3/4 mx-auto">
            <Link href="/users/signupGuest">
              <Button
                label="Signup as guest"
                size="large"
                type="main"
                variant="danger-secondary"
                className="w-full mt-4"
              />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

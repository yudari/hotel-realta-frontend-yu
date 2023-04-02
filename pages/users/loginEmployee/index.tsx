import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "@/public/logo-realta.png";
import InputText from "@/components/Input/InputText";
import { useForm } from "react-hook-form";
import Button from "@/components/Button/button";
import { useDispatch, useSelector } from "react-redux";
import { doLoginEmployee } from "@/redux/users/action/loginActionReducers";
import { MdError } from "react-icons/md";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";

export default function LoginEmployee() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { payload, message, refresh, isLogin } = useSelector(
    (state: any) => state.loginReducers
  );
  const router = useRouter();

  type FormValues = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: any) => {
    dispatch(doLoginEmployee(data));
  };

  const registerOptions = {
    email: { required: "Username is required" },
    password: { required: "Password is required" },
  };

  useEffect(() => {
    const loginStorage = localStorage.getItem("login");

    if (loginStorage === "true") {
      dispatch({ type: "LOGIN_SUCCESS" });
    }
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (isLogin) {
      localStorage.setItem("login", "true");
      router.push("/dashboard");
    }
  }, [isLogin, router]);

  if (isLoading || isLogin) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Hotel Realta - Login Employee</title>
      </Head>
      <main className="grid grid-cols-2 h-screen items-center">
        <div className="w-3/4 mx-auto">
          <Link href="/">
            <Image
              src={Logo}
              alt="hotel logo"
              width={450}
              height={250}
              className="mx-auto"
              priority
            />
          </Link>

          <hr className="w-3/4 mx-auto mt-5" />

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
            {/* <div className="form-group mt-4">
              <label htmlFor="email" className="text-lg font-medium">
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 mt-2 border-2 border-gray-500 outline-none active:border-blue-600 focus:border-blue-800"
                placeholder="Your Email (eg. mail@gmail.com)"
              />
            </div> */}
            <InputText
              name="email"
              label="Email"
              placeholder="Your Email"
              type="email"
              errors={errors}
              register={register}
              registerOptions={registerOptions}
              // required
              className="w-full"
            />

            <InputText
              name="password"
              label="Password"
              placeholder="Your Password"
              type="password"
              errors={errors}
              register={register}
              registerOptions={registerOptions}
              // required
              className="w-full "
            />

            {/* <div className="form-group mt-4">
              <label htmlFor="password" className="text-lg font-medium">
                Password
              </label>
              <input
                type="password"
                className="w-full p-3 mt-2 border-2 border-gray-500 outline-none active:border-blue-600 focus:border-blue-800"
                placeholder="Your password"
              />
            </div> */}

            <div className="flex justify-between mt-4">
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="remember-me"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="remember-me" className="sr-only">
                  Remember Me
                </label>

                <label htmlFor="remember-me">Remember Me</label>
              </div>

              <Link
                href="/users/forgotPassword"
                className="text-blue-700 hover:text-blue-800 font-medium"
              >
                Forgot Your Password
              </Link>
            </div>

            {/* <button className="w-full p-3 mt-6 bg-blue-600 font-medium text-lg uppercase text-white hover:bg-blue-700 transition-colors duration-200 ease-out">
              Signin
            </button> */}
            <Button
              label="signin"
              size="large"
              type="main"
              variant="primary"
              className="w-full mt-4"
            />
          </form>

          <p className="font-medium text-center mt-4">
            Are you Guest?{" "}
            <Link
              href="/users/loginGuest"
              className="text-blue-600 hover:text-blue-700"
            >
              Login as Guest
            </Link>
          </p>

          <div className="w-3/4 mx-auto flex items-center gap-2 mt-7">
            <hr className="w-full border border-gray-300" />
            <span className="font-medium uppercase text-gray-700">Signup</span>
            <hr className="w-full border border-gray-300" />
          </div>

          <div className="w-3/4 mx-auto">
            <Link href="/users/signupEmployee">
              {/* <button className="w-full p-3 mt-4 bg-gray-600 font-medium text-lg uppercase text-white hover:bg-gray-700 transition-colors duration-200 ease-out">
                Sign Up AS Employee
              </button> */}
              <Button
                label="Signup as employee"
                size="large"
                type="main"
                variant="variant"
                className="w-full mt-4"
              />
            </Link>
          </div>
        </div>

        <Image
          src="https://images.unsplash.com/photo-1678982762066-e62979ee5251?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDA3ODY4Nw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
          width={1024}
          height={1024}
          alt="hotel-realta"
          className="h-screen w-full object-cover"
        />
      </main>
    </>
  );
}

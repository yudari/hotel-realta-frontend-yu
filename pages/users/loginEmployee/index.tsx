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
import Cookies from "js-cookie";

export default function LoginEmployee() {
  const [rememberMe, setRememberMe] = useState({
    email: "",
    password: "",
    isChecked: false,
  });

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

    const { isChecked, email, password } = rememberMe;

    if (isChecked && (email !== "" || email !== undefined)) {
      localStorage.setItem(
        "rememberMe",
        JSON.stringify({
          email: data.email,
          password: data.password,
          isChecked: isChecked,
        })
      );
    } else {
      localStorage.removeItem("rememberMe");
    }
  };

  const registerOptions = {
    email: { required: "Username is required" },
    password: { required: "Password is required" },
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

      router.push(`/users/profile/${payload.loginData.user_id}`);
    }
  }, [isLogin, payload, router]);

  const handleChangeRememberMe = (event: any) => {
    setRememberMe((prev) => {
      return { ...prev, isChecked: event.target.checked };
    });
  };

  useEffect(() => {
    const rememberValue = JSON.parse(
      localStorage.getItem("rememberMe") || "{}"
    );

    if (
      rememberValue &&
      rememberValue.isChecked &&
      rememberValue.email &&
      rememberValue.password
    ) {
      setRememberMe({
        isChecked: true,
        email: rememberValue.email,
        password: rememberValue.password,
      });
    }
  }, []);

  if (isLoading || isLogin) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Hotel Realta - Login Employee</title>
      </Head>
      <main className="grid grid-cols-1 md:grid-cols-2 h-screen items-center px-4 md:px-0 bg-[url(https://images.unsplash.com/photo-1678982762066-e62979ee5251?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDA3ODY4Nw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080)] md:bg-none bg-no-repeat bg-center">
        <div className="w-full px-6 py-6 md:px-0 md:py-0 md:w-3/4 mx-auto bg-white md:bg-transparent rounded-md md:rounded-none">
          <Link href="/">
            <Image
              src={Logo}
              alt="hotel logo"
              width={450}
              height={250}
              className="mx-auto md:mt-1"
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

            <InputText
              name="email"
              label="Email"
              placeholder="Your Email"
              type="email"
              errors={errors}
              register={register}
              registerOptions={registerOptions}
              defaultValue={rememberMe.email}
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
              defaultValue={rememberMe.password}
              className="w-full "
            />

            <div className="flex justify-between mt-4">
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="remember-me"
                  checked={rememberMe.isChecked}
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary focus:ring-2"
                  onChange={handleChangeRememberMe}
                />
                <label htmlFor="remember-me" className="sr-only">
                  Remember Me
                </label>

                <label htmlFor="remember-me" className="text-sm md:text-base">
                  Remember Me
                </label>
              </div>

              <Link
                href="/users/forgotPassword"
                className="text-blue-700 hover:text-blue-800 font-medium text-sm md:text-base"
              >
                Forgot Your Password
              </Link>
            </div>

            <Button
              label="Sign In"
              size="large"
              type="main"
              variant="primary"
              className="w-full mt-4"
            />
          </form>

          <p className="font-medium text-center mt-4 text-sm md:text-base">
            Are you Guest?{" "}
            <Link
              href="/users/loginGuest"
              className="text-blue-600 hover:text-blue-700"
            >
              Login as Guest
            </Link>
          </p>

          <div className="w-full md:w-3/4 mx-auto flex items-center gap-2 mt-7">
            <hr className="w-full border border-gray-300" />
            <span className="font-medium uppercase text-gray-700">Signup</span>
            <hr className="w-full border border-gray-300" />
          </div>

          <div className="w-full md:w-3/4 mx-auto">
            <Link href="/users/signupEmployee">
              <Button
                label="Signup as employee"
                size="large"
                type="main"
                variant="danger-secondary"
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
          className="h-screen w-full object-cover hidden md:block"
        />
      </main>
    </>
  );
}

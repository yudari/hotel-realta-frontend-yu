import Head from "next/head";
import React from "react";
import Logo from "@/public/logo-realta.png";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import InputText from "@/components/Input/InputText";
import Button from "@/components/Button/button";

export default function SignupEmployee() {
  type FormValues = {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
    phone_number_code: string;
    phone_number: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const registerOptions = {
    username: { required: "Username is required" },
    email: { required: "Email is required" },
    password: { required: "Password is required" },
    confirm_password: { required: "Confirm Password is required" },
    phone_number_code: { required: "Phone Number Code is required" },
    phone_number: { required: "Phone Number is required" },
  };

  return (
    <>
      <Head>
        <title>Hotel Realta - Signup Employee</title>
      </Head>
      <main className="h-full grid grid-cols-2 place-content-center">
        <div className="w-3/4 mx-auto py-10">
          <Link href="/">
            <Image
              src={Logo}
              width={450}
              height={450}
              alt="Logo"
              className="mx-auto"
            />
          </Link>

          <hr className="w-3/4 mx-auto mt-6" />

          <h1 className="text-3xl text-center uppercase font-medium mt-7">
            Employee Signup
          </h1>

          <form
            className="w-3/4 mx-auto mt-7"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* <div className="form-group mb-3">
              <label htmlFor="username" className="text-lg font-medium">
                Username
              </label>
              <input
                type="text"
                className="w-full p-3 mt-2 border-2 border-gray-500 outline-none active:border-blue-600 focus:border-blue-800"
                placeholder="Full Name"
              />
            </div> */}
            <InputText
              name="username"
              label="Username"
              placeholder="Your username"
              type="text"
              errors={errors}
              register={register}
              registerOptions={registerOptions}
              className="w-full"
              required={true}
            />

            <InputText
              name="email"
              label="Email"
              placeholder="Your Email"
              type="email"
              errors={errors}
              register={register}
              registerOptions={registerOptions}
              className="w-full"
              required={true}
            />

            <InputText
              name="password"
              label="Password"
              placeholder="Your Password"
              type="password"
              errors={errors}
              register={register}
              registerOptions={registerOptions}
              className="w-full"
              required={true}
            />

            <InputText
              name="confirm_password"
              label="Confirm Password"
              placeholder="Your Confirm Password"
              type="password"
              errors={errors}
              register={register}
              registerOptions={registerOptions}
              className="w-full"
              required={true}
            />

            <div className="form-group mt-3">
              <label htmlFor="phone_number" className="text-lg font-medium">
                Phone Number<span className="text-danger">*</span>
              </label>

              <div className="flex items-center">
                <input
                  type="text"
                  {...register(
                    "phone_number_code",
                    registerOptions.phone_number_code
                  )}
                  className="w-1/4 p-3 mt-2 border-2 border-variant outline-none active:border-blue-600 focus:border-blue-800 rounded mr-3"
                  placeholder="+62"
                />

                <input
                  type="text"
                  {...register("phone_number", registerOptions.phone_number)}
                  className="w-full p-3 mt-2 border-2 border-gray-500 outline-none active:border-blue-600 focus:border-blue-800 rounded"
                  placeholder="Phone Number"
                />
              </div>

              <small className="text-red-600 block">
                {errors?.phone_number_code && errors.phone_number_code.message}
              </small>

              <small className="text-red-600">
                {errors?.phone_number && errors.phone_number.message}
              </small>
            </div>

            {/* 
            <div className="form-group mb-3">
              <label htmlFor="email" className="text-lg font-medium">
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 mt-2 border-2 border-gray-500 outline-none active:border-blue-600 focus:border-blue-800"
                placeholder="Your Email (eg. mail@gmail.com)"
              />
            </div> */}
            {/* 
            <div className="form-group mb-3">
              <label htmlFor="password" className="text-lg font-medium">
                Password
              </label>
              <input
                type="password"
                className="w-full p-3 mt-2 border-2 border-gray-500 outline-none active:border-blue-600 focus:border-blue-800"
                placeholder="Password"
              />
            </div> */}
            {/* 
            <div className="form-group mb-3">
              <label htmlFor="confirm_password" className="text-lg font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full p-3 mt-2 border-2 border-gray-500 outline-none active:border-blue-600 focus:border-blue-800"
                placeholder="Confirm Password"
              />
            </div> */}

            {/* 
            <div className="form-group mb-3">
              <label htmlFor="phone_number" className="text-lg font-medium">
                Phone Number
              </label>

              <div className="flex gap-2 items-center">
                <input
                  type="password"
                  className="w-1/4 p-3 mt-2 border-2 border-gray-500 outline-none active:border-blue-600 focus:border-blue-800"
                  placeholder="+62"
                />

                <input
                  type="password"
                  className="w-3/4 p-3 mt-2 border-2 border-gray-500 outline-none active:border-blue-600 focus:border-blue-800"
                  placeholder="Phone Number"
                />
              </div>
            </div> */}

            {/* <button className="w-full p-3 mt-6 bg-blue-600 font-medium text-lg uppercase text-white hover:bg-blue-700 transition-colors duration-200 ease-out">
              Signup
            </button> */}
            <Button
              label="Signup"
              size="large"
              type="main"
              variant="primary"
              className="w-full mt-6"
            />
          </form>

          <p className="font-medium text-center mt-4">
            Already Have Account?{" "}
            <Link
              href="/users/loginEmployee"
              className="text-blue-600 hover:text-blue-800"
            >
              Click This For Login
            </Link>
          </p>
        </div>

        <Image
          src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3MzkyMTI2MA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
          width={1024}
          height={1024}
          alt="hotel-realta"
          className="h-full w-full object-cover"
        />
      </main>
    </>
  );
}

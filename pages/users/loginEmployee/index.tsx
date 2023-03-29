import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/public/logo-realta.png";

export default function LoginEmployee() {
  return (
    <>
      <Head>
        <title>Hotel Realta - Login Guest</title>
      </Head>
      <main className="grid grid-cols-2 h-screen items-center">
        <div className="w-3/4 mx-auto">
          <Link href="/">
            <Image
              src={Logo}
              alt="hotel logo"
              width={450}
              height={250}
              className="mx-auto mt-10"
            />
          </Link>

          <hr className="w-3/4 mx-auto mt-5" />

          <form className="w-3/4 mx-auto mt-7">
            <div className="form-group mt-4">
              <label htmlFor="email" className="text-lg font-medium">
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 mt-2 border-2 border-gray-500 outline-none active:border-blue-600 focus:border-blue-800"
                placeholder="Your Email (eg. mail@gmail.com)"
              />
            </div>

            <div className="form-group mt-4">
              <label htmlFor="password" className="text-lg font-medium">
                Password
              </label>
              <input
                type="password"
                className="w-full p-3 mt-2 border-2 border-gray-500 outline-none active:border-blue-600 focus:border-blue-800"
                placeholder="Your password"
              />
            </div>

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

            <button className="w-full p-3 mt-6 bg-blue-600 font-medium text-lg uppercase text-white hover:bg-blue-700 transition-colors duration-200 ease-out">
              Signin
            </button>
          </form>
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

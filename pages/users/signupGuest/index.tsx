import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/public/logo-realta.png";

export default function SignupGuest() {
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

          <form className="w-3/4 mx-auto mt-7">
            <label htmlFor="phone_number" className="text-lg font-medium">
              Phone Number
            </label>
            <div className="grid grid-cols-4 gap-3 mt-2">
              <input
                type="text"
                className="w-full p-3 border-2 border-gray-500 outline-none active:border-blue-600 focus:border-blue-800"
                placeholder="+62"
              />
              <input
                type="text"
                className=" w-full p-3 col-span-3 border-2 border-gray-500 outline-none active:border-blue-600 focus:border-blue-800 "
                placeholder="Your Phone Number"
              />
            </div>

            <button className="w-full p-3 mt-6 bg-blue-600 font-medium text-lg uppercase text-white hover:bg-blue-700 transition-colors duration-200 ease-out">
              Signup
            </button>
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

import Image from "next/image";
import React, { useEffect, useState } from "react";
import HotelLogo from "@/public/realta-hotel-logo.svg";
import Button from "@/components/Button/button";
import TabUser from "@/components/TabUser";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

export default function UserProfile({ userData, bonus, members }: any) {
  const router = useRouter();
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem("loginData") || "{}");

    const { user_id } = router.query;

    if (!redirected && userLogin.user_id !== user_id) {
      router.push(`/users/profile/${userLogin.user_id}`);
      setRedirected(true);
    }
  }, [router, router.query, redirected]);

  return (
    <div className="w-full shadow-md p-4">
      <section className="general">
        <div className="card-header">
          <h1 className="text-2xl text-primary font-bold">General</h1>
          <hr className="mt-1" />
        </div>

        <p className="font-medium mt-4">
          The information will be display, so be careful what you share
        </p>

        <div className="grid grid-cols-4 mt-8">
          <Image
            src={HotelLogo}
            alt="Hotel Realta Logo"
            width={100}
            height={100}
            className="rounded-full mx-auto"
          />

          <div className="flex flex-col gap-2">
            <p>{userData.user_full_name}</p>
            <p>{userData.usme_memb_name} Member</p>

            {userData.user_type === "T" ? (
              <span>Travel Agent</span>
            ) : userData.user_type === "C" ? (
              <span>Corporate</span>
            ) : (
              <span>Individual</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <p>{userData.user_email}</p>
            <p>{userData.user_phone_number} (Active)</p>
          </div>

          <div className="flex items-end justify-end">
            <Button label="Edit" size="small" type="main" variant="secondary" />
          </div>
        </div>
      </section>

      <section id="security" className="mt-10">
        <div id="security-header">
          <h1 className="text-2xl text-primary font-bold">Security</h1>
          <hr className="mt-1" />
        </div>

        <div className="security-card flex justify-between">
          <div className="form-group mt-4">
            <label htmlFor="password" className="block text-lg font-medium">
              Password
            </label>
            <input
              type="password"
              className="outline-none border border-spacing-2 border-variant block p-3 mt-2 active:border-blue-700 focus:border-blue-700 active:bg-blue-200 focus:bg-blue-200 rounded"
              value={userData.uspa_passwordhash}
              readOnly
            />
          </div>

          <div className="flex items-end">
            <Button label="Edit" size="small" type="main" variant="secondary" />
          </div>
        </div>
      </section>

      <section id="points-member" className="mt-10">
        <div id="security-header">
          <h1 className="text-2xl text-primary font-bold">Points & Member</h1>
          <hr className="mt-1" />
        </div>

        <div className="security-card flex justify-between">
          <TabUser bonusPoints={bonus} historyMembers={members} />
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { req } = context;
  const { id } = context.params;

  if (!req.cookies["loginData"] && !req.cookies["token"]) {
    return {
      redirect: {
        destination: "/users/loginEmployee",
      },
    };
  }

  const loginData = JSON.parse(req.cookies["loginData"]);
  // console.log(JSON.parse(req.cookies["loginData"]));

  if (Number(loginData.user_id) !== Number(id)) {
    return {
      redirect: {
        statusCode: 301,
        destination: `/users/profile/${loginData.user_id}`,
      },
    };
  }

  // Fetch user by ID
  const resUser = await axios.get(`${process.env.BACKEND_URL}/users/${id}`);
  const userData = await resUser.data.data;

  if (userData.statusCode === 404) {
    return {
      notFound: true,
    };
  }

  // fetch user bonus point
  const resBonus = await axios.get(
    `${process.env.BACKEND_URL}/users/bonusPoints/${id}`
  );
  const bonus = await resBonus.data.data;

  // fetch user
  const resMembers = await axios.get(
    `${process.env.BACKEND_URL}/users/userMembers/${id}`
  );
  const members = await resMembers.data.data;

  return { props: { userData, bonus, members } };
}

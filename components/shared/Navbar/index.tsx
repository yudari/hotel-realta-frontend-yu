import React, { Fragment } from "react";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import { HiMenuAlt1 } from "react-icons/hi";
import Avatar from "@/public/avatar.svg";
import { BiLogOut } from "react-icons/bi";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumbs";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/router";

export default function Navbar({
  showSidebar,
  setShowSidebar,
  handleLogout,
  loginData,
}: any) {
  const {
    user_role_id,
    user_full_name,
    user_photo_profile,
    user_email,
    user_id,
  } = loginData;

  const router = useRouter();
  const imageUrl = `${process.env.BACKEND_URL}/image/users`;

  const pathnames = router.pathname.split("/").filter((path) => path);

  if (pathnames.length && /\[.+\]/.test(pathnames[pathnames.length - 1])) {
    pathnames.pop();
  }

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="">
        <div className="">
          <div className="h-6 w-full pt-1">
            <Breadcrumb />
          </div>
          <p className="shrink text-3xl capitalize text-navy-700 dark:text-white mt-5 font-bold hover:text-navy-700">
            {pathnames[0]} {pathnames[pathnames.length - 1]}
          </p>
        </div>
      </div>

      <div className="relative bg-white px-2 py-2 shadow-xl shadow-shadow-500 rounded-full flex items-center justify-end md:w-60 w-full">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex text-right w-full justify-center rounded-full items-center gap-3">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-sm">{user_full_name}</span>
                <span className="font-light text-sm text-variant">
                  {Number(user_role_id) === 1
                    ? "Guest"
                    : Number(user_role_id) === 2
                      ? "Manager"
                      : Number(user_role_id) === 3
                        ? "Office Boy"
                        : Number(user_role_id) === 4
                          ? "Admin"
                          : "User"}
                </span>
              </div>
              <picture>
                {user_photo_profile ? (
                  <Image
                    src={`${imageUrl}/${user_photo_profile}`}
                    alt="Picsum"
                    width={40}
                    height={40}
                    className="rounded-full h-12 w-12 ring ring-slate-300"
                  />
                ) : (
                  <Image
                    src={Avatar}
                    alt="Picsum"
                    width={50}
                    height={50}
                    className="rounded-full h-12 w-12"
                  />
                )}
              </picture>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-75"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition ease-in duration=75"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 z-50 origin-top-right bg-white rounded-lg shadow-sm mt-4">
              <div className="p-4">
                <Menu.Item>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-sm">
                      {user_full_name}
                    </span>
                    <span className="text-sm font-light">{user_email}</span>
                  </div>
                </Menu.Item>
                <hr className="mt-2 border border-gray-300" />
                <Menu.Item>
                  <Link
                    type="button"
                    className="flex text-primary hover:bg-primary hover:text-white hover:rounded p-2 w-full text-sm group transition-colors items-center font-medium mt-2"
                    href={`/users/profile/${user_id}`}
                  >
                    <FaUser className="h-4 w-4 mr-2" />
                    My Profile
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <button
                    type="button"
                    className="flex text-danger-secondary hover:bg-danger-secondary hover:text-white hover:rounded p-2 w-full text-sm group transition-colors items-center font-medium mt-2"
                    onClick={handleLogout}
                  >
                    <BiLogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <span
          className="flex cursor-pointer text-xl text-gray-600 bg-gray-200 p-4 rounded-full xl:hidden ml-4"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <HiMenuAlt1 className="text-2xl" />
        </span>
      </div>
    </nav>
  );
}

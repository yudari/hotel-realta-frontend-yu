import React, { useState, Fragment } from "react";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import { HiMenuAlt1 } from "react-icons/hi";
import Avatar from "@/public/avatar.svg";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { doLogout } from "@/redux/users/action/loginActionReducers";

export default function Navbar({
  showSidebar,
  setShowSidebar,
  handleLogout,
}: any) {
  return (
    <nav
      className={`fixed z-20 w-full bg-white shadow-md sm:py-2 dark:bg-gray-800 dark:border-gray-700 px-4`}
    >
      <div className="container py-3 mx-auto">
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center justify-start transform transition duration-500 ease-in-out ${
              showSidebar ? "translate-x-72" : "-translate-x-0"
            }`}
          >
            <a href="#" className="flex mr-4">
              <HiMenuAlt1
                className="text-2xl"
                onClick={() => setShowSidebar(!showSidebar)}
              />
            </a>

            <p className="text-[#13293D] font-bold text-2xl">My Profile</p>
          </div>

          {/* <div className="user-profile flex items-center gap-3">
            <span className="font-medium">Hi, User</span>
            <Image
              src={Avatar}
              width={30}
              height={30}
              alt="User Avatar"
              className="rounded-full border-2 border-gray-600"
            />

            <div
              className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 block"
              id="dropdown-2"
              style={{
                position: "absolute",
                inset: "0px auto auto 0px",
                margin: "0px",
                transform: "translate3d(184.5px, 58px, 0px)",
              }}
            >
              <div className="px-4 py-3" role="none">
                <p
                  className="text-sm text-gray-900 dark:text-white"
                  role="none"
                >
                  Neil Sims
                </p>
                <p
                  className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                  role="none"
                >
                  neil.sims@flowbite.com
                </p>
              </div>
              <ul className="py-1" role="none">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div> */}
          <div className="flex items-center ml-3">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-full items-center gap-3">
                  <span className="font-medium">Hi, User</span>
                  <picture>
                    <Image
                      src={Avatar}
                      alt="Picsum"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
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
                <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right bg-white rounded shadow-sm border border-gray-600">
                  <div className="p-1">
                    <Menu.Item>
                      <button
                        type="button"
                        className="flex text-gray-400 hover:bg-gray-100 hover:text-gray-700 p-2 w-full text-sm group transition-colors items-center"
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
          </div>
        </div>
      </div>
    </nav>
  );
}

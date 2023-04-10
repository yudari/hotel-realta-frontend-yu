import React, { Fragment } from "react";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import { HiMenuAlt1 } from "react-icons/hi";
import Avatar from "@/public/avatar.svg";
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { doLogout } from "@/redux/users/action/loginActionReducers";

export default function Navbar({
  showSidebar,
  setShowSidebar,
  handleLogout,
  loginData,
}: any) {
  const { user_role_id, user_full_name } = loginData;


  return (
    <nav
      className={`fixed z-20 w-full bg-white shadow-md sm:py-2 dark:bg-gray-800 dark:border-gray-700 px-4`}
    >
      <div className="container py-3 mx-auto">
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center justify-start transform transition duration-500 ease-in-out ${showSidebar ? "translate-x-72" : "-translate-x-0"
              }`}
          >
            <a href="#" className="flex mr-4">
              <HiMenuAlt1
                className="text-2xl"
                onClick={() => setShowSidebar(!showSidebar)}
              />
            </a>
          </div>

          <div className="flex items-center ml-3">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex text-right w-full justify-center rounded-full items-center gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-sm">
                      {user_full_name}
                    </span>
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
                    <Image
                      src={Avatar}
                      alt="Picsum"
                      width={50}
                      height={50}
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
                <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right bg-white rounded shadow-sm border-2 border-primary">
                  <div className="p-1">
                    <Menu.Item>
                      <button
                        type="button"
                        className="flex text-primary hover:bg-primary hover:text-white hover:rounded p-2 w-full text-sm group transition-colors items-center font-medium"
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


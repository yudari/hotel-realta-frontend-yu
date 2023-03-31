import Image from "next/image";
import React, { useState } from "react";
import Logo from "@/public/logo-realta.png";
import listMenu from "./listMenu";
import { GoChevronRight } from "react-icons/go";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Sidebar({ showSidebar, setShowSidebar }: any) {
  const router = useRouter();
  const [dropdown, setDropdown] = useState({
    status: false,
    index: 0,
  });

  const showDropdown = (index: number) => {
    setDropdown({
      status: dropdown.index === index ? !dropdown.status : true,
      index,
    });
  };

  return (
    <>
      <aside
        id="sidebar"
        className={`fixed top-0 left-0 z-50 flex-col flex-shrink-0 hidden h-full w-72 font-normal lg:flex transform transition duration-500 ease-in-out ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col flex-1 min-h-0 pt-0 shadow-lg  border-gray-200">
          <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              <ul className="pb-2">
                <Link href="/dashboard">
                  <Image src={Logo} alt="Hotel Realta Logo" />
                </Link>

                <hr className="my-4" />

                {listMenu.map((menu, index) => {
                  const Icon = menu.icon;

                  return (
                    <>
                      <li key={index} onClick={() => showDropdown(index)}>
                        {menu.submenu ? (
                          <div
                            className={`flex items-center p-4 text-base text-gray-900 rounded-lg  group hover:bg-[#5D5145] hover:bg-opacity-20 hover:border-2 hover:border-[#5D5145] justify-between ${
                              router.pathname === menu.path
                                ? "bg-[#5D5145] bg-opacity-20 border-2 border-[#5D5145]"
                                : "hover:bg-[#5D5145] hover:bg-opacity-20 hover:border-2 hover:border-[#5D5145]"
                            }`}
                          >
                            <div className="flex items-center">
                              <Icon className="text-xl" />
                              <span className="ml-3 text-md font-medium">
                                {menu.name}
                              </span>
                            </div>

                            {menu.submenu && (
                              <GoChevronRight
                                className={`hover:bg-[#5D5145] hover:bg-opacity-20 hover:border-2 hover:border-[#5D5145] ${
                                  dropdown.status && dropdown.index === index
                                    ? "rotate-90"
                                    : ""
                                }`}
                              />
                            )}
                          </div>
                        ) : (
                          <Link
                            href={menu.to}
                            className={`flex items-center p-4 text-base text-gray-900 rounded-lg group dark:text-gray-200 justify-between my-2 ${
                              router.pathname === menu.path
                                ? "bg-[#5D5145] bg-opacity-20 border-2 border-[#5D5145]"
                                : "hover:bg-[#5D5145] hover:bg-opacity-20 hover:border-2 hover:border-[#5D5145]"
                            }`}
                          >
                            <div className="flex items-center">
                              <Icon className="text-xl" />
                              <span className="ml-3 text-md font-medium">
                                {menu.name}
                              </span>
                            </div>
                          </Link>
                        )}
                      </li>

                      {menu.submenu &&
                        dropdown.status &&
                        dropdown.index === index && (
                          <div className="">
                            {menu.submenu.map((submenu, index) => (
                              <Link
                                href={submenu.to}
                                key={index}
                                className="flex items-center gap-3 py-2 pl-12 rounded-md hover:bg-[#5D5145] hover:bg-opacity-20 hover:border-2 hover:border-[#5D5145]"
                              >
                                <span>{submenu.title}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                    </>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* <div className="absolute bottom-0 left-0 justify-center w-full p-4 space-x-4 bg-gray-200 lg:flex">
            Icon
          </div> */}

          {/* <div className="absolute bottom-0 left-0 justify-center w-full p-4 space-x-4 bg-gray-200 lg:flex">
            Icon
          </div> */}
        </div>
      </aside>
    </>
  );
}

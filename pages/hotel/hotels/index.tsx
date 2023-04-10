import {
  doRequestGetCity,
  doRequestGetHotels,
} from "../../../redux/hotel/action/actionReducer";
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { MdAddBox } from "react-icons/md";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import AddHotels from "./addHotels";
import EditHotels from "./editHotels";
import SwitchStatus from "./switchStatus";
import Link from "next/link";
import { Pagination } from "@/components/hotel/Pagination";
import Button from "@/components/Button/button";

const Hotels = () => {
  let { hotels, message, refresh } = useSelector(
    (state: any) => state.hotelsReducers
  );
  console.log(hotels);
  const dispatch = useDispatch();

  //===Pagination===
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(7);

  //======Open, Edit, Switch========
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState({
    status: false,
    hotel_id: 0,
  });
  const [isSwitch, setIsSwitch] = useState({
    status: false,
    hotel_id: 0,
  });
  const editOpen = (hotel_id: number) => {
    setIsEdit((prev) => {
      return { ...prev, status: true, hotel_id: hotel_id };
    });
  };
  const switchOpen = (hotel_id: number) => {
    setIsSwitch((prev) => {
      return { ...prev, status: true, hotel_id: hotel_id };
    });
  };
  //===========ICON Star========================
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? true : false;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar className="text-amber-400" key={i} />);
      } else if (halfStar && i === fullStars + 1) {
        stars.push(<FaStarHalfAlt className="text-amber-400" key={i} />);
      } else {
        stars.push(<FaRegStar className="text-amber-400" key={i} />);
      }
    }

    return stars;
  };

  const columns = [
    { name: "NO" },
    { name: "Hotel Name" },
    { name: "Rating Star" },
    { name: "Phone Number" },
    { name: "Modified Date" },
  ];
  //============Search================
  const [search, setSearch] = useState("");
  const handleSearch = (event: any): void => {
    setSearch(event.target.value);
  };

  //===============================
  useEffect(() => {
    dispatch(doRequestGetHotels(pageNumber, pageSize, search));
    dispatch(doRequestGetCity());
    localStorage.removeItem("hotels");
  }, [refresh, pageNumber, pageSize, search]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-screen">
      {/* Breadcrumb */}
      <div className="bg-white text-black py-2 px-6 flex font-bold border-t-2 border-r-2 border-l-2 items-center justify-between">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a
                href="/"
                className="inline-flex items-center font-bold text-black text-medium hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <a
                  href="/hotel/hotels"
                  className="ml-1 text-sm text-black font-bold hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Hotels
                </a>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      {/* Header */}
      <div className="bg-white text-black py-2 px-6 flex border-2 items-center justify-between">
        <div className="relative z-0 w-full mb-4 mt-4 ml-20 group flex space-x-2">
          <label className="peer-focus:font-medium mt-2 text-sm font-bold flex">
            Hotel Name
          </label>
          <div className="relative w-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 font-medium text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5 "
              placeholder="Search"
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
      {/* Columns */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-screen">
        <table className="w-full tex-xs text-left text-gray-500 dark:text-gray-400">
          <thead className="text-sm text-white uppercase bg-primary dark:bg-black dark:text-black ">
            <tr className="">
              {(columns || []).map((col) => (
                <th key={col.name} style={{ whiteSpace: "nowrap" }}>
                  <span className="px-4">{col.name}</span>
                </th>
              ))}

              <th className="px-6 py-3 ">
                <button
                  className="flex items-center"
                  onClick={() => setIsOpen(true)}
                >
                  <MdAddBox className="mr-1" />
                  <span className="mr-2" style={{ whiteSpace: "nowrap" }}>
                    Add Hotel
                  </span>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {(hotels.data || []).map((dt: any, index: number) => (
              <tr
                key={dt.hotel_id}
                className="bg-white border-b hover:bg-primary/5"
              >
                <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index + 1}
                </td>
                <td className="px-4 py-4 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white">
                  {dt.hotel_name}
                </td>
                <td className="px-8 py-4 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white items-center display flex">
                  {renderStars(dt.hotel_rating_star)}
                </td>
                <td className="px-4 py-4 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white text-center">
                  {dt.hotel_phonenumber}
                </td>
                <td className="px-4 py-4 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white text-center">
                  {new Date(dt.hotel_modified_date).toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </td>
                <td className="px-12 py-3 text-sm text-gray-900 text-right">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center rounded-md bg-none px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        <BsThreeDotsVertical
                          className="ml-2 -mr-1 h-5 w-5 text-primary"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 z-50 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? "bg-primary/75 text-white"
                                    : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                onClick={() => editOpen(dt.hotel_id)}
                              >
                                {active ? (
                                  <FaRegEdit
                                    className="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <FaRegEdit
                                    className="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                                Edit
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                        <div className="px-1 py-1 ">
                          <Menu.Item>
                            {({ active }) => (
                              <Link href={`/hotel/facilities/${dt.hotel_id}`}>
                                <button
                                  className={`${
                                    active
                                      ? "bg-primary/75 text-white"
                                      : "text-gray-900"
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                  {active ? (
                                    <MdAddBox
                                      className="mr-2 h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <MdAddBox
                                      className="mr-2 h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                  Add Facilities
                                </button>
                              </Link>
                            )}
                          </Menu.Item>
                        </div>

                        <div className="px-1 py-1 ">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href={`/hotel/facilities-support/${dt.hotel_id}`}
                              >
                                <button
                                  className={`${
                                    active
                                      ? "bg-primary/75 text-white"
                                      : "text-gray-900"
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  // onClick={() => editOpen(dt.id_user)}
                                >
                                  {active ? (
                                    <MdAddBox
                                      className="mr-2 h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <MdAddBox
                                      className="mr-2 h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                  Add Facility Support
                                </button>
                              </Link>
                            )}
                          </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? "bg-primary/75 text-white"
                                    : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                onClick={() => switchOpen(dt.hotel_id)}
                              >
                                {active ? (
                                  <HiOutlineSwitchHorizontal
                                    className="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <HiOutlineSwitchHorizontal
                                    className="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                                Swict Status
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          pagination={{ totalPage: hotels?.totalPage, page: hotels?.page }}
          setPage={setPageNumber}
        />
      </div>
      {isOpen ? (
        <AddHotels isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      ) : null}
      {isEdit.status ? (
        <EditHotels
          isEdit={isEdit}
          closeModal={() =>
            setIsEdit((prev) => {
              return { ...prev, status: false };
            })
          }
        />
      ) : null}
      {isSwitch.status ? (
        <SwitchStatus
          isSwitch={isSwitch}
          closeModal={() =>
            setIsSwitch((prev) => {
              return { ...prev, status: false };
            })
          }
        />
      ) : null}
    </div>
  );
};

export default Hotels;

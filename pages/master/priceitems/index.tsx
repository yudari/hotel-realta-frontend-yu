import {
  doDeletePriceItems,
  doRequestGetPriceItems,
} from "@/redux/masterSchema/action/priceitemAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./componentmodal";
import Button from "@/components/Button/button";
import AddPriceMaster from "./addPriceItems";
import { AiOutlinePlus } from "react-icons/ai";
import { MdEdit, MdDelete } from "react-icons/md";
import EditPriceMaster from "./editPriceItems";
// import EditPriceMaster from "./editPriceItems";

export default function PriceMaster() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  let { priceitems, refresh } = useSelector(
    (state: any) => state.priceitemsReducer
  );

  const totalArr = Array.apply(null, Array(priceitems?.totalPages)).map(
    function (x, i) {
      return i;
    }
  );

  const handleIncPage = () => {
    if (page >= totalArr.length) {
      setPage(page);
    } else {
      setPage(page + 1);
    }
  };

  const handleDecPage = () => {
    if (page <= 1) {
      setPage(1);
    } else {
      setPage(page - 1);
    }
  };

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState({
    status: false,
    id: 0,
  });

  const columns = [
    { name: "ID" },
    { name: "Item Name" },
    { name: "            " },
    { name: "Price" },
    { name: "Type" },
    { name: "Action" },
  ];

  const editOpen = (id: number) => {
    setIsEdit((prev) => {
      return { ...prev, status: true, id: id };
    });
  };

  const deleteOpen = (id: number) => {
    const confirmDelete = window.confirm(`Anda yakin ingin mengahpus data ini`);
    if (confirmDelete) {
      dispatch(doDeletePriceItems(id));
    }
  };

  // console.log("data", priceitems);

  useEffect(() => {
    dispatch(doRequestGetPriceItems(searchQuery, searchType, page, limit));
  }, [limit, page, dispatch, refresh, searchQuery, searchType]);

  return (
    <div className="relative overflow-x-auto shadow-md mt-5 rounded-xl bg-white p-4">
      {/* search */}
      <div>
        <form className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-80">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Item Name"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="status" className="sr-only">
                  Status
                </label>
                <div className="relative w-44 ml-2">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <select
                    id="status"
                    name="status"
                    className="block w-full py-2.5 px-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e: any) =>
                      e.target.value === "Type"
                        ? setSearchType("")
                        : setSearchType(e.target.value)
                    }
                  >
                    <option selected>Type</option>
                    <option value="Snack">Snack</option>
                    <option value="Facility">Facility</option>
                    <option value="Food">Food</option>
                    <option value="Softdrink">Softdrink</option>
                    <option value="Service">Service</option>
                  </select>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              label="Add"
              size="small"
              type="secondary"
              className="ml-0"
              onClick={() => setIsOpen(true)}
              icon={AiOutlinePlus}
            />
          </div>
        </form>
      </div>

      {/* <label className="block text-gray-700">Select an option</label>
      <select
        // {...register("cagro_type", registerOptions.cagro_type)}
        className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-gray-200"
      >
        <option selected>Choose a type</option>
        <option value="Facility">Facility</option>
        <option value="Service">Service</option>
        <option value="Room">Room</option>
      </select> */}
      {/* search */}
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {(columns || []).map((col) => (
              <>
                <td key={col.name} className="px-6 py-3">
                  <span className="lg:pl-1 font-bold">{col.name}</span>
                </td>
              </>
            ))}
          </tr>
        </thead>
        <tbody>
          {(priceitems?.data || []).map((dt: any, index: number) => (
            <tr
              className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              key={dt.id}
            >
              {/* <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td> */}
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index + 1}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {dt.prit_name}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <Modal>{dt.prit_description} </Modal>
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(Number(dt.prit_price.replace(/[^0-9.-]+/g, "")))}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {dt.prit_type}
              </td>
              <td className="flex items-center px-6 py-4 space-x-3">
                <a
                  href="#"
                  className="border-2 border-primary hover:bg-primary hover:text-white transition-colors ease-in duration-100 p-2 rounded text-primary"
                  onClick={() => editOpen(dt.prit_id)}
                >
                  <MdEdit className="text-xl" />
                </a>
                <a
                  href="#"
                  className="border-2 border-danger-secondary hover:bg-danger-secondary hover:text-white transition-colors ease-in duration-100 p-2 rounded text-danger-secondary"
                  onClick={() => deleteOpen(dt.prit_id)}
                >
                  <MdDelete className="text-xl" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav
        aria-label="Page navigation example"
        className="flex items-center justify-end pt-4"
      >
        <ul className="inline-flex items-center -space-x-px">
          <li>
            <button
              className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={handleDecPage}
            >
              <span className="sr-only">Previous</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
          {totalArr.map((total, index) => (
            <li key={index}>
              <button
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => setPage(total + 1)}
              >
                {total + 1}
              </button>
            </li>
          ))}

          <li>
            <button
              className="block px-3 py-2 leading-tight text-gray-500 bg-white border 
            border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={handleIncPage}
            >
              <span className="sr-only">Next</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
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
            </button>
          </li>
        </ul>
      </nav>

      {isOpen ? (
        <AddPriceMaster isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      ) : null}

      {isEdit.status ? (
        <EditPriceMaster
          isEdit={isEdit}
          closeModal={() =>
            setIsEdit((prev) => {
              return { ...prev, status: false };
            })
          }
        />
      ) : null}
    </div>
  );
}

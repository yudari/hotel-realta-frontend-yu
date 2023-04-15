import Button from "@/components/Button/button";
import {
  doDeleteCategoryGroup,
  doRequestGetCategoryGroup,
} from "@/redux/masterSchema/action/categorygroupAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./componentmodal";
import AddCategoryMaster from "./addCategoryGroup";
import EditCategoryMaster from "./editCategoryGroup";
import { AiOutlinePlus } from "react-icons/ai";
import { MdEdit, MdDelete } from "react-icons/md";
import Image from "next/image";
import ModalImage from "./modalImage";

export default function CategorygroupMaster() {
  const imageUrl = `${process.env.BACKEND_URL}/image/master`;
  let { categorygroup, refresh } = useSelector(
    (state: any) => state.categorygroupReducer
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState({
    status: false,
    id: 0,
  });

  const editOpen = (id: any) => {
    setIsEdit((prev) => {
      return { ...prev, status: true, id: id };
    });
  };

  const deleteOpen = (id: number) => {
    const confirmDelete = window.confirm(`Anda yakin ingin mengahpus data ini`);
    if (confirmDelete) {
      dispatch(doDeleteCategoryGroup(id));
    }
  };

  const [showImage, setShowImage] = useState({
    status: false,
    image: "",
  });

  const handleShowImage = (e: any) => {
    setShowImage({
      status: true,
      image: e.target.getAttribute("src"),
    });
  };

  const dispatch = useDispatch();

  const columns = [
    { name: "Icon" },
    { name: "Category ID" },
    { name: "Category Name" },
    { name: "" },
    { name: "Type" },
    { name: "Action" },
  ];

  useEffect(() => {
    dispatch(doRequestGetCategoryGroup());
  }, [dispatch, refresh]);

  return (
    <div className="relative overflow-y-auto  shadow-md sm:rounded-lg bg-white p-4">
      <div className="pb-4 flex justify-end">
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

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
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
          {(categorygroup?.data || []).map((dt: any, index: number) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              key={dt.cagro_id}
            >
              {/* <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td> */}
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <div className="flex-shrink-0 w-10 h-10">
                  <Image
                    src={`${imageUrl}/${dt.cagro_icon_url}`}
                    alt="waw"
                    width={1000}
                    height={1000}
                    className="w-full h-full rounded-full"
                    onClick={handleShowImage}
                  />
                </div>
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white pl-[5rem]">
                {index + 1}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {dt.cagro_name}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <Modal>{dt.cagro_description} </Modal>
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {dt.cagro_type}
              </td>
              <td className="flex items-center px-6 py-4 space-x-3">
                <a
                  href="#"
                  className="border-2 border-primary hover:bg-primary hover:text-white transition-colors ease-in duration-100 p-2 rounded text-primary"
                  onClick={() => editOpen(dt.cagro_id)}
                >
                  <MdEdit className="text-xl" />
                </a>
                <a
                  href="#"
                  className="border-2 border-danger-secondary hover:bg-danger-secondary hover:text-white transition-colors ease-in duration-100 p-2 rounded text-danger-secondary"
                  onClick={() => deleteOpen(dt.cagro_id)}
                >
                  <MdDelete className="text-xl" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showImage.status ? (
        <ModalImage
          showImage={showImage}
          closeModal={() =>
            setShowImage((prev) => {
              return { ...prev, status: false };
            })
          }
        />
      ) : null}

      {isOpen ? (
        <AddCategoryMaster
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
        />
      ) : null}

      {isEdit.status ? (
        <EditCategoryMaster
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

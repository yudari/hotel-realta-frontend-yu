import Button from "@/components/Button/button";
import { doRequestGetAddressByCityById } from "@/redux/masterSchema/action/addressAction";
import {
  doDeleteCity,
  doRequestGetCityByProvinceById,
} from "@/redux/masterSchema/action/city";
import {
  doDeleteCountry,
  doRequestGetCountry,
  doRequestGetCountryByRegionById,
} from "@/redux/masterSchema/action/countryAction";
import {
  doDeleteProvince,
  doRequestGetProvinceByCountryById,
} from "@/redux/masterSchema/action/provinceAction";
import {
  doDeleteRegion,
  doRequestGetRegion,
} from "@/redux/masterSchema/action/regionAction";
// import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { FaRegEdit } from "react-icons/fa";
// import { HiOutlineSwitchHorizontal } from "react-icons/hi";
// import { TiDelete } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import AddRegionMaster from "./addRegion";
import EditRegionMaster from "./editRegion";
import AddCountryMaster from "./addCountry";
import EditCountryMaster from "./editCountry";
import AddProvinceMaster from "./addProvince";
import EditProvinceMaster from "./editProvince";
import AddCityMaster from "./addCity";
import EditCityMaster from "./editCity";
import { AiOutlinePlus } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function Locations() {
  const [regionID, setRegionID] = useState<any>({
    regionID: 0,
    regionName: "",
  });
  const [countryID, setCountryID] = useState<any>({
    countryID: 0,
    countryName: "",
  });
  const [provinceID, setProvinceID] = useState<any>({
    provinceID: 0,
    provinceName: "",
  });
  const [cityID, setCityID] = useState<any>({
    cityID: 0,
    cityName: "",
  });
  const [addressID, setAddressID] = useState(null);

  let {
    region,
    message,
    refresh: refreshregion,
  } = useSelector((state: any) => state.regionReducer);

  let { country, refresh: refreshCountry } = useSelector(
    (state: any) => state.countryReducer
  );

  let { province, refresh: refreshProvince } = useSelector(
    (state: any) => state.provinceReducer
  );

  let { city, refresh: refreshCity } = useSelector(
    (state: any) => state.cityReducer
  );

  let { address } = useSelector((state: any) => state.addressReducer);
  // console.log(province);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenC, setIsOpenC] = useState(false);
  const [isOpenP, setIsOpenP] = useState(false);
  const [isOpenT, setIsOpenT] = useState(false);
  const [isEdit, setIsEdit] = useState({
    status: false,
    id: 0,
  });
  const [isEditC, setIsEditC] = useState({
    status: false,
    id: 0,
  });
  const [isEditP, setIsEditP] = useState({
    status: false,
    id: 0,
  });
  const [isEditT, setIsEditT] = useState({
    status: false,
    id: 0,
  });

  const columnsRegion = [
    { name: "Region ID" },
    { name: "Region Name" },
    { name: "Action" },
  ];
  const columnsCountry = [
    { name: "Country ID" },
    { name: "Country Name" },
    { name: "Action" },
  ];
  const columnsProvince = [
    { name: "Province ID" },
    { name: "Province Name" },
    { name: "Action" },
  ];
  const columnsCity = [
    { name: "City ID" },
    { name: "City Name" },
    { name: "Action" },
  ];
  const columnsAddress = [
    { name: "Address ID" },
    { name: "Address Name" },
    { name: "Address Code" },
  ];

  const editOpen = (id: number) => {
    setIsEdit((prev) => {
      return { ...prev, status: true, id: id };
    });
  };
  const editOpenC = (id: number) => {
    setIsEditC((prev) => {
      return { ...prev, status: true, id: id };
    });
  };
  const editOpenP = (id: number) => {
    setIsEditP((prev) => {
      return { ...prev, status: true, id: id };
    });
  };
  const editOpenT = (id: number) => {
    setIsEditT((prev) => {
      return { ...prev, status: true, id: id };
    });
  };

  const deleteOpen = (id: number) => {
    const confirmDelete = window.confirm(`Anda yakin ingin mengahpus data ini`);
    if (confirmDelete) {
      dispatch(doDeleteRegion(id));
    }
  };
  const deleteOpenC = (id: number) => {
    const confirmDelete = window.confirm(`Anda yakin ingin mengahpus data ini`);
    if (confirmDelete) {
      dispatch(doDeleteCountry(id));
    }
  };
  const deleteOpenP = (id: number) => {
    const confirmDelete = window.confirm(`Anda yakin ingin mengahpus data ini`);
    if (confirmDelete) {
      dispatch(doDeleteProvince(id));
    }
  };
  const deleteOpenT = (id: number) => {
    const confirmDelete = window.confirm(`Anda yakin ingin mengahpus data ini`);
    if (confirmDelete) {
      dispatch(doDeleteCity(id));
    }
  };

  useEffect(() => {
    dispatch(doRequestGetRegion());
  }, [dispatch, refreshregion]);

  useEffect(() => {
    dispatch(doRequestGetCountryByRegionById(regionID.regionID));
  }, [refreshCountry, dispatch, regionID]);

  useEffect(() => {
    dispatch(doRequestGetProvinceByCountryById(countryID.countryID));
  }, [refreshProvince, dispatch, countryID]);

  useEffect(() => {
    dispatch(doRequestGetCityByProvinceById(provinceID.provinceID));
  }, [refreshCity, dispatch, provinceID]);

  const handleRegionChange = (e: any, name: string) => {
    const regionID = e.target.value;
    // setProvinceID(null);
    setCityID(null);
    setAddressID(null);
    setRegionID({ regionID: regionID, name: name });
    dispatch(doRequestGetCountryByRegionById(regionID));
  };

  const handleCountryChange = (e: any, name: string) => {
    const countryID = e.target.value;
    // setProvinceID(null);
    setCityID(null);
    setAddressID(null);
    setCountryID({ countryID: Number(countryID), name: name });
    dispatch(doRequestGetProvinceByCountryById(countryID));
  };
  const handleProvinceChange = (e: any, name: string) => {
    const provinceID = e.target.value;
    // setProvinceID(null);
    setCityID(null);
    setAddressID(null);
    setProvinceID({ provinceID: provinceID, name: name });
    dispatch(doRequestGetCityByProvinceById(provinceID));
  };
  const handleCityChange = (e: any, name: string) => {
    const cityID = e.target.value;
    // setProvinceID(null);
    setCityID(null);
    setAddressID(null);
    setCityID({ cityID: cityID, name: name });
    dispatch(doRequestGetAddressByCityById(cityID));
  };

  return (
    <>
      <div className="relative overflow-y-auto max-h-[400px] shadow-md sm:rounded-lg p-4 bg-white">
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
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <td className="px-6 py-3"></td>
              {(columnsRegion || []).map((col) => (
                <>
                  <td key={col.name} className="px-6 py-3">
                    <span className="lg:pl-1 font-bold">{col.name}</span>
                  </td>
                </>
              ))}
            </tr>
          </thead>
          <tbody>
            {(region?.data || []).map((dt: any, index: number) => (
              <tr
                className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={dt.region_code}
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="flex items-center">
                    <input
                      // checked={() => setRegionID(dt.region_code)}
                      // onClick={() => setRegionID(dt.region_code)}
                      // onChange={() => setRegionID(dt.region_code)}
                      // onClick={() =>
                      //   setData((prev) => {
                      //     return { ...prev, regionID: dt.region_code };
                      //   })
                      // }
                      value={dt.region_code}
                      onChange={(e) => handleRegionChange(e, dt.region_name)}
                      name="region"
                      id="checkbox-table-search-1"
                      // checked={regionID === region.id}
                      type="radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index + 1}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                  {dt.region_name}
                </td>
                <td className="flex items-center px-6 py-4 space-x-3">
                  <a
                    href="#"
                    className="border-2 border-primary hover:bg-primary hover:text-white transition-colors ease-in duration-100 p-2 rounded text-primary"
                    onClick={() => editOpen(dt.region_code)}
                  >
                    <MdEdit className="text-xl" />
                  </a>
                  <a
                    href="#"
                    className="border-2 border-danger-secondary hover:bg-danger-secondary hover:text-white transition-colors ease-in duration-100 p-2 rounded text-danger-secondary"
                    onClick={() => deleteOpen(dt.region_code)}
                  >
                    <MdDelete className="text-xl" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isOpen ? (
          <AddRegionMaster
            isOpen={isOpen}
            closeModal={() => setIsOpen(false)}
          />
        ) : null}
        {isEdit.status ? (
          <EditRegionMaster
            isEdit={isEdit}
            closeModal={() =>
              setIsEdit((prev) => {
                return { ...prev, status: false };
              })
            }
          />
        ) : null}
      </div>

      <div className="relative overflow-y-auto max-h-[400px] shadow-md sm:rounded-lg mt-1">
        {country && country.length !== 0 && (
          <div className="p-4 bg-white mt-10">
            <div className="pb-4 flex justify-end">
              <Button
                variant="primary"
                label="Add"
                size="small"
                type="secondary"
                className="ml-0"
                onClick={() => setIsOpenC(true)}
                icon={AiOutlinePlus}
              />
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <td className="px-6 py-3"></td>
                  {(columnsCountry || []).map((col) => (
                    <>
                      <td key={col.name} className="px-6 py-3">
                        <span className="lg:pl-1 font-bold">{col.name}</span>
                      </td>
                    </>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(country || []).map((ct: any, index: number) => (
                  <tr
                    className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={ct.country_id}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center">
                        <input
                          // onClick={() => setCountryID(ct.country_id)}

                          // onChange={() => setCountryID(ct.country_id)}
                          value={ct.country_id}
                          onChange={(e) =>
                            handleCountryChange(e, ct.country_name)
                          }
                          // onClick={() =>
                          //   setData((prev) => {
                          //     return { ...prev, countryID: ct.country_id };
                          //   })
                          // }
                          name="country"
                          id="checkbox-table-search-1"
                          type="radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {ct.country_name}
                    </td>

                    <td className="flex items-center px-6 py-4 space-x-3">
                      <a
                        href="#"
                        className="border-2 border-primary hover:bg-primary hover:text-white transition-colors ease-in duration-100 p-2 rounded text-primary"
                        onClick={() => editOpenC(ct.country_id)}
                      >
                        <MdEdit className="text-xl" />
                      </a>
                      <a
                        href="#"
                        className="border-2 border-danger-secondary hover:bg-danger-secondary hover:text-white transition-colors ease-in duration-100 p-2 rounded text-danger-secondary"
                        onClick={() => deleteOpenC(ct.country_id)}
                      >
                        <MdDelete className="text-xl" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {isOpenC ? (
          <AddCountryMaster
            isOpen={isOpenC}
            region={regionID}
            closeModal={() => setIsOpenC(false)}
          />
        ) : null}
        {isEditC.status ? (
          <EditCountryMaster
            isEdit={isEditC}
            region={regionID}
            closeModal={() =>
              setIsEditC((prev) => {
                return { ...prev, status: false };
              })
            }
          />
        ) : null}
      </div>

      <div className="relative overflow-y-auto max-h-[400px] shadow-md sm:rounded-lg mt-10">
        {province && province.length !== 0 && (
          <div className="p-4 bg-white mt-10">
            <div className="flex justify-end pb-4">
              <Button
                variant="variant"
                label="Add"
                size="small"
                type="secondary"
                className="ml-0"
                onClick={() => setIsOpenP(true)}
                icon={AiOutlinePlus}
              />
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <td className="px-6 py-3"></td>
                  {(columnsProvince || []).map((col) => (
                    <>
                      <td key={col.name} className="px-6 py-3">
                        <span className="lg:pl-1 font-bold">{col.name}</span>
                      </td>
                    </>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(province || []).map((pt: any, index: number) => (
                  <tr
                    className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={pt.prov_id}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center">
                        <input
                          value={pt.prov_id}
                          onChange={(e) =>
                            handleProvinceChange(e, pt.prov_name)
                          }
                          // onChange={() => setRegionID(dt.region_code)}
                          name="province"
                          id="checkbox-table-search-1"
                          type="radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {pt.prov_name}
                    </td>

                    <td className="flex items-center px-6 py-4 space-x-3">
                      <a
                        href="#"
                        className="border-2 border-primary hover:bg-primary hover:text-white transition-colors ease-in duration-100 p-2 rounded text-primary"
                        onClick={() => editOpenP(pt.prov_id)}
                      >
                        <MdEdit className="text-xl" />
                      </a>
                      <a
                        href="#"
                        className="border-2 border-danger-secondary hover:bg-danger-secondary hover:text-white transition-colors ease-in duration-100 p-2 rounded text-danger-secondary"
                        onClick={() => deleteOpenP(pt.prov_id)}
                      >
                        <MdDelete className="text-xl" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {isOpenP ? (
          <AddProvinceMaster
            isOpen={isOpenP}
            country={countryID}
            closeModal={() => setIsOpenP(false)}
          />
        ) : null}
        {isEditP.status ? (
          <EditProvinceMaster
            isEdit={isEditP}
            country={countryID}
            closeModal={() =>
              setIsEditP((prev) => {
                return { ...prev, status: false };
              })
            }
          />
        ) : null}
      </div>

      <div className="relative overflow-y-auto max-h-[400px] shadow-md sm:rounded-lg mt-10">
        {city && city.length !== 0 && (
          <div className="p-4 bg-white mt-10">
            <div className="flex justify-end pb-4">
              <Button
                variant="variant"
                label="Add"
                size="small"
                type="secondary"
                className="ml-0"
                onClick={() => setIsOpenT(true)}
                icon={AiOutlinePlus}
              />
            </div>

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <td className="px-6 py-3"></td>
                  {(columnsCity || []).map((col) => (
                    <>
                      <td key={col.name} className="px-6 py-3">
                        <span className="lg:pl-1 font-bold">{col.name}</span>
                      </td>
                    </>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(city || []).map((tt: any, index: number) => (
                  <tr
                    className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={tt.city_id}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center">
                        <input
                          value={tt.city_id}
                          onChange={(e) => handleCityChange(e, tt.city_name)}
                          // onChange={() => setRegionID(dt.region_code)}
                          name="city"
                          id="checkbox-table-search-1"
                          type="radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {tt.city_name}
                    </td>

                    <td className="flex items-center px-6 py-4 space-x-3">
                      <a
                        href="#"
                        className="border-2 border-primary hover:bg-primary hover:text-white transition-colors ease-in duration-100 p-2 rounded text-primary"
                        onClick={() => editOpenT(tt.city_id)}
                      >
                        <MdEdit className="text-xl" />
                      </a>
                      <a
                        href="#"
                        className="border-2 border-danger-secondary hover:bg-danger-secondary hover:text-white transition-colors ease-in duration-100 p-2 rounded text-danger-secondary"
                        onClick={() => deleteOpenT(tt.city_id)}
                      >
                        <MdDelete className="text-xl" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {isOpenT ? (
          <AddCityMaster
            isOpen={isOpenT}
            province={provinceID}
            closeModal={() => setIsOpenT(false)}
          />
        ) : null}
        {isEditT.status ? (
          <EditCityMaster
            isEdit={isEditT}
            province={provinceID}
            closeModal={() =>
              setIsEditT((prev) => {
                return { ...prev, status: false };
              })
            }
          />
        ) : null}
      </div>

      <div className="relative overflow-y-auto max-h-[400px] shadow-md sm:rounded-lg mt-10">
        {address && address.length !== 0 && (
          <div className="p-4 bg-white">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <td className="px-6 py-3"></td>
                  {(columnsAddress || []).map((col) => (
                    <>
                      <td key={col.name} className="px-6 py-3">
                        <span className="lg:pl-1 font-bold">{col.name}</span>
                      </td>
                    </>
                  ))}
                  {/* <td className="py-2 flex pl-6 border-black bg-gray-50 text-left text-xs font-medium text-black uppercase tracking-wider ">
                      <Button
                        variant="variant"
                        label="Add"
                        size="small"
                        type="secondary"
                        className="ml-0"
                      />
                    </td> */}
                </tr>
              </thead>
              <tbody>
                {(address || []).map((at: any, index: number) => (
                  <tr
                    className="bg-white border-b borde-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={at.addr_id}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {at.addr_line1 + at.addr_line2}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {at.addr_postal_code + at.addr_spatial_code}
                    </td>

                    {/* <td className="flex items-center px-6 py-4 space-x-3">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                        <a
                          href="#"
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          Remove
                        </a>
                      </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

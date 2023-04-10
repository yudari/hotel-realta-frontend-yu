import Button from "@/components/Button/button";
import { doRequestGetAddressByCityById } from "@/redux/masterSchema/action/addressAction";
import { doRequestGetCityByProvinceById } from "@/redux/masterSchema/action/city";
import {
  doRequestGetCountry,
  doRequestGetCountryByRegionById,
} from "@/redux/masterSchema/action/countryAction";
import { doRequestGetProvinceByCountryById } from "@/redux/masterSchema/action/provinceAction";
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

export default function Locations() {
  const [regionID, setRegionID] = useState<any>(null);
  const [countryID, setCountryID] = useState<any>(null);
  const [provinceID, setProvinceID] = useState(null);
  const [cityID, setCityID] = useState(null);
  const [addressID, setAddressID] = useState(null);

  let {
    region,
    message,
    refresh: refreshregion,
  } = useSelector((state: any) => state.regionReducer);

  let { country } = useSelector((state: any) => state.countryReducer);

  let { province } = useSelector((state: any) => state.provinceReducer);

  let { city } = useSelector((state: any) => state.cityReducer);

  let { address } = useSelector((state: any) => state.addressReducer);
  // console.log(province);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenC, setIsOpenC] = useState(false);
  const [isEdit, setIsEdit] = useState({
    status: false,
    id: 0,
  });

  const columnsRegion = [{ name: "Region ID" }, { name: "Region Name" }];
  const columnsCountry = [{ name: "Country ID" }, { name: "Country Name" }];
  const columnsProvince = [{ name: "Province ID" }, { name: "Province Name" }];
  const columnsCity = [{ name: "City ID" }, { name: "City Name" }];
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

  const deleteOpen = (id: number) => {
    const confirmDelete = window.confirm(`Anda yakin ingin mengahpus data ini`);
    if (confirmDelete) {
      dispatch(doDeleteRegion(id));
    }
  };

  // const [data, setData] = useState({
  //   regionID: null,
  //   countryID: null,
  // });

  // console.log("data", data);

  useEffect(() => {
    dispatch(doRequestGetRegion());
  }, [dispatch, refreshregion]);

  const handleRegionChange = (e: any, name: string) => {
    const regionID = e.target.value;
    setProvinceID(null);
    setCityID(null);
    setAddressID(null);
    setRegionID({ regionID: regionID, name: name });
    dispatch(doRequestGetCountryByRegionById(regionID));
  };

  const handleCountryChange = (e: any, name: string) => {
    const countryID = e.target.value;

    console.log("Country name", name);

    setCountryID({ countryID: countryID, name: name });
    dispatch(doRequestGetProvinceByCountryById(countryID));
  };
  const handleProvinceChange = (e: any) => {
    const provinceID = e.target.value;
    setProvinceID(provinceID);
    dispatch(doRequestGetCityByProvinceById(provinceID));
  };
  const handleCityChange = (e: any) => {
    const cityID = e.target.value;
    setCityID(cityID);
    dispatch(doRequestGetAddressByCityById(cityID));
  };
  // const handleAddressChange = (e: any) => {
  //   const addressID = e.target.value;
  //   setAddressID(addressID);
  //   dispatch(doRequestGetAddressByCityById(addressID));
  // };
  // useEffect(() => {
  //   if (regionID !== null) {
  //     dispatch(doRequestGetCountryByRegionById(regionID));
  //   }
  // }, [dispatch, regionID]);

  // useEffect(() => {
  //   if (countryID !== null) {
  //     dispatch(doRequestGetProvinceByCountryById(countryID));
  //   }
  // }, [dispatch, countryID]);

  // console.log("prov", province);

  return (
    <>
      <>
        <div className="bg-white text-black py-2 px-6 flex  font-bold border-2 items-center justify-between">
          REGION
        </div>
        <>
          <div className="relative overflow-y-auto max-h-[400px] shadow-md sm:rounded-lg">
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
                  <td className="py-2 flex pl-6 border-black bg-gray-50 text-left text-xs font-medium text-black uppercase tracking-wider ">
                    <Button
                      variant="variant"
                      label="Add"
                      size="small"
                      type="secondary"
                      className="ml-0"
                      onClick={() => setIsOpen(true)}
                    />
                  </td>
                </tr>
              </thead>
              <tbody>
                {(region?.data || []).map((dt: any) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
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
                          onChange={(e) =>
                            handleRegionChange(e, dt.region_name)
                          }
                          name="region"
                          id="checkbox-table-search-1"
                          // checked={regionID === region.id}
                          type="radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {dt.region_code}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                      {dt.region_name}
                    </td>
                    <td className="flex items-center px-6 py-4 space-x-3">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => editOpen(dt.region_code)}
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        onClick={() => deleteOpen(dt.region_code)}
                      >
                        Remove
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

          <div className="relative overflow-y-auto max-h-[400px] shadow-md sm:rounded-lg mt-10">
            {country && country.length !== 0 && (
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <td className="px-6 py-3"></td>
                    {(columnsCountry || []).map((col) => (
                      <>
                        <td key={col.name} className="px-6 py-3">
                          <span className="lg:pl-1 font-bold">{col.name}</span>
                        </td>
                      </>
                    ))}
                    <td className="py-2 flex pl-6 border-black bg-gray-50 text-left text-xs font-medium text-black uppercase tracking-wider ">
                      <Button
                        variant="variant"
                        label="Add"
                        size="small"
                        type="secondary"
                        className="ml-0"
                        onClick={() => setIsOpenC(true)}
                      />
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {(country || []).map((ct: any) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
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
                        {ct.country_id}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {ct.country_name}
                      </td>

                      <td className="flex items-center px-6 py-4 space-x-3">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {isOpenC ? (
              <AddCountryMaster
                isOpen={isOpenC}
                name={regionID.name}
                closeModal={() => setIsOpenC(false)}
              />
            ) : null}
          </div>

          <div className="relative overflow-y-auto max-h-[400px] shadow-md sm:rounded-lg mt-10">
            {province && province.length !== 0 && (
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <td className="px-6 py-3"></td>
                    {(columnsProvince || []).map((col) => (
                      <>
                        <td key={col.name} className="px-6 py-3">
                          <span className="lg:pl-1 font-bold">{col.name}</span>
                        </td>
                      </>
                    ))}
                    <td className="py-2 flex pl-6 border-black bg-gray-50 text-left text-xs font-medium text-black uppercase tracking-wider ">
                      <Button
                        variant="variant"
                        label="Add"
                        size="small"
                        type="secondary"
                        className="ml-0"
                      />
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {(province || []).map((pt: any) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      key={pt.prov_id}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          <input
                            value={pt.prov_id}
                            onChange={handleProvinceChange}
                            // onChange={() => setRegionID(dt.region_code)}
                            name="province"
                            id="checkbox-table-search-1"
                            type="radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {pt.prov_id}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {pt.prov_name}
                      </td>

                      <td className="flex items-center px-6 py-4 space-x-3">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="relative overflow-y-auto max-h-[400px] shadow-md sm:rounded-lg mt-10">
            {city && city.length !== 0 && (
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <td className="px-6 py-3"></td>
                    {(columnsCity || []).map((col) => (
                      <>
                        <td key={col.name} className="px-6 py-3">
                          <span className="lg:pl-1 font-bold">{col.name}</span>
                        </td>
                      </>
                    ))}
                    <td className="py-2 flex pl-6 border-black bg-gray-50 text-left text-xs font-medium text-black uppercase tracking-wider ">
                      <Button
                        variant="variant"
                        label="Add"
                        size="small"
                        type="secondary"
                        className="ml-0"
                      />
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {(city || []).map((tt: any) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      key={tt.city_id}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          <input
                            value={tt.city_id}
                            onChange={handleCityChange}
                            // onChange={() => setRegionID(dt.region_code)}
                            name="city"
                            id="checkbox-table-search-1"
                            type="radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {tt.city_id}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {tt.city_name}
                      </td>

                      <td className="flex items-center px-6 py-4 space-x-3">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="relative overflow-y-auto max-h-[400px] shadow-md sm:rounded-lg mt-10">
            {address && address.length !== 0 && (
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <td className="px-6 py-3"></td>
                    {(columnsAddress || []).map((col) => (
                      <>
                        <td key={col.name} className="px-6 py-3">
                          <span className="lg:pl-1 font-bold">{col.name}</span>
                        </td>
                      </>
                    ))}
                    <td className="py-2 flex pl-6 border-black bg-gray-50 text-left text-xs font-medium text-black uppercase tracking-wider ">
                      <Button
                        variant="variant"
                        label="Add"
                        size="small"
                        type="secondary"
                        className="ml-0"
                      />
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {(address || []).map((at: any) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      key={at.addr_id}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {at.addr_id}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {at.addr_line1 + at.addr_line2}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {at.addr_postal_code + at.addr_spatial_code}
                      </td>

                      <td className="flex items-center px-6 py-4 space-x-3">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      </>
    </>
  );
}

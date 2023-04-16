import axios from "../../config/endpoint";

//===============ApiMethodREGION=============//
const getAllRegion = () => {
  return axios.get("/regions");
};
const getAllIncludeRegion = (id: number) => {
  return axios.get(`/regions/regions/${id}`);
};
const createRegion = (data: any) => {
  return axios.post("/regions", data);
};
const updateRegion = (id: number, data: any) => {
  return axios.put(`/regions/${id}`, data);
};
const removeRegion = (id: number) => {
  return axios.delete(`/regions/${id}`);
};

//===============ApiMethodCountry==========//
const getAllCountry = () => {
  return axios.get("/country");
};
const getAllIncludeCountry = (id: number) => {
  return axios.get(`/country/country/${id}`);
};
const createCountry = (data: any) => {
  console.log("Create country", data);
  return axios.post("/country", data);
};
const updateCountry = (id: number, data: any) => {
  return axios.put(`/country/${id}`, data);
};
const removeCountry = (id: number) => {
  return axios.delete(`/country/${id}`);
};

//===============ApiMethodProvince==========//
const getAllProvince = () => {
  return axios.get("/provinces");
};
const getAllIncludeProvince = (id: number) => {
  return axios.get(`/provinces/province/${id}`);
};
const createProvince = (data: any) => {
  return axios.post("/provinces", data);
};
const updateProvince = (id: number, data: any) => {
  return axios.put(`/provinces/${id}`, data);
};
const deleteProvince = (id: number) => {
  return axios.delete(`/provinces/${id}`);
};

//================ApiMethodCity=============//
const getAllCity = () => {
  return axios.get("/city");
};
const getAllCityBySearch = () => {
  return axios.get("/city/search");
};
const getAllIncludeCity = (id: number) => {
  return axios.get(`/city/city/${id}`);
};
const createCity = (data: any) => {
  return axios.post("/city", data);
};
const updateCity = (id: number, data: any) => {
  return axios.put(`/city/${id}`, data);
};
const deleteCity = (id: number) => {
  return axios.delete(`/city/${id}`);
};

//=============//ApiMethodAddress===========//
const getAllAddress = () => {
  return axios.get("/address");
};
const getAllIncludeAddress = (id: number) => {
  return axios.get(`/address/address/${id}`);
};
const createAddress = (data: any) => {
  return axios.post("/address", data);
};
const updateAddress = (id: number, data: any) => {
  return axios.put(`/address/${id}`, data);
};
const deleteAddress = (id: number) => {
  return axios.delete(`/address/${id}`);
};

//=============ApiMethodServiceTask==========//
const getAllServicetask = () => {
  return axios.get("/service-task");
};
const createServicetask = (data: any) => {
  return axios.post("/service-task", data);
};
const updateServicetask = (id: number, data: any) => {
  return axios.put(`/service-task/${id}`, data);
};
const deleteServicetask = (id: number) => {
  return axios.delete(`/service-task/${id}`);
};

//=============Policy==============//
const getAllPolicy = () => {
  return axios.get("policy");
};
const createPolicy = (data: any) => {
  return axios.post("/policy", data);
};
const updatePolicy = (id: number, data: any) => {
  return axios.put(`/policy/${id}`, data);
};
const deletePolicy = (id: number) => {
  return axios.delete(`/policy/${id}`);
};

//=============CategoryGroup==========//
const getAllCategorygroup = () => {
  return axios.get("/category-group/");
};
const createCategorygroup = (data: any) => {
  return axios.post("/category-group/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const updateCategorygroup = (id: number, data: any) => {
  return axios.put(`/category-group/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const deleteCategorygroup = (id: number) => {
  return axios.delete(`/category-group/${id}`);
};

//=============PriceItem============//
const getAllPriceitems = (
  searchQuery: string,
  searchType: string,
  page: number,
  limit: number
) => {
  // return axios.get(
  //   `/price-items/search/?searchQuery=${searchQuery}&searchType=${searchType}&page=${1}&limit=${5}`
  // );
  return axios.get(
    `/price-items/search/?searchQuery=${searchQuery}&searchType=${searchType}&page=${page}&limit=${limit}`
  );
};
const createPriceItems = (data: any) => {
  return axios.post("/price-items", data);
};
const updatePriceItems = (id: number, data: any) => {
  return axios.put(`/price-items/${id}`, data);
};
const deletePriceItems = (id: number) => {
  return axios.delete(`price-items/${id}`);
};

const apiMethodMaster = {
  //===Region===//
  getAllRegion,
  getAllIncludeRegion,
  createRegion,
  updateRegion,
  removeRegion,

  //===Country===//
  getAllCountry,
  getAllIncludeCountry,
  createCountry,
  updateCountry,
  removeCountry,

  //===Province===//
  getAllProvince,
  getAllIncludeProvince,
  createProvince,
  updateProvince,
  deleteProvince,

  //===ServiceTask===//
  getAllServicetask,
  createServicetask,
  updateServicetask,
  deleteServicetask,

  //===City===//
  getAllCity,
  getAllCityBySearch,
  getAllIncludeCity,
  createCity,
  updateCity,
  deleteCity,

  //===Address===//
  getAllAddress,
  getAllIncludeAddress,
  createAddress,
  updateAddress,
  deleteAddress,

  //===Policy===//
  getAllPolicy,
  createPolicy,
  updatePolicy,
  deletePolicy,

  //===categorygroup===//
  getAllCategorygroup,
  createCategorygroup,
  updateCategorygroup,
  deleteCategorygroup,

  //===priceitems===///
  getAllPriceitems,
  createPriceItems,
  updatePriceItems,
  deletePriceItems,
};

export default apiMethodMaster;

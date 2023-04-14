import axios from "../../config/endpoint";

// Resto_Menus

const getAll = (searchTerm: any, page: number, limit: number, sort: any) => {
  return axios.get(
    `/resto-menus?page=${page}&limit=${limit}&searchTerm=${searchTerm}&sort=${sort}`
  );
};

const create = (data: any) => {
  return axios.post(`/resto-menus`, data);
};

const update = (id: number, data: any) => {
  return axios.put(`/resto-menus/${id}`, data);
};

const remove = (id: number) => {
  return axios.delete(`/resto-menus/${id}`);
};

const get = (id: number) => {
  return axios.get(`/resto-menus/${id}`);
};

const search = (searchTerm: any) => {
  return axios.get(`/resto-menus?searchTerm=${searchTerm}`);
};

const sort = (sort: any) => {
  return axios.get(`/resto-menus?sort=${sort}`);
};

// Resto_menu_photos

const getAllPhotos = () => {
  return axios.get("/resto-menu-photos");
};

const uploadPhotos = (data: any) => {
  return axios.post("/resto-menu-photos", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updatePhotos = (id: number, data: any) => {
  return axios.put(`/resto-menu-photos/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const removePhotos = (id: number) => {
  return axios.delete(`/resto-menu-photos/${id}`);
};

const getIdPhotos = (id: number) => {
  return axios.get(`/resto-menu-photos/${id}`);
};

// ORDER_MENUS

const getAllOrme = () => {
  return axios.get("/order-menus");
};

const createOrme = (data: any) => {
  return axios.post(`/order-menus`, data);
};

const updateOrme = (id: number, data: any) => {
  return axios.put(`/order-menus/${id}`, data);
};

const deleteOrme = (id: number) => {
  return axios.delete(`/order-menus/${id}`);
};

const getIdOrme = (id: number) => {
  return axios.get(`/order-menus/${id}`);
};

// ORDER_MENU_DETAILS
const getAllOrdet = () => {
  return axios.get("/order-menu-details");
};

const createOrdet = (data: any) => {
  return axios.post(`/order-menu-details`, data);
};

const updateOrdet = (id: number, data: any) => {
  return axios.put(`/order-menu-details/${id}`, data);
};

const deleteOrdet = (id: number) => {
  return axios.delete(`/order-menu-details/${id}`);
};

const getIdOrdet = (id: number) => {
  return axios.get(`/order-menu-details/${id}`);
};

const apiMethodReme = {
  // RESTO_MENUS
  getAll,
  create,
  update,
  remove,
  get,
  search,
  sort,
  // RESTO_MENU_PHOTOS
  getAllPhotos,
  uploadPhotos,
  updatePhotos,
  removePhotos,
  getIdPhotos,

  // ORDER_MENUS
  getAllOrme,
  createOrme,
  updateOrme,
  deleteOrme,
  getIdOrme,

  // ORDER_MENU_DETAIL
  getAllOrdet,
  createOrdet,
  updateOrdet,
  deleteOrdet,
  getIdOrdet,
};
export default apiMethodReme;

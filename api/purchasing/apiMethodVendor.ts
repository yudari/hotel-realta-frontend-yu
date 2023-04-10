import axios from "../../config/endpoint";

const getAll = (search: any, page: number, limit: number) => {
  return axios.get(`purchasing/vendor/?search=${search}&pageNumber=${page}&pageSize=${limit}`);
};

// PRODUCT VENDOR
const getVendorProd = (id: number) => {
  return axios.get(`purchasing/stock/addproduct/${id}`);
};

const create = (data: any) => {
  return axios.post(`/purchasing/vendor`, data);
};

const update = (id: number, data: any) => {
  return axios.put(`purchasing/vendor/${id}`, data);
};

const remove = (id: number) => {
  return axios.delete(`purchasing/vendor/${id}`);
};

const search = (search: any) => {
  return axios.get(`/purchasing/vendor/?name=${search}`);
};

// Sortir Status
// const sort = (sort: any) => {
//   return axios.get(`purchasing/vendor/?priority=${sort}`);
// };

const apiMethodVendor = {
  getAll,
  getVendorProd,
  create,
  update,
  remove,
  search,
};

export default apiMethodVendor;

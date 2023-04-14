import axios from "../../config/endpoint";

const create = (data: any) => {
  return axios.post(`/purchasing/vendor/product`, data);
};

const update = (id: number, data: any) => {
  return axios.put(`purchasing/vendor/product/${id}`, data);
};

const remove = (id: number) => {
  return axios.delete(`purchasing/vendor/product/${id}`);
};

const apiMethodVendorProd = {
  create,
  update,
  remove,
};

export default apiMethodVendorProd;

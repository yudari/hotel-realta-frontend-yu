import axios from "../../config/endpoint";

const getAll = (search: any, page: number, limit: number) => {
  return axios.get(`stocks/?stock_name=${search}&pageNumber=${page}&pageSize=${limit}`);
};

const create = (data: any) => {
  return axios.post(`stocks`, data);
};

const update = (id: number, data: any) => {
  return axios.put(`stocks/${id}`, data);
};

const remove = (id: number) => {
  return axios.delete(`stocks/${id}`);
};

const getStocksList = async () => {
  return axios.get("stocks/prodvendor");
};

const apiMethodStock = {
  getAll,
  create,
  update,
  remove,
  getStocksList,
};

export default apiMethodStock;

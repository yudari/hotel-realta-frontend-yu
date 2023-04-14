import axios from "../../config/endpoint";

const getAll = (searchPo: any, page: number, limit: number) => {
  return axios.get(`purchasing/vendor/listorder/?search=${searchPo}&pageNumber=${page}&pageSize=${limit}`);
};

const update = (id: number, data: any) => {
  return axios.put(`purchasing/listorder/${id}`, data);
};

const remove = (id: number) => {
  return axios.delete(`purchasing/listorder/${id}`);
};

const getOrderDetail = () => {
  return axios.get(`purchasing/listorderdetail`)
}

const apiMethodOrder = {
  getAll,
  update,
  remove,
  getOrderDetail,
};

export default apiMethodOrder;

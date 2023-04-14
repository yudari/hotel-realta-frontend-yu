import axios from "../../config/endpoint";

const getAll = () => {
  return axios.get("/hr/work-order-detail/");
};

const create = (data: any) => {
  return axios.post("/hr/work-order-detail/", data);
};

const update = (id: number, data: any) => {
  return axios.put(`/hr/work-order-detail/${id}`, data);
};

const remove = (id: number) => {
  return axios.delete(`/hr/work-order-detail/${id}`);
};
const apiMethodWorkOrderDetail = {
  getAll,
  create,
  update,
  remove,
};

export default apiMethodWorkOrderDetail;

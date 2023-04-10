import axios from "../../config/endpoint";

const getAll = (data: any) => {
  // console.log(!data.status);
  let url = `/hr/work-orders/?page=${data.page}&limit=${data.limit}`;

  if (data.status) {
    url += `&status=${data.status}`;
  }

  if (data.from && data.to) {
    url += `&from=${data.from}&to=${data.to}`;
  }

  return axios.get(url);
};

const create = (data: any) => {
  return axios.post("/hr/work-orders", data);
};

const update = (id: number, data: any) => {
  return axios.put(`/hr/work-orders/${id}`, data);
};

const remove = (id: number) => {
  return axios.delete(`/hr/work-orders/${id}`);
};

const ApiMethodWorkOrders = {
  getAll,
  create,
  update,
  remove,
};

export default ApiMethodWorkOrders;

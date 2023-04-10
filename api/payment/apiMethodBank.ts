import axios from '../../config/endpoint';

const findAll = (searchTerm: any,) => {
    return axios.get(`/bank?searchTerm=${searchTerm}`)
}
// `/bank?searchTerm=${searchTerm}`

const create = (data:any) =>{
    return axios.post(`/bank`, data)
}

const update = (id: number, data: any) => {
    return axios.put(`/bank/${id}`, data)
  }

  const remove = (id: number) => {
    return axios.delete(`/bank/${id}`)
  }

const apiMethodBank = {
    findAll,
    create,
    update,
    remove
}

export default apiMethodBank;
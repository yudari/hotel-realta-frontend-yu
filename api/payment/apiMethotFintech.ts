import axios from '../../config/endpoint';

const findAll = (searchTerm: any,) => {
    return axios.get(`/fintech?searchTerm=${searchTerm}`)
}
// `/fintech?searchTerm=${searchTerm}`

const create = (data:any) =>{
    return axios.post(`/fintech`, data)
}

const update = (id: number, data: any) => {
    return axios.put(`/fintech/${id}`, data)
  }

  const remove = (id: number) => {
    return axios.delete(`/fintech/${id}`)
  }

const apiMethodFintech = {
    findAll,
    create,
    update,
    remove
}

export default apiMethodFintech
import axios from '../../config/endpoint'

const finAll = (
  searchTerm: any,
  page: number,
  limit: number,
  type: any,
  id: any
) => {
  return axios.get(
    `/transaction?search=${searchTerm}&page=${page}&limit=${limit}&type=${type}&id=${id}`
  )
}

const topup = (data: any) => {
  return axios.post('/transaction/topup', data)
}

const apiMethodPayTrans = {
  finAll,
  topup,
}

export default apiMethodPayTrans

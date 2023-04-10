import actionTypes from './actionType'

export const doRequestGetOrdet = () => {
  return {
    type: actionTypes.REQ_GET_ORDET,
  }
}

export const doGetOrdetResponse = (payload: any) => {
  return {
    type: actionTypes.GET_ORDET_RESPONSE,
    payload,
  }
}

export const doAddOrdet = (payload: any) => {
  return {
    type: actionTypes.ADD_ORDET,
    payload,
  }
}

export const doAddOrdetResponse = (payload: any) => {
  return {
    type: actionTypes.ADD_ORDET_RESPONSE,
    payload,
  }
}

export const doUpdateOrdet = (...payload: any[]) => {
  return {
    type: actionTypes.UPDATE_ORDET,
    payload,
  }
}

export const doUpdateOrdetResponse = (...payload: any[]) => {
  return {
    type: actionTypes.UPDATE_ORDET_RESPONSE,
    payload,
  }
}

export const doDeleteOrdet = (payload: any) => {
  return {
    type: actionTypes.DEL_ORDET,
    payload,
  }
}

export const doDeleteOrdetResponse = (payload: any) => {
  return {
    type: actionTypes.DEL_ORDET_RESPONSE,
    payload,
  }
}

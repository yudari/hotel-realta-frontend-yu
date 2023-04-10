import actionTypes from './actionType'

export const doRequestGetRepho = () => {
  return {
    type: actionTypes.REQ_GET_REPHO,
  }
}

export const doGetRephoResponse = (payload: any) => {
  return {
    type: actionTypes.GET_REPHO_RESPONSE,
    payload,
  }
}

export const doAddRepho = (payload: any) => {
  return {
    type: actionTypes.ADD_REPHO,
    payload,
  }
}

export const doAddRephoResponse = (payload: any) => {
  return {
    type: actionTypes.ADD_REPHO_RESPONSE,
    payload,
  }
}

export const doUpdateRepho = (...payload: any[]) => {
  return {
    type: actionTypes.UPDATE_REPHO,
    payload,
  }
}

export const doUpdateRephoResponse = (...payload: any[]) => {
  return {
    type: actionTypes.UPDATE_REPHO_RESPONSE,
    payload,
  }
}

export const doDeleteRepho = (payload: any) => {
  return {
    type: actionTypes.DEL_REPHO,
    payload,
  }
}

export const doDeleteRephoResponse = (payload: any) => {
  return {
    type: actionTypes.DEL_REPHO_RESPONSE,
    payload,
  }
}

import actionTypes from './actionType'

export const doRequestGetOrme = () => {
  return {
    type: actionTypes.REQ_GET_ORME,
  }
}

export const doGetOrmeResponse = (payload: any) => {
  return {
    type: actionTypes.GET_ORME_RESPONSE,
    payload,
  }
}

export const doAddOrme = (payload: any) => {
  return {
    type: actionTypes.ADD_ORME,
    payload,
  }
}

export const doAddOrmeResponse = (payload: any) => {
  return {
    type: actionTypes.ADD_ORME_RESPONSE,
    payload,
  }
}

export const doUpdateOrme = (...payload: any[]) => {
  return {
    type: actionTypes.UPDATE_ORME,
    payload,
  }
}

export const doUpdateOrmeResponse = (...payload: any[]) => {
  return {
    type: actionTypes.UPDATE_ORME_RESPONSE,
    payload,
  }
}

export const doDeleteOrme = (payload: any) => {
  return {
    type: actionTypes.DEL_ORME,
    payload,
  }
}

export const doDeleteOrmeResponse = (payload: any) => {
  return {
    type: actionTypes.DEL_ORME_RESPONSE,
    payload,
  }
}

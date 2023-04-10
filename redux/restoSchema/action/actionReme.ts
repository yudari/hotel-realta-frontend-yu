import actionTypes from './actionType'

export const doRequestGetReme = (
  searchTerm: any,
  page: any,
  limit: any,
  sort: any
) => {
  const payload = {
    searchTerm,
    page,
    limit,
    sort,
  }
  return {
    type: actionTypes.REQ_GET_REME,
    payload,
  }
}

export const doGetRemeResponse = (payload: any) => {
  return {
    type: actionTypes.GET_REME_RESPONSE,
    payload,
  }
}
export const doAdd = (payload: any) => {
  return {
    type: actionTypes.ADD_REME,
    payload,
  }
}
export const doAddResponse = (payload: any) => {
  return {
    type: actionTypes.ADD_REME_RESPONSE,
    payload,
  }
}
export const doUpdate = (...payload: any[]) => {
  return {
    type: actionTypes.UPDATE_REME,
    payload,
  }
}
export const doUpdateResponse = (...payload: any[]) => {
  return {
    type: actionTypes.UPDATE_REME_RESPONSE,
    payload,
  }
}
export const doDelete = (payload: any) => {
  return {
    type: actionTypes.DEL_REME,
    payload,
  }
}
export const doDeleteResponse = (payload: any) => {
  return {
    type: actionTypes.DEL_REME_RESPONSE,
    payload,
  }
}

export const doSearch = (payload: any) => {
  return {
    type: actionTypes.SEARCH_REME,
    payload,
  }
}

export const doSearchResponse = (payload: any) => {
  return {
    type: actionTypes.SEARCH_REME_RESPONSE,
    payload,
  }
}

export const doSort = (payload: any) => {
  return {
    type: actionTypes.SORT_REME,
    payload,
  }
}

export const doSortResponse = (payload: any) => {
  return {
    type: actionTypes.SORT_REME_RESPONSE,
    payload,
  }
}

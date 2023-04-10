import { takeEvery, all } from 'redux-saga/effects'
import actionTypes from '../action/actionType'
import {
  handleAddReme,
  handleDelReme,
  handleGetAllReme,
  handleSearchReme,
  handleUpdateReme,
} from './restoMenuSaga'
import {
  handleAddRepho,
  handleDelRepho,
  handleGetAllRepho,
  handleUpdateRepho,
} from './restoMenuPhotoSaga'
import {
  handleAddOrme,
  handleDelOrme,
  handleGetAllOrme,
  handleUpdateOrme,
} from './orderMenuSaga'
import {
  handleAddOrdet,
  handleDelOrdet,
  handleGetAllOrdet,
  handleUpdateOrdet,
} from './orderMenuDetailSaga'

function* watchAll() {
  yield all([
    // Resto Menu
    takeEvery(actionTypes.REQ_GET_REME, handleGetAllReme),
    takeEvery(actionTypes.ADD_REME, handleAddReme),
    takeEvery(actionTypes.UPDATE_REME, handleUpdateReme),
    takeEvery(actionTypes.DEL_REME, handleDelReme),
    takeEvery(actionTypes.SEARCH_REME, handleSearchReme),

    // Resto Menu Photos
    takeEvery(actionTypes.REQ_GET_REPHO, handleGetAllRepho),
    takeEvery(actionTypes.ADD_REPHO, handleAddRepho),
    takeEvery(actionTypes.UPDATE_REPHO, handleUpdateRepho),
    takeEvery(actionTypes.DEL_REPHO, handleDelRepho),

    // Order Menu
    takeEvery(actionTypes.REQ_GET_ORME, handleGetAllOrme),
    takeEvery(actionTypes.ADD_ORME, handleAddOrme),
    takeEvery(actionTypes.UPDATE_ORME, handleUpdateOrme),
    takeEvery(actionTypes.DEL_ORME, handleDelOrme),

    // Order Menu Detail
    takeEvery(actionTypes.REQ_GET_ORDET, handleGetAllOrdet),
    takeEvery(actionTypes.ADD_ORDET, handleAddOrdet),
    takeEvery(actionTypes.UPDATE_ORDET, handleUpdateOrdet),
    takeEvery(actionTypes.DEL_ORDET, handleDelOrdet),
  ])
}

export default watchAll

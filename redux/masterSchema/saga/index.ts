import { takeEvery, all } from "redux-saga/effects";
import ActionTypes from "../action/actionType";
import {
  handleAddRegion,
  handleDelRegion,
  handleGetAllRegion,
  handleUpdateRegion,
} from "./regionSaga";

import {
  handleGetAllServiceTask,
  handleAddServiceTask,
  handleUpdateServiceTask,
  handleDeleteServiceTask,
} from "./servicetaskSaga";

import {
  handleAddCountry,
  handleDeleteCountry,
  handleGetAllCountry,
  handleGetCountryByRegionById,
  handleUpdateCountry,
} from "./countrySaga";

import {
  handleAddProvince,
  handleDeleteProvince,
  handleGetAllProvince,
  handleGetProvinceByCountryById,
  handleUpdateProvince,
} from "./provinceSaga";
import {
  handleAddPolicy,
  handleDeletePolicy,
  handleGetAllPolicy,
  handleUpdatePolicy,
} from "./policySaga";
import {
  handleAddCategoryGroup,
  handleDeleteCategoryGroup,
  handleGetAllCategoryGroup,
  handleUpdateCategoryGroup,
} from "./categorygroupSaga";
import {
  handleAddPriceItems,
  handleDeletePriceItems,
  handleGetAllPriceItems,
  handleUpdatePriceItems,
} from "./priceitemsSaga";
import { handleAddCity, handleDeleteCity, handleGetAllCity, handleGetCityByProvinceById, handleUpdateCity } from "./citySaga";
import { handleGetAddressByCityById, handleGetAllAddress } from "./addressSaga";

function* watchAll() {
  yield all([
    //=============REGION===============//
    takeEvery(ActionTypes.REQ_GET_REGION, handleGetAllRegion),
    takeEvery(ActionTypes.ADD_REGION, handleAddRegion),
    takeEvery(ActionTypes.UPDATE_REGION, handleUpdateRegion),
    takeEvery(ActionTypes.DEL_REGION, handleDelRegion),
    //==============COUNTRY============//
    takeEvery(ActionTypes.REQ_GET_COUNTRY, handleGetAllCountry),
    takeEvery(
      ActionTypes.REQ_GET_COUNTRYBYREGION,
      handleGetCountryByRegionById
    ),
    takeEvery(ActionTypes.ADD_COUNTRY, handleAddCountry),
    takeEvery(ActionTypes.UPDATE_COUNTRY, handleUpdateCountry),
    takeEvery(ActionTypes.DEL_COUNTRY, handleDeleteCountry),

    //=============PROVINCE==========//
    takeEvery(ActionTypes.REQ_GET_PROVINCE, handleGetAllProvince),
    takeEvery(
      ActionTypes.REQ_GET_PROVINCEBYCOUNTRY,
      handleGetProvinceByCountryById
    ),
    takeEvery(ActionTypes.ADD_PROVINCE, handleAddProvince),
    takeEvery(ActionTypes.UPDATE_PROVINCE, handleUpdateProvince),
    takeEvery(ActionTypes.DEL_PROVINCE, handleDeleteProvince),
    //============City============//
    takeEvery(ActionTypes.REQ_GET_CITY, handleGetAllCity),
    takeEvery(ActionTypes.REQ_GET_CITYBYPROVINCE, handleGetCityByProvinceById),
    takeEvery(ActionTypes.ADD_CITY, handleAddCity),
    takeEvery(ActionTypes.UPDATE_CITY, handleUpdateCity),
    takeEvery(ActionTypes.DEL_CITY, handleDeleteCity),
    //============Address============//
    takeEvery(ActionTypes.REQ_GET_ADDRESS, handleGetAllAddress),
    takeEvery(ActionTypes.REQ_GET_ADDRESSBYCITY, handleGetAddressByCityById),

    //================ServiceTask=========//
    takeEvery(ActionTypes.REQ_GET_SERVICETASK, handleGetAllServiceTask),
    takeEvery(ActionTypes.ADD_SERVICETASK, handleAddServiceTask),
    takeEvery(ActionTypes.UPDATE_SERVICETASK, handleUpdateServiceTask),
    takeEvery(ActionTypes.DEL_SERVICETASK, handleDeleteServiceTask),

    //===============Policy===============//
    takeEvery(ActionTypes.REQ_GET_POLICY, handleGetAllPolicy),
    takeEvery(ActionTypes.ADD_POLICY, handleAddPolicy),
    takeEvery(ActionTypes.UPDATE_POLICY, handleUpdatePolicy),
    takeEvery(ActionTypes.DEL_POLICY, handleDeletePolicy),

    //==============CategoryGroup==========//
    takeEvery(ActionTypes.REQ_GET_CATEGORYGROUP, handleGetAllCategoryGroup),
    takeEvery(ActionTypes.ADD_CATEGORYGROUP, handleAddCategoryGroup),
    takeEvery(ActionTypes.UPDATE_CATEGORYGROUP, handleUpdateCategoryGroup),
    takeEvery(ActionTypes.DEL_CATEGORYGROUP, handleDeleteCategoryGroup),

    //===============PriceItems==========//
    takeEvery(ActionTypes.REQ_GET_PRICEITEMS, handleGetAllPriceItems),
    takeEvery(ActionTypes.ADD_PRICEITEMS, handleAddPriceItems),
    takeEvery(ActionTypes.UPDATE_PRICEITEMS, handleUpdatePriceItems),
    takeEvery(ActionTypes.DEL_PRICEITEMS, handleDeletePriceItems),
  ]);
}
export default watchAll;

import { all, takeEvery } from "redux-saga/effects";
import ActionTypes from "../action/actionType";
import { handleAddProdVendor, handleDeleteProdVendor, handleUpdateProdVendor } from "../purchasingSaga/prodVendorSaga";
import { handleAddStock, handleDeleteStock, handleGetAllStock, handleStocVendor, handleUpdateStock } from "../purchasingSaga/stockSaga";
import { handleAddVendor, handleDeleteVendor, handleGetAllVendor, handleGetProdVendor, handleSearchVendor, handleUpdateVendor } from "../purchasingSaga/vendorSaga";
import { handleDeleteOrderList, handleGetAllOrderDetail, handleGetAllOrderList, handleUpdateOrderList } from "../purchasingSaga/orderSaga";

function* watchAll() {
  yield all([
    // VENDOR
    takeEvery(ActionTypes.REQUEST_GET_VENDOR, handleGetAllVendor),
    takeEvery(ActionTypes.REQUEST_UPDATE_VENDOR, handleUpdateVendor),
    takeEvery(ActionTypes.REQUEST_DELETE_VENDOR, handleDeleteVendor),
    takeEvery(ActionTypes.REQUEST_ADD_VENDOR, handleAddVendor),
    takeEvery(ActionTypes.SEARCH_VENDOR_REQUEST, handleSearchVendor),

    // PRODUCT VENDOR
    takeEvery(ActionTypes.REQUEST_GET_VENDOR_PROD, handleGetProdVendor),
    takeEvery(ActionTypes.REQUEST_ADD_VENDOR_PROD, handleAddProdVendor),
    takeEvery(ActionTypes.REQUEST_UPDATE_VENDOR_PROD, handleUpdateProdVendor),
    takeEvery(ActionTypes.REQUEST_DELETE_VENDOR_PROD, handleDeleteProdVendor),

    // STOCK
    takeEvery(ActionTypes.REQUEST_GET_STOCK, handleGetAllStock),
    takeEvery(ActionTypes.REQUEST_ADD_STOCK, handleAddStock),
    takeEvery(ActionTypes.REQUEST_UPDATE_STOCK, handleUpdateStock),
    takeEvery(ActionTypes.REQUEST_DELETE_STOCK, handleDeleteStock),
    takeEvery(ActionTypes.REQUEST_GET_LIST_STOCK, handleStocVendor),
    // takeEvery(ActionTypes.REQUEST_GET_STOD, handleGetAllStod),

    // ORDER LIST
    takeEvery(ActionTypes.REQUEST_GET_LIST_ORDER, handleGetAllOrderList),
    takeEvery(ActionTypes.REQUEST_UPDATE_LIST_ORDER, handleUpdateOrderList),
    takeEvery(ActionTypes.REQUEST_DEL_LIST_ORDER, handleDeleteOrderList),

    // ORDER DETAIL
    takeEvery(ActionTypes.REQUEST_GET_ORDER_DETAIL, handleGetAllOrderDetail),
  ]);
}

export default watchAll;
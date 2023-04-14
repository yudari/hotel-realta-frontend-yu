import { all, takeEvery } from 'redux-saga/effects'
import ActionTypeHotel from '../action/actionTypeHotel'
import {
  handleAddHotels,
  handleGetAllHotels,
  handleHotelsIncludeSupport,
  handleSwitchHotels,
  handleUpdateHotels,
} from './hotelsSaga'
// import { handleGetAllFacilitiesSupport } from './facilitiesSupportSaga'
// import { handleGetAllHotelReviews } from './hotelReviewsSaga'
import { handleAddFacilities, handleGetAllFacilities } from './facilitiesSaga'
import { handleGetAllCityHotels } from './cityHotelSaga'
import { handleGetAllCategoryFaci } from './categoryFaciSaga'
import { handleGetAllMembersFaci } from './membersFaciSaga'
import {
  handleAddFacilitiesSupport,
  handleAddFacilitiesSupportHotel,
  handleDeleteFacilitiesSupport,
  handleGetAllFacilitiesSupport,
  handleUpdateFacilitiesSupport,
} from './facilitiesSupportSaga'

function* watchAll() {
  yield all([
    takeEvery(ActionTypeHotel.REQ_GET_HOTELS, handleGetAllHotels),
    takeEvery(ActionTypeHotel.ADD_HOTELS, handleAddHotels),
    takeEvery(ActionTypeHotel.UPDATE_HOTELS, handleUpdateHotels),
    takeEvery(ActionTypeHotel.SWITCH_STATUS_HOTELS, handleSwitchHotels),
    //====MASTER MODULE====
    takeEvery(ActionTypeHotel.REQ_GET_CITY, handleGetAllCityHotels),
    takeEvery(ActionTypeHotel.REQ_GET_CATEGORY, handleGetAllCategoryFaci),
    takeEvery(ActionTypeHotel.REQ_GET_MEMBERS, handleGetAllMembersFaci),
    //=====FACILITITES=====
    takeEvery(ActionTypeHotel.REQ_GET_FACILITIES, handleGetAllFacilities),
    takeEvery(ActionTypeHotel.ADD_FACILITIES, handleAddFacilities),
    //=====FACILITITES SUPPORT=====
    takeEvery(
      ActionTypeHotel.REQ_GET_FACILITIES_SUPPORT,
      handleGetAllFacilitiesSupport
    ),
    takeEvery(
      ActionTypeHotel.ADD_FACILITIES_SUPPORT,
      handleAddFacilitiesSupport
    ),
    takeEvery(
      ActionTypeHotel.UPDATE_FACILITIES_SUPPORT,
      handleUpdateFacilitiesSupport
    ),
    takeEvery(
      ActionTypeHotel.DEL_FACILITIES_SUPPORT,
      handleDeleteFacilitiesSupport
    ),
    //=====FACILITITES SUPPORT HOTEL=====
    takeEvery(
      ActionTypeHotel.ADD_FACILITY_SUPPORT_HOTEL,
      handleAddFacilitiesSupportHotel
    ),
    takeEvery(
      ActionTypeHotel.GET_HOTELS_SUPPORT_RESPONSE,
      handleHotelsIncludeSupport
    ),
  ])
}
export default watchAll

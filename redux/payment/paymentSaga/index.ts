import{ takeEvery, all} from 'redux-saga/effects';
import actionType from '../action/actionType';
import { handleAddBank, handleDeleteBank, handleGetBank, handleUpdateBank } from './bankSaga';
import { handleAddFintech, handleDeleteFintech, handleGetFintech, handleUpdateFintech } from './fintechSaga';
import { handleGetPayTrans, handleTopup } from './paymentTransactionSaga';
import { handleDeleteUserAcc, handleGetBankFintech, handleGetUserAcc, handleUpdateUserAcc, hanleAddUserAcc } from './userAccountSaga';

function* watchAll(){
    yield all([
        takeEvery(actionType.GET_BANK, handleGetBank),
        takeEvery(actionType.ADD_BANK, handleAddBank),
        takeEvery(actionType.UPDATE_BANK, handleUpdateBank),
        takeEvery(actionType.DEL_BANK, handleDeleteBank),

        takeEvery(actionType.GET_FINTECH, handleGetFintech),
        takeEvery(actionType.ADD_FINTECH, handleAddFintech),
        takeEvery(actionType.UPDATE_FINTECH, handleUpdateFintech),
        takeEvery(actionType.DEL_FINTECH, handleDeleteFintech),

        takeEvery(actionType.GET_PAYMENT_TRANSACTION, handleGetPayTrans),
        takeEvery(actionType.POST_TOPUP, handleTopup),
        

        takeEvery(actionType.GET_USER_ACCOUNT, handleGetUserAcc),
        takeEvery(actionType.ADD_USER_ACCOUNT, hanleAddUserAcc),
        takeEvery(actionType.UPDATE_USER_ACCOUNT, handleUpdateUserAcc),
        takeEvery(actionType.DEL_USER_ACCOUNT, handleDeleteUserAcc),
        takeEvery(actionType.GET_BANK_FINTECH, handleGetBankFintech),
    ])
}

export default watchAll
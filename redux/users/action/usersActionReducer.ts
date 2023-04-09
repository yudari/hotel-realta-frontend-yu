import ActionTypesUsers from "./actionTypeUsers";

export const doUpdateProfile = (payload: any) => {
  return {
    type: ActionTypesUsers.UPDATE_PROFILE,
    payload,
  };
};

export const doUpdateProfileSuccess = (payload: any) => {
  return {
    type: ActionTypesUsers.UPDATE_PROFILE_SUCCESS,
    payload,
  };
};

export const doUpdateProfileFailed = (payload: any) => {
  return {
    type: ActionTypesUsers.UPDATE_PROFILE_FAILED,
    payload,
  };
};

export const doUpdatePassword = (payload: any) => {
  return {
    type: ActionTypesUsers.UPDATE_PASSWORD,
    payload,
  };
};

export const doUpdatePasswordSuccess = (payload: any) => {
  return {
    type: ActionTypesUsers.UPDATE_PASSWORD_SUCCESS,
    payload,
  };
};

export const doUpdatePasswordFailed = (payload: any) => {
  return {
    type: ActionTypesUsers.UPDATE_PASSWORD_FAILED,
    payload,
  };
};

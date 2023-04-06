import ActionTypesUsers from "../action/actionTypeUsers";

const initialState = {
  users: [],
  message: "",
  refresh: "",
  status: "",
};

function usersReducers(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case ActionTypesUsers.UPDATE_PROFILE_SUCCESS:
      return {
        payload,
        refresh: true,
        message: payload?.message,
      };
    case ActionTypesUsers.UPDATE_PROFILE_FAILED:
      return { message: payload.message, payload };
    case ActionTypesUsers.UPDATE_PASSWORD_SUCCESS:
      return { message: payload.message, payload };
    case ActionTypesUsers.UPDATE_PASSWORD_FAILED:
      return { message: payload.message, payload };
    default:
      return state;
  }
}

export default usersReducers;

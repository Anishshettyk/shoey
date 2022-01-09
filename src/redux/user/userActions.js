import * as types from "./userTypes";

export const setUser = (userDetails) => {
  return {
    type: types.SET_USER,
    payload: userDetails,
  };
};

export const signoutUser = () => {
  return {
    type: types.SIGN_OUT_USER,
  };
};

export const setProfileTab = (tabValue) => {
  return {
    type: types.SET_PROFILE_TAB,
    payload: tabValue,
  };
};

export const setPaymentPending = (value) => {
  return {
    type: types.SET_PAYMENT_PENDING,
    payload: value,
  };
};

export const setOpenSearch = (value) => {
  return {
    type: types.SET_OPEN_SEARCH,
    payload: value,
  };
};

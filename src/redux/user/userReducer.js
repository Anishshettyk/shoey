import * as types from "./userTypes";

const initialState = {
  userDetails: {},
  profileTab: 0,
  paymentPending: false,
  openSearch: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        userDetails: { ...action.payload },
      };
    case types.SIGN_OUT_USER:
      return {
        ...state,
        userDetails: {},
      };
    case types.SET_PROFILE_TAB:
      return {
        ...state,
        profileTab: action.payload,
      };
    case types.SET_PAYMENT_PENDING:
      return {
        ...state,
        paymentPending: action.payload,
      };
    case types.SET_OPEN_SEARCH:
      return {
        ...state,
        openSearch: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;

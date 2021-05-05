import * as types from './userTypes';

const initialState = {
  userDetails: {},
  shippingAddress: {},
  contactDetails: {},
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
    default:
      return state;
  }
};

export default userReducer;

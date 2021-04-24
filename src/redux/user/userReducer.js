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
        userDetails: action.payload[0],
      };
    default:
      return state;
  }
};

export default userReducer;

import * as types from "./cartTypes";

const initialState = {
  cartDetails: {},
  cartToken: {},
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.STORE_TO_CART:
      return {
        ...state,
        cartDetails: { ...action.payload },
      };
    case types.STORE_CART_TOKEN:
      return {
        ...state,
        cartToken: { ...action.payload },
      };
    default:
      return state;
  }
};

export default cartReducer;

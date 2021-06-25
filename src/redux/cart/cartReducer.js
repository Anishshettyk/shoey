import * as types from './cartTypes';

const initialState = {
  cartDetails: {},
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.STORE_TO_CART:
      return {
        ...state,
        cartDetails: { ...action.payload },
      };
    default:
      return state;
  }
};

export default cartReducer;

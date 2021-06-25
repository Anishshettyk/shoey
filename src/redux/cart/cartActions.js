import * as types from './cartTypes';

export const storeToCart = (cartDetails) => {
  return {
    type: types.STORE_TO_CART,
    payload: cartDetails,
  };
};

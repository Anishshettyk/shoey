import * as types from './ProductsTypes';

export const storeProducts = (products) => {
  return {
    type: types.STORE_PRODUCTS,
    payload: products,
  };
};

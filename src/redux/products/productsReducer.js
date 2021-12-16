import * as types from './ProductsTypes';

const initialState = {
  allProducts: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.STORE_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;

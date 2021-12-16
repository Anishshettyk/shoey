import { store } from '../redux';
import commerce from '../lib/commerce';
import { storeProducts } from '../redux';

const UseAllProductsData = async () => {
  const state = store.getState();
  if (state.products.allProducts.length === 0) {
    const response = await commerce.products.list();
    if (response) {
      store.dispatch(storeProducts(response?.data));
    }
  }
};

export default UseAllProductsData;

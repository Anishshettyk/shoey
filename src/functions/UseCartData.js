import { store } from '../redux';
import commerce from '../lib/commerce';
import { storeToCart } from '../redux';

const UseCartData = async () => {
  const response = await commerce.cart.retrieve();
  if (response) {
    store.dispatch(storeToCart(response));
  }
};

export default UseCartData;

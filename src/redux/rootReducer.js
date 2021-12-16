import { combineReducers } from 'redux';
import userReducer from './user/userReducer';
import notificationReducer from './notification/notificationReducer';
import productsReducer from './products/productsReducer';
import cartReducer from './cart/cartReducer';

const rootReducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  products: productsReducer,
  cart: cartReducer,
});

export default rootReducer;

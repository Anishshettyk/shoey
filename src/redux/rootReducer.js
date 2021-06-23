import { combineReducers } from 'redux';
import userReducer from './user/userReducer';
import notificationReducer from './notification/notificationReducer';
import productsReducer from './products/productsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  products: productsReducer,
});

export default rootReducer;

import { combineReducers } from 'redux';
import userReducer from './user/userReducer';
import notificationReducer from './notification/notificationReducer';
import pushLinkReducer from './pushLink/pushLinkReducer';
import productsReducer from './products/productsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  pushLink: pushLinkReducer,
  products: productsReducer,
});

export default rootReducer;

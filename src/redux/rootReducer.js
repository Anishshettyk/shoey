import { combineReducers } from 'redux';
import userReducer from './user/userReducer';
import notificationReducer from './notification/notificationReducer';

const rootReducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
});

export default rootReducer;

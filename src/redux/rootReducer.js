import { combineReducers } from 'redux';
import userReducer from './user/userReducer';
import notificationReducer from './notification/notificationReducer';
import pushLinkReducer from './pushLink/pushLinkReducer';

const rootReducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  pushLink: pushLinkReducer,
});

export default rootReducer;

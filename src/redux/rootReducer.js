import { combineReducers } from 'redux';
import userReducer from './user/userReducer';
import loadingReducer from './loading/loadingReducer';

const rootReducer = combineReducers({
  loading: loadingReducer,
  user: userReducer,
});

export default rootReducer;

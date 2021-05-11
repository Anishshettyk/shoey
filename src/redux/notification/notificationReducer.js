import * as types from './notifcationTypes';

const initialState = {
  message: null,
  varient: null,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INVOKE_NOTIFICATION:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default notificationReducer;

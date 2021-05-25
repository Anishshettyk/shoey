import * as types from './notifcationTypes';

const initialState = {
  message: null,
  varient: null,
  duration: null,
  times: 0,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INVOKE_NOTIFICATION:
      if (action.payload.message === state.message) {
        return {
          ...action.payload,
          times: state.times + 1,
        };
      } else {
        return {
          ...action.payload,
          times: 0,
        };
      }

    default:
      return state;
  }
};

export default notificationReducer;

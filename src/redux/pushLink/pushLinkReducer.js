import * as types from './pushLinkTypes';

const initialState = {
  link: '/',
};

const pushLinkReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.BACK_LINK:
      return {
        ...state,
        link: action.payload,
      };
    default:
      return state;
  }
};

export default pushLinkReducer;

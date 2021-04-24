import * as types from './userTypes';

export const setUser = (userDetails) => {
  return {
    type: types.SET_USER,
    payload: userDetails,
  };
};

export const signoutUser = () => {
  return {
    type: types.SIGN_OUT_USER,
  };
};

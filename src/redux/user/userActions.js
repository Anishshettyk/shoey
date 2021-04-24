import * as types from './userTypes';

export const setUser = (userDetails) => {
  return {
    type: types.SET_USER,
    payload: userDetails,
  };
};

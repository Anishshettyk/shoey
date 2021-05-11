import * as types from './notifcationTypes';

export const makeNotification = (notifications) => {
  return {
    type: types.INVOKE_NOTIFICATION,
    payload: { ...notifications },
  };
};

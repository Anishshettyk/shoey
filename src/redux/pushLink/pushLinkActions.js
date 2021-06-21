import * as types from './pushLinkTypes';

export const pushUserBackTo = (link) => {
  return {
    type: types.BACK_LINK,
    payload: link,
  };
};

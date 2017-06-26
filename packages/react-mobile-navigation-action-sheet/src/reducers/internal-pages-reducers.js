import { actionPageStoreModel, PageStatusTypesEnum } from 'react-mobile-navigation-core';
import {
  ACTION_SHEET_CLOSE_START,
  ACTION_SHEET_CLOSING,
  ACTION_SHEET_CLOSE_DONE,
  ACTION_SHEET_OPEN_START,
  ACTION_SHEET_OPENING,
  ACTION_SHEET_OPEN_DONE,
} from '../action-types/internal-paging-action-types';

export const initialState = actionPageStoreModel(PageStatusTypesEnum.CLOSE_DONE);

// NOTE: set zIndex 1003 to be on a top of everything
export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_SHEET_OPEN_START:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.OPEN_PREPARE,
        zIndex: 1003,
        direction: action.direction,
      });
    case ACTION_SHEET_OPENING:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.OPEN_ANIMATING,
      });
    case ACTION_SHEET_OPEN_DONE:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.OPEN_DONE,
      });
    case ACTION_SHEET_CLOSE_START:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.CLOSE_PREPARE,
      });
    case ACTION_SHEET_CLOSING:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.CLOSE_ANIMATING,
      });
    case ACTION_SHEET_CLOSE_DONE:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.CLOSE_DONE,
        zIndex: 0,
        direction: undefined,
      });
    default:
      return state;
  }
};

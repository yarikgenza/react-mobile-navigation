import { actionPageStoreModel, PageStatusTypesEnum } from 'react-mobile-navigation-core';
import {
  ACTION_SHEET_GO_BACK,
  ACTION_SHEET_GOING_BACK,
  ACTION_SHEET_GOING_BACK_DONE,
  ACTION_SHEET_OPEN_PAGE,
  ACTION_SHEET_OPENING_PAGE,
  ACTION_SHEET_OPENING_PAGE_DONE,
} from '../action-types/internal-paging-action-types';

const initialState = actionPageStoreModel(PageStatusTypesEnum.CLOSE_DONE);

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_SHEET_OPEN_PAGE:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.OPEN_PREPARE,
        zIndex: action.zIndex,
        direction: action.direction,
      });
    case ACTION_SHEET_OPENING_PAGE:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.OPEN_ANIMATING,
      });
    case ACTION_SHEET_OPENING_PAGE_DONE:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.OPEN_DONE,
      });
    case ACTION_SHEET_GO_BACK:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.CLOSE_PREPARE,
      });
    case ACTION_SHEET_GOING_BACK:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.CLOSE_ANIMATING,
      });
    case ACTION_SHEET_GOING_BACK_DONE:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.CLOSE_DONE,
        zIndex: 0,
        direction: undefined,
      });
    default:
      return state;
  }
};

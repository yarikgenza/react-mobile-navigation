import { actionPageStoreModel, PageStatusTypesEnum } from 'react-mobile-navigation-core';
import {
  MODAL_OPEN_PAGE,
  MODAL_OPENING_PAGE,
  MODAL_OPENING_PAGE_DONE,
  MODAL_GOING_BACK,
  MODAL_GO_BACK,
  MODAL_GOING_BACK_DONE,
} from '../action-types/internal-paging-action-types';

export const initialState = actionPageStoreModel(PageStatusTypesEnum.CLOSE_DONE);

// NOTE: set zIndex 1001 to be on a top of everything, but not action sheet and combobox
export default (state = initialState, action) => {
  switch (action.type) {
    case MODAL_OPEN_PAGE:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.OPEN_PREPARE,
        zIndex: 1001,
        direction: action.direction,
      });
    case MODAL_OPENING_PAGE:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.OPEN_ANIMATING,
      });
    case MODAL_OPENING_PAGE_DONE:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.OPEN_DONE,
      });
    case MODAL_GO_BACK:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.CLOSE_PREPARE,
      });
    case MODAL_GOING_BACK:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.CLOSE_ANIMATING,
      });
    case MODAL_GOING_BACK_DONE:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.CLOSE_DONE,
        zIndex: 0,
        direction: undefined,
      });
    default:
      return state;
  }
};

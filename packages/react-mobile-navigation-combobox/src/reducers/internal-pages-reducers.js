import { actionPageStoreModel, PageStatusTypesEnum } from 'react-mobile-navigation-core';
import {
  COMBO_BOX_OPEN_PAGE,
  COMBO_BOX_OPENING_PAGE,
  COMBO_BOX_OPENING_PAGE_DONE,
  COMBO_BOX_GOING_BACK,
  COMBO_BOX_GO_BACK,
  COMBO_BOX_GOING_BACK_DONE,
} from '../action-types/internal-paging-action-types';

export const initialState = actionPageStoreModel(PageStatusTypesEnum.CLOSE_DONE);

// NOTE: set zIndex 1000 to be on a top of everything, but not action sheet
export default (state = initialState, action) => {
  switch (action.type) {
    case COMBO_BOX_OPEN_PAGE:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.OPEN_PREPARE,
        zIndex: 1000,
        direction: action.direction,
      });
    case COMBO_BOX_OPENING_PAGE:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.OPEN_ANIMATING,
      });
    case COMBO_BOX_OPENING_PAGE_DONE:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.OPEN_DONE,
      });
    case COMBO_BOX_GO_BACK:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.CLOSE_PREPARE,
      });
    case COMBO_BOX_GOING_BACK:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.CLOSE_ANIMATING,
      });
    case COMBO_BOX_GOING_BACK_DONE:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.CLOSE_DONE,
        zIndex: 0,
        direction: undefined,
      });
    default:
      return state;
  }
};

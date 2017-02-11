import { actionPageStoreModel, PageStatusTypesEnum } from 'react-mobile-navigation-core';
import {
  INTERNAL_OPEN_PAGE,
  INTERNAL_OPENING_PAGE,
  INTERNAL_OPENING_PAGE_DONE,
  INTERNAL_GOING_BACK,
  INTERNAL_GO_BACK,
  INTERNAL_GOING_BACK_DONE,
} from '../constants/internal-paging-action-types';

const initialState = actionPageStoreModel(PageStatusTypesEnum.CLOSE_DONE);

export default (state = initialState, action) => {
  switch (action.type) {
    case INTERNAL_OPEN_PAGE:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.OPEN_PREPARE,
        zIndex: action.zIndex,
        direction: action.direction,
      });
    case INTERNAL_OPENING_PAGE:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.OPEN_ANIMATING,
      });
    case INTERNAL_OPENING_PAGE_DONE:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.OPEN_DONE,
      });
    case INTERNAL_GOING_BACK:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.CLOSE_PREPARE,
      });
    case INTERNAL_GO_BACK:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.CLOSE_ANIMATING,
      });
    case INTERNAL_GOING_BACK_DONE:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.CLOSE_DONE,
        zIndex: 0,
        direction: undefined,
      });
    default:
      return state;
  }
};

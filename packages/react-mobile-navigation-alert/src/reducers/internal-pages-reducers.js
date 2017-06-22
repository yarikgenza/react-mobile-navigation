import { actionPageStoreModel, PageStatusTypesEnum } from 'react-mobile-navigation-core';
import {
  ALERT_OPEN_PAGE,
  ALERT_OPENING_PAGE,
  ALERT_OPENING_PAGE_DONE,
  ALERT_GOING_BACK,
  ALERT_GO_BACK,
  ALERT_GOING_BACK_DONE,
} from '../action-types/internal-paging-action-types';

const initialState = actionPageStoreModel(PageStatusTypesEnum.CLOSE_DONE);

export default (state = initialState, action) => {
  switch (action.type) {
    case ALERT_OPEN_PAGE:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.OPEN_PREPARE,
        zIndex: action.zIndex,
        direction: action.direction,
      });
    case ALERT_OPENING_PAGE:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.OPEN_ANIMATING,
      });
    case ALERT_OPENING_PAGE_DONE:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.OPEN_DONE,
      });
    case ALERT_GO_BACK:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.CLOSE_PREPARE,
      });
    case ALERT_GOING_BACK:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.CLOSE_ANIMATING,
      });
    case ALERT_GOING_BACK_DONE:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.CLOSE_DONE,
        zIndex: 0,
        direction: undefined,
      });
    default:
      return state;
  }
};

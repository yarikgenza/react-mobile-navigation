import {
  actionPageStoreModel,
  DirectionEnum,
  PageStatusTypesEnum,
} from 'react-mobile-navigation-core';
import {
  ALERT_OPEN_PAGE,
  ALERT_OPENING_PAGE,
  ALERT_OPENING_PAGE_DONE,
  ALERT_GOING_BACK,
  ALERT_GO_BACK,
  ALERT_GO_BACK_FORCE,
  ALERT_GOING_BACK_DONE,
} from '../action-types/alert-paging-action-types';

export const initialState = actionPageStoreModel(PageStatusTypesEnum.CLOSE_DONE);

// NOTE: set zIndex 999 to be on a top of everything, but not action sheet
export default (state = initialState, action) => {
  switch (action.type) {
    case ALERT_OPEN_PAGE:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.OPEN_PREPARE,
        zIndex: 999,
        direction: DirectionEnum.VERTICAL,
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
    case ALERT_GO_BACK_FORCE:
      return Object.assign({}, state, {
        status: PageStatusTypesEnum.CLOSE_DONE,
        zIndex: 0,
        direction: undefined,
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

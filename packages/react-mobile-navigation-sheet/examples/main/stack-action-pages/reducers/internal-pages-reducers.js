import { PageStatusTypesEnum } from 'react-mobile-navigation-core';
import * as ActionSheetInternalPagingActionTypes from '../constants/internal-paging-action-types';
import { internalPagingReducers } from '../reducers/internal-page-reducers';

/**
 * @example
 *  [ACTION_SHEET_PAGE_ID]: actionPageStoreModel(PageStatusTypesEnum.CLOSED),
 */
const initialState = {};

export function actionSheetInternalPagesReducers(state = initialState, action) {
  switch (action.type) {
    case ActionSheetInternalPagingActionTypes.INTERNAL_OPEN_PAGE:
      return Object.assign({}, state, {
        [action.internalPageName]: internalPagingReducers(
          state[action.internalPageName],
          PageStatusTypesEnum.PREPARE_TO_OPEN,
          action.zIndex,
          action.direction
        ),
      });
    case ActionSheetInternalPagingActionTypes.INTERNAL_OPENING_PAGE:
      return Object.assign({}, state, {
        [action.internalPageName]: internalPagingReducers(
          state[action.internalPageName],
          PageStatusTypesEnum.OPENING,
          state[action.internalPageName].zIndex
        ),
      });
    case ActionSheetInternalPagingActionTypes.INTERNAL_OPENING_PAGE_DONE:
      return Object.assign({}, state, {
        [action.internalPageName]: internalPagingReducers(
          state[action.internalPageName],
          PageStatusTypesEnum.OPENED,
          state[action.internalPageName].zIndex
        ),
      });
    case ActionSheetInternalPagingActionTypes.INTERNAL_GOING_BACK:
      return Object.assign({}, state, {
        [action.internalPageName]: internalPagingReducers(
          state[action.internalPageName],
          PageStatusTypesEnum.CLOSING,
          state[action.internalPageName].zIndex
        ),
      });
    case ActionSheetInternalPagingActionTypes.INTERNAL_GO_BACK:
      return Object.assign({}, state, {
        [action.internalPageName]: internalPagingReducers(
          state[action.internalPageName],
          PageStatusTypesEnum.PREPARE_TO_CLOSE,
          state[action.internalPageName].zIndex
        ),
      });
    case ActionSheetInternalPagingActionTypes.INTERNAL_GOING_BACK_DONE:
      return Object.assign({}, state, {
        [action.internalPageName]: internalPagingReducers(
          state[action.internalPageName],
          PageStatusTypesEnum.CLOSED,
          0
        ),
      });
    default:
      return state;
  }
}

import { actionPageStoreModel, PageStatusTypesEnum } from 'react-mobile-navigation-core';
import {
  ActionSheetInternalPagingActionTypes,
  ACTION_SHEET_PAGE_ID,
  actionSheetInternalPagesReducers,
} from 'react-mobile-navigation-action-sheet';

const initialState = {
  [ACTION_SHEET_PAGE_ID]: actionPageStoreModel(PageStatusTypesEnum.CLOSED),
};

export function mainPageReducers(state = initialState, action) {
  switch (action.type) {
    case ActionSheetInternalPagingActionTypes.INTERNAL_OPEN_PAGE:
    case ActionSheetInternalPagingActionTypes.INTERNAL_OPENING_PAGE:
    case ActionSheetInternalPagingActionTypes.INTERNAL_OPENING_PAGE_DONE:
    case ActionSheetInternalPagingActionTypes.INTERNAL_GOING_BACK:
    case ActionSheetInternalPagingActionTypes.INTERNAL_GO_BACK:
    case ActionSheetInternalPagingActionTypes.INTERNAL_GOING_BACK_DONE:
      return Object.assign({}, state, actionSheetInternalPagesReducers(state, action));
    default:
      return state;
  }
}

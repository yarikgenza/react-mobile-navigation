import {
  actionPageStoreModel,
  PageStatusTypesEnum,
} from 'react-mobile-navigation-core';
import {
  InternalPagingActionTypes,
  systemPagesTypesEnum,
  internalPagesReducers,
} from '../../stack-action-pages';

const initialState = {
  [systemPagesTypesEnum.ACTION_SHEET_PAGE_ID]: actionPageStoreModel(PageStatusTypesEnum.CLOSED),
  [systemPagesTypesEnum.COMBOBOX_PAGE_ID]: actionPageStoreModel(PageStatusTypesEnum.CLOSED),
};

// TODO: simplify?
export function mainPageReducers(state = initialState, action) {
  switch (action.type) {
    case InternalPagingActionTypes.INTERNAL_OPEN_PAGE:
    case InternalPagingActionTypes.INTERNAL_OPENING_PAGE:
    case InternalPagingActionTypes.INTERNAL_OPENING_PAGE_DONE:
    case InternalPagingActionTypes.INTERNAL_GOING_BACK:
    case InternalPagingActionTypes.INTERNAL_GO_BACK:
    case InternalPagingActionTypes.INTERNAL_GOING_BACK_DONE:
      return Object.assign({}, state, internalPagesReducers(state, action));
    default:
      return state;
  }
}

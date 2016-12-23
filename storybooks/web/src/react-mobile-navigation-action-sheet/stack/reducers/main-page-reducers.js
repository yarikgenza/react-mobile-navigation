import { actionSheetPagingReducers } from 'react-mobile-navigation-action-sheet';

export function mainPageReducers(state, action) {
  return Object.assign({}, state, actionSheetPagingReducers(state, action));
}

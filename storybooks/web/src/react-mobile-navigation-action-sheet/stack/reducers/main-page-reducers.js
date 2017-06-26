import { actionSheetPagesReducers } from 'react-mobile-navigation-action-sheet';

export function mainPageReducers(state, action) {
  return Object.assign({}, state, actionSheetPagesReducers(state, action));
}

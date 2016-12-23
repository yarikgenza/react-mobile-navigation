import { actionSheetPagingReducers } from '../../stack-action-pages';

export function mainPageReducers(state, action) {
  return actionSheetPagingReducers(state, action);
}

import { modalPagesReducers } from 'react-mobile-navigation-modal';

export function mainPageReducers(state, action) {
  return Object.assign({}, state, modalPagesReducers(state, action));
}

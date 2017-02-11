import { comboBoxPagesReducers } from 'react-mobile-navigation-combobox';

export function mainPageReducers(state, action) {
  return Object.assign({}, state, comboBoxPagesReducers(state, action));
}

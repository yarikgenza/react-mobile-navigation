import { comboBoxReducers } from 'react-mobile-navigation-combobox';

export function mainPageReducers(state, action) {
  return Object.assign({}, state, comboBoxReducers(state, action));
}

import { combineReducers } from 'redux';
import { alertBoxPagesReducers } from 'react-mobile-navigation-alert';

export function alertPageReducers(state, action) {
  return Object.assign({}, state, alertBoxPagesReducers(state, action));
}

export default combineReducers({
  stackId: () => 'stack-id',
  alertPageReducers,
});

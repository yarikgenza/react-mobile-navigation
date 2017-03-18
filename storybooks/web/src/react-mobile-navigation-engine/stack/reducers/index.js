import { combineReducers } from 'redux';
import { createMobileNavigationReducers } from 'react-mobile-navigation-engine';

export default combineReducers({
  mobileNavigationReducers: createMobileNavigationReducers('stack-id'),
  stackId: () => 'stack-id',
});

import { createMobileNavigationReducers } from 'react-mobile-navigation-engine';
import { combineReducers } from 'redux';
import { mainPageReducers } from './main-page-reducers';

export default combineReducers({
  mobileNavigationReducers: createMobileNavigationReducers('stack-id'),
  mainPageReducers,
});

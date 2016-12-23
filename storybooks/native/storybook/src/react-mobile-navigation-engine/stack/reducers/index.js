import { combineReducers } from 'redux';
import { mobileNavigationReducers } from 'react-mobile-navigation-engine';

export default combineReducers({
	mobileNavigationReducers,
	stackId: () => 'settingsId',
});

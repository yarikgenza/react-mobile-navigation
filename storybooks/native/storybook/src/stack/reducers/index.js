import { combineReducers } from 'redux';
import { stackSystemDataReducers } from 'react-mobile-navigation-engine';

const rootReducer = combineReducers({
	stackSystemDataReducers,
	stackId: () => 'settingsId',
});

export default rootReducer;

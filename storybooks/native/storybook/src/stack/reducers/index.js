import { combineReducers } from 'redux';
import { stackSystemDataReducers } from '../../../../lib/react-mobile-navigation-engine/src';

const rootReducer = combineReducers({
	stackSystemDataReducers,
	stackId: () => 'settingsId',
});

export default rootReducer;

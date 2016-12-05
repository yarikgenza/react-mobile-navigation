import { combineReducers } from 'redux';
import { mainPageReducers } from './main-page-reducers';

const rootReducer = combineReducers({
	mainPageReducers,
});

export default rootReducer;

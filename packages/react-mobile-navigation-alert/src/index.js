import * as alertActionTypes from './action-types/internal-paging-action-types';
import AlertBox from './components/AlertBox';
import * as alertActions from './actions/internal-paging-actions';
import alertPagesReducers, {
  initialState as alertPagesInitialState,
} from './reducers/internal-pages-reducers';

export {
  AlertBox,
  alertActionTypes,
  alertActions,
  alertPagesInitialState,
  alertPagesReducers,
};

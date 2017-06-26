import * as modalActionTypes from './action-types/internal-paging-action-types';
import Modal from './components/Modal';
import * as modalActions from './actions/internal-paging-actions';
import modalPagesReducers, {
  initialState as modalPagesInitialState,
} from './reducers/internal-pages-reducers';

export {
  Modal,
  modalActionTypes,
  modalActions,
  modalPagesInitialState,
  modalPagesReducers,
};

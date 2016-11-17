import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SettingsMainPageComponent } from '../components/SettingsMainPageComponent';
import { internalPagingActions, systemPagesTypesEnum } from '../../stack-action-pages';

function mapStateToProps(state) {
  return {
    actionSheet: state.mainPageReducers[systemPagesTypesEnum.ACTION_SHEET_PAGE_ID],
    comboBox: state.mainPageReducers[systemPagesTypesEnum.COMBOBOX_PAGE_ID],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionSheetActions: bindActionCreators(internalPagingActions, dispatch),
    comboBoxActions: bindActionCreators(internalPagingActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsMainPageComponent);

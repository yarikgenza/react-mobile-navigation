import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SettingsMainPageComponent } from '../components/SettingsMainPageComponent';
import { actionSheetInternalPagingActions, ACTION_SHEET_PAGE_ID } from 'react-mobile-navigation-action-sheet';

function mapStateToProps(state) {
  return {
    actionSheet: state.mainPageReducers[ACTION_SHEET_PAGE_ID],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionSheetActions: bindActionCreators(actionSheetInternalPagingActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsMainPageComponent);

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SettingsMainPageComponent } from '../../components/pages/SettingsMainPageComponent';
import { actionSheetPagingActions } from 'react-mobile-navigation-action-sheet';

function mapStateToProps(state) {
  return {
    actionSheet: state.mainPageReducers,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionSheetPagingActions: bindActionCreators(actionSheetPagingActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsMainPageComponent);

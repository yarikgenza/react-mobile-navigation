import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SettingsMainPageComponent } from '../components/SettingsMainPageComponent';
import { actionSheetPagingActions } from '../../stack-action-pages';

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

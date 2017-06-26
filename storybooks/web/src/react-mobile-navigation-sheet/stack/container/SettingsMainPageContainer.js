import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SettingsMainPageComponent } from '../components/SettingsMainPageComponent';
import { actionSheetActions } from '../../stack-action-pages';

function mapStateToProps(state) {
  return {
    actionSheet: state.mainPageReducers,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionSheetActions: bindActionCreators(actionSheetActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsMainPageComponent);

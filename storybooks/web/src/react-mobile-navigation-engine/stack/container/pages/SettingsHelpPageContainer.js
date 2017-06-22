import { alertBoxPagingActions } from 'react-mobile-navigation-alert';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SettingsHelpPageComponent } from '../../components/pages/SettingsHelpPageComponent';

function mapStateToProps(state) {
  return {
    alert: state.alertPageReducers,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators(alertBoxPagingActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsHelpPageComponent);

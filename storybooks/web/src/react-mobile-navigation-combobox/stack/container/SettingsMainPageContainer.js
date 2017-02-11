import { comboBoxPagingActions } from 'react-mobile-navigation-combobox';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SettingsMainPageComponent } from '../components/SettingsMainPageComponent';

function mapStateToProps(state) {
  return {
    comboBox: state.mainPageReducers,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    comboBoxActions: bindActionCreators(comboBoxPagingActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsMainPageComponent);

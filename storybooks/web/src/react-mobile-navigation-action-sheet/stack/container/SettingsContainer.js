import { connect } from 'react-redux';
import { SettingsComponent } from '../components/SettingsComponent';

function mapStateToProps(state) {
  return {
    mobileNavigationData: state.mobileNavigationReducers,
  };
}

export default connect(
  mapStateToProps
)(SettingsComponent);

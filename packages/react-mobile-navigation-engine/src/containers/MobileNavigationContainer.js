import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MobileNavigation from '../components/MobileNavigation';
import * as pagingActions from '../actions/paging-actions';
import * as mobileNavigationActions from '../actions/stack-system-data-actions';

function mapStateToProps(state) {
  return {
    mobileNavigationData: state.mobileNavigationReducers,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pagingActions: bindActionCreators(pagingActions, dispatch),
    mobileNavigationActions: bindActionCreators(mobileNavigationActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileNavigation);

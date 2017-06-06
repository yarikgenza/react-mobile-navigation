import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as pagingActions from '../actions/paging-actions';
import MobileNavigationPageEngine from '../components/MobileNavigationPageEngine';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    pagingActions: bindActionCreators(pagingActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileNavigationPageEngine);

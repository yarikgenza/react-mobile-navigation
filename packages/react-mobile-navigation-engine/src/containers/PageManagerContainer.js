import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PageManager } from '../components/PageManager';
import * as pagingActions from '../actions/paging-actions';
import * as stackSystemDataActions from '../actions/stack-system-data-actions';

function mapStateToProps(state) {
  return {
    stackSystemData: state.stackSystemDataReducers,
    stackId: state.stackId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    stackSystemDataActions: bindActionCreators(stackSystemDataActions, dispatch),
    pagingActions: bindActionCreators(pagingActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageManager);

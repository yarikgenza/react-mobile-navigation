import React from 'react';
import AlertBox from './AlertBox';
import {
  ALERT_OPEN_PAGE,
  ALERT_GO_BACK_FORCE,
  ALERT_GOING_BACK_DONE,
} from '../action-types/alert-paging-action-types';
import * as alertActions from '../actions/alert-paging-actions';
import * as pagingActions from '../actions/paging-actions';
import MobileNavigationPageEngine from '../components/MobileNavigationPageEngine';
import MobileNavigationRender from '../components-styled/MobileNavigationRender';
import mobileNavigationReducers from '../reducers/index';
import alertPagesReducers, {
  initialState as alertPagesInitialState,
} from '../reducers/alert-pages-reducers';
import { getPageById } from '../utils/page-manager';

const propTypes = {
  children: React.PropTypes.any,
  initState: React.PropTypes.object,
  pageHeight: React.PropTypes.number,
  pageWidth: React.PropTypes.number,
  stackId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]).isRequired,
};

const defaultProps = {};

export default class MobileNavigation extends React.Component {

  constructor(props) {
    super(props);
    this.memoizedAlert = undefined;
    this.state = {
      alert: alertPagesInitialState,
      navigation: props.initState,
    };
    this.dispatchAlertActions = this.dispatchAlertActions.bind(this);
    this.dispatchPagingActions = this.dispatchPagingActions.bind(this);
    this.pagingActions = this.bindActionCreators(pagingActions, this.dispatchPagingActions);
    this.alertActions = this.bindActionCreators(alertActions, this.dispatchAlertActions);
  }

  getVisiblePageData(prevPageId) {
    const { navigation } = this.state;
    return {
      pageId: prevPageId,
      pageState: navigation.pages[prevPageId],
    };
  }

  /**
   * Render only visible and the previous pages.
   * @param {*} activePageId
   */
  getVisiblePages(activePageId) {
    const visiblePagesData = [];
    let pageData = this.getVisiblePageData(activePageId);
    visiblePagesData.push(pageData);
    if (pageData.pageState.prevPageId) {
      pageData = this.getVisiblePageData(pageData.pageState.prevPageId);
      visiblePagesData.push(pageData);
    }
    return visiblePagesData;
  }

  bindActionCreators(actionCreator, dispatch) {
    return Object.keys(actionCreator)
      .reduce((accumulator, value) => (
        Object.assign(accumulator, {
          [value]: (...props) => { dispatch(actionCreator[value](...props)); },
        })
      ), {});
  }

  dispatchAlertActions(action) {
    // do not store alert info in a state
    switch (action.type) {
      case ALERT_OPEN_PAGE:
        this.memoizedAlert = {
          autoHideDuration: action.alertAutoHideDuration,
          text: action.alertText,
          type: action.alertType,
          onClick: action.alertOnClick,
        };
        break;
      case ALERT_GOING_BACK_DONE:
      case ALERT_GO_BACK_FORCE:
        this.memoizedAlert = undefined;
        break;
      default:
        break;
    }
    this.setState(prevState => ({
      alert: alertPagesReducers(prevState.alert, action),
    }));
  }

  dispatchPagingActions(action) {
    this.setState(prevState => ({
      navigation: mobileNavigationReducers(prevState.navigation, action),
    }));
  }

  render() {
    const { children, pageHeight, pageWidth, stackId } = this.props;
    const { alert, navigation } = this.state;
    return (
      <MobileNavigationRender>
        {this.getVisiblePages(navigation.activePageId).map(page => {
          const pageId = page.pageId;
          return (
            <MobileNavigationPageEngine
              alertActions={this.alertActions}
              key={pageId}
              pageHeight={pageHeight}
              pagingActions={this.pagingActions}
              pageId={pageId}
              pageState={page.pageState}
              pageWidth={pageWidth}
              stackId={stackId}
            >
              {getPageById(React.Children.toArray(children), pageId)}
            </MobileNavigationPageEngine>
          );
        })}
        {this.memoizedAlert && (
          <AlertBox
            autoHideDuration={this.memoizedAlert.autoHideDuration}
            pageState={alert}
            pagingActions={this.alertActions}
            text={this.memoizedAlert.text}
            type={this.memoizedAlert.type}
            onClick={this.memoizedAlert.onClick}
          />
        )}
      </MobileNavigationRender>
    );
  }
}

MobileNavigation.propTypes = propTypes;
MobileNavigation.defaultProps = defaultProps;

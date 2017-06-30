import React from 'react';
import {
  PageStatusTypesEnum,
  Interpolation,
  MobileNavigationView,
} from 'react-mobile-navigation-core';

const propTypes = {
  autoHideDuration: React.PropTypes.number.isRequired,
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.arrayOf(React.PropTypes.number),
    React.PropTypes.arrayOf(React.PropTypes.string),
    React.PropTypes.node,
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  pagingActions: React.PropTypes.objectOf(React.PropTypes.func),
  pageState: React.PropTypes.object,
};

const defaultProps = {
  autoHideDuration: 1000,
  children: undefined,
};

export default class AlertBox extends React.Component {

  constructor(props) {
    super(props);
    this.timerAutoHideId = undefined;
    this.onPageTransitionEnd = this.onPageTransitionEnd.bind(this);
    this.setPageStatus = this.setPageStatus.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timerAutoHideId);
    this.closeAlertForce();
  }

  onPageTransitionEnd() {
    const { pageState, pagingActions } = this.props;
    switch (pageState.status) {
      case PageStatusTypesEnum.OPEN_ANIMATING: {
        pagingActions.openPageDone();
        this.closeAlert();
        return;
      }
      case PageStatusTypesEnum.CLOSE_ANIMATING: {
        pagingActions.goBackDone();
        return;
      }
      default:
        return;
    }
  }

  setPageStatus() {
    const { pageState, pagingActions } = this.props;
    switch (pageState.status) {
      case PageStatusTypesEnum.OPEN_PREPARE:
        // case PageSideTypesEnum.GOING_TO_MAIN:
        pagingActions.openingPage();
        return;
      case PageStatusTypesEnum.CLOSE_PREPARE:
        // case PageSideTypesEnum.GOING_TO_COVER:
        pagingActions.goingBack();
        return;
      default:
        return;
    }
  }

  closeAlert() {
    const { autoHideDuration, pagingActions } = this.props;
    clearTimeout(this.timerAutoHideId);
    if (autoHideDuration > 0) {
      this.timerAutoHideId = setTimeout(() => {
        pagingActions.goBack();
      }, autoHideDuration);
      return;
    }
    // close right away
    this.timerAutoHideId = setTimeout(() => {
      pagingActions.goBack();
    }, 0);
  }

  closeAlertForce() {
    const { pagingActions } = this.props;
    pagingActions.goBackForce();
  }

  render() {
    const { children, pageState } = this.props;
    if (pageState.status === PageStatusTypesEnum.CLOSE_DONE) {
      return null;
    }
    return (
      <Interpolation
        setPageStatus={this.setPageStatus}
        onPageTransitionEnd={this.onPageTransitionEnd}
        pageState={pageState}
      >
        <MobileNavigationView>
          {children}
        </MobileNavigationView>
      </Interpolation>
    );
  }
}

AlertBox.propTypes = propTypes;
AlertBox.defaultProps = defaultProps;

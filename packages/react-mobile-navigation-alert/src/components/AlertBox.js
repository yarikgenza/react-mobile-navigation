import Alert from 'binary-ui-components/mobile/Alert';
import React from 'react';
import {
  PageStatusTypesEnum,
  Interpolation,
  MobileNavigationView,
} from 'react-mobile-navigation-core';

const propTypes = {
  autoHideDuration: React.PropTypes.number.isRequired,
  pagingActions: React.PropTypes.objectOf(React.PropTypes.func),
  pageState: React.PropTypes.object,
  text: React.PropTypes.string,
  type: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

const defaultProps = {
  autoHideDuration: 1000,
  text: '',
  type: undefined,
  onClick: undefined,
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
    const { pageState, text, type, onClick } = this.props;
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
          <Alert text={text} type={type} onClick={onClick} />
        </MobileNavigationView>
      </Interpolation>
    );
  }
}

AlertBox.propTypes = propTypes;
AlertBox.defaultProps = defaultProps;

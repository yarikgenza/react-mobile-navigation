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
  direction: React.PropTypes.string.isRequired,
  pageState: React.PropTypes.object,
  zIndex: React.PropTypes.number.isRequired,
  onAlertOpenDone: React.PropTypes.func.isRequired,
  onAlertCloseStart: React.PropTypes.func.isRequired,
  onAlertCloseDone: React.PropTypes.func.isRequired,
};

const defaultProps = {
  autoHideDuration: 2500,
  children: undefined,
};

export default class AlertBox extends React.Component {

  constructor(props) {
    super(props);
    this.timerAutoHideId = undefined;
    this.onPageActivityEnd = this.onPageActivityEnd.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timerAutoHideId);
    this.closeAlertForce();
  }

  onPageActivityEnd() {
    const { pageState, onAlertOpenDone, onAlertCloseDone } = this.props;
    switch (pageState.status) {
      case PageStatusTypesEnum.OPEN_DONE: {
        onAlertOpenDone();
        this.closeAlert();
        return;
      }
      case PageStatusTypesEnum.CLOSE_DONE: {
        onAlertCloseDone();
        return;
      }
      default:
        return;
    }
  }

  closeAlert() {
    const { autoHideDuration, onAlertCloseStart } = this.props;
    clearTimeout(this.timerAutoHideId);
    if (autoHideDuration > 0) {
      this.timerAutoHideId = setTimeout(() => {
        onAlertCloseStart();
      }, autoHideDuration);
      return;
    }
    // close right away
    this.timerAutoHideId = setTimeout(() => {
      onAlertCloseStart();
    }, 0);
  }

  closeAlertForce() {
    const { onAlertCloseDone } = this.props;
    onAlertCloseDone();
  }

  render() {
    const { children, direction, pageState, zIndex } = this.props;
    return (
      <Interpolation
        direction={direction}
        isAnimation
        pageState={pageState}
        status={PageStatusTypesEnum.CLOSE_DONE}
        onPageActivityEnd={this.onPageActivityEnd}
      >
        <MobileNavigationView direction={direction} zIndex={zIndex} >
          {children}
        </MobileNavigationView>
      </Interpolation>
    );
  }
}

AlertBox.propTypes = propTypes;
AlertBox.defaultProps = defaultProps;

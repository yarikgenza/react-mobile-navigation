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
  pageStatus: React.PropTypes.string,
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
    this.onPageOpenDone = this.onPageOpenDone.bind(this);
    this.onPageCloseDone = this.onPageCloseDone.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timerAutoHideId);
    this.closeAlertForce();
  }

  onPageOpenDone() {
    const { onAlertOpenDone } = this.props;
    onAlertOpenDone();
    this.closeAlert();
  }

  onPageCloseDone() {
    const { onAlertCloseDone } = this.props;
    onAlertCloseDone();
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
    const { children, direction, pageStatus, zIndex } = this.props;
    return (
      <Interpolation
        direction={direction}
        isAnimation
        pageStatusInit={PageStatusTypesEnum.CLOSE_DONE}
        pageStatus={pageStatus}
        onPageOpenDone={this.onPageOpenDone}
        onPageCloseDone={this.onPageCloseDone}
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

import React from 'react';
import { Interpolation, MobileNavigationView } from 'react-mobile-navigation-core';

const propTypes = {
  autoHideDuration: React.PropTypes.number,
  isShow: React.PropTypes.bool.isRequired,
  pageStatus: React.PropTypes.string,
  pageWidth: React.PropTypes.number.isRequired,
  zIndex: React.PropTypes.number.isRequired,
  render: React.PropTypes.func.isRequired,
  onAlertOpenDone: React.PropTypes.func.isRequired,
  onAlertCloseStart: React.PropTypes.func.isRequired,
  onAlertCloseDone: React.PropTypes.func.isRequired,
};

const defaultProps = {
  autoHideDuration: 2500,
  render: () => null,
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
    // do not close
  }

  closeAlertForce() {
    const { onAlertCloseDone } = this.props;
    onAlertCloseDone();
  }

  render() {
    const { isShow, pageStatus, pageWidth, zIndex, render } = this.props;
    return (
      <Interpolation
        isShow={isShow}
        pageStatus={pageStatus}
        onPageOpenDone={this.onPageOpenDone}
        onPageCloseDone={this.onPageCloseDone}
      >
        <MobileNavigationView pageWidth={pageWidth} zIndex={zIndex} >
          {render()}
        </MobileNavigationView>
      </Interpolation>
    );
  }
}

AlertBox.propTypes = propTypes;
AlertBox.defaultProps = defaultProps;

import React from 'react';
import {
  PageStatusTypesEnum,
  Interpolation,
  MobileNavigationView,
} from 'react-mobile-navigation-core';

const propTypes = {
  autoHideDuration: React.PropTypes.number,
  isShow: React.PropTypes.bool.isRequired,
  pageStatus: React.PropTypes.string,
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
    const { isShow, pageStatus, zIndex, render } = this.props;
    return (
      <Interpolation
        isAnimation
        isShow={isShow}
        pageStatusInit={PageStatusTypesEnum.CLOSE_DONE}
        pageStatus={pageStatus}
        onPageOpenDone={this.onPageOpenDone}
        onPageCloseDone={this.onPageCloseDone}
      >
        <MobileNavigationView zIndex={zIndex} >
          {render()}
        </MobileNavigationView>
      </Interpolation>
    );
  }
}

AlertBox.propTypes = propTypes;
AlertBox.defaultProps = defaultProps;

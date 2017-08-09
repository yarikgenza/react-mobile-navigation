import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Interpolation,
  MobileNavigationView,
  PageStatusTypesEnum,
} from 'react-mobile-navigation-core';

const propTypes = {
  autoHideDuration: PropTypes.number,
  isVisible: PropTypes.bool.isRequired,
  pageWidth: PropTypes.number.isRequired,
  render: PropTypes.func.isRequired,
  onOpenCallback: PropTypes.func,
  onCloseStart: PropTypes.func.isRequired,
  onCloseDone: PropTypes.func.isRequired,
  onCloseCallback: PropTypes.func,
};

const defaultProps = {
  autoHideDuration: 2500,
  render: () => null,
};

export default class AlertBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: props.isVisible ? PageStatusTypesEnum.OPEN_DONE : PageStatusTypesEnum.CLOSE_DONE,
    };
    this.timerAutoHideId = undefined;
    this.onPageOpenDone = this.onPageOpenDone.bind(this);
    this.onPageCloseDone = this.onPageCloseDone.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { isVisible } = this.props;
    if (isVisible === false && nextProps.isVisible === true) {
      this.onOpenStart();
    }
    if (isVisible === true && nextProps.isVisible === false) {
      this.onCloseStart();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerAutoHideId);
    this.closeAlertForce();
  }

  onOpenStart() {
    const { status } = this.state;
    // ignore opening attempts if not closed yet
    if (status !== PageStatusTypesEnum.CLOSE_DONE) {
      return;
    }
    this.setState(() => ({
      status: PageStatusTypesEnum.OPEN_START,
    }), () => {
      // force rendering in the next frame
      window.requestAnimationFrame(() => {
        this.setState(() => ({
          status: PageStatusTypesEnum.OPEN_PROCESSING,
        }));
      });
    });
  }

  onOpenDone() {
    this.setState(() => ({
      status: PageStatusTypesEnum.OPEN_DONE,
    }), () => {
      const { onOpenCallback } = this.props;
      if (isFunction(onOpenCallback)) {
        onOpenCallback();
      }
    });
  }

  onCloseStart() {
    this.setState(() => ({
      status: PageStatusTypesEnum.CLOSE_START,
    }), () => {
      // force rendering in the next frame
      window.requestAnimationFrame(() => {
        this.setState(() => ({
          status: PageStatusTypesEnum.CLOSE_PROCESSING,
        }));
      });
    });
  }

  onCloseDone() {
    const { onCloseDone } = this.props;
    onCloseDone();
    this.setState(() => ({
      status: PageStatusTypesEnum.CLOSE_DONE,
    }), () => {
      const { onCloseCallback } = this.props;
      if (isFunction(onCloseCallback)) {
        onCloseCallback();
      }
    });
  }

  onPageOpenDone() {
    this.onOpenDone();
    this.closeAlert();
  }

  onPageCloseDone() {
    this.onCloseDone();
  }

  closeAlert() {
    const { autoHideDuration, onCloseStart } = this.props;
    clearTimeout(this.timerAutoHideId);
    if (autoHideDuration > 0) {
      this.timerAutoHideId = setTimeout(() => {
        onCloseStart();
      }, autoHideDuration);
      return;
    }
    // do not close
  }

  closeAlertForce() {
    this.onCloseDone();
  }

  render() {
    const { pageWidth, render } = this.props;
    const { status } = this.state;
    const zIndex = status !== PageStatusTypesEnum.CLOSE_DONE ? 1001 : 0;
    return (
      <Interpolation
        isShow={status !== PageStatusTypesEnum.CLOSE_DONE}
        pageStatus={status}
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

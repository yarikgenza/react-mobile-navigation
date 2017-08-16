import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import React from 'react';
import { Interpolation } from 'react-mobile-navigation-core';

const propTypes = {
  autoHideDuration: PropTypes.number,
  isVisible: PropTypes.bool.isRequired,
  pageHeight: PropTypes.number.isRequired,
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
    this.timerAutoHideId = undefined;
    this.onPageOpenDone = this.onPageOpenDone.bind(this);
    this.onPageCloseDone = this.onPageCloseDone.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timerAutoHideId);
    this.closeAlertForce();
  }

  onPageOpenDone() {
    const { onOpenCallback } = this.props;
    this.closeAlert();
    if (isFunction(onOpenCallback)) {
      onOpenCallback();
    }
  }

  onPageCloseDone() {
    const { onCloseDone, onCloseCallback } = this.props;
    onCloseDone();
    if (isFunction(onCloseCallback)) {
      onCloseCallback();
    }
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
    const { onCloseDone } = this.props;
    onCloseDone();
  }

  render() {
    const { isVisible, pageHeight, pageWidth, render, onCloseStart } = this.props;
    return (
      <Interpolation
        isVisible={isVisible}
        pageHeight={pageHeight}
        pageWidth={pageWidth}
        onClose={onCloseStart}
        onPageOpenDone={this.onPageOpenDone}
        onPageCloseDone={this.onPageCloseDone}
      >
        {render()}
      </Interpolation>
    );
  }
}

AlertBox.propTypes = propTypes;
AlertBox.defaultProps = defaultProps;

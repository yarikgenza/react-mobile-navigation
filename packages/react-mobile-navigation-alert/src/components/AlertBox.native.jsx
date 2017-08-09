import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  autoHideDuration: PropTypes.number,
  // pageStatus: PropTypes.string,
  // pageWidth: PropTypes.number.isRequired,
  // zIndex: PropTypes.number.isRequired,
  render: PropTypes.func.isRequired,
  onAlertOpenDone: PropTypes.func.isRequired,
  onAlertCloseStart: PropTypes.func.isRequired,
  onAlertCloseDone: PropTypes.func.isRequired,
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
    const { render } = this.props;
    return render();
  }
}

AlertBox.propTypes = propTypes;
AlertBox.defaultProps = defaultProps;
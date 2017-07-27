import PropTypes from 'prop-types';
import React from 'react';
import {
  OPEN_DONE,
  OPEN_PROCESSING,
  CLOSE_PROCESSING,
  CLOSE_DONE,
} from '../constants/page-status-types';

const propTypes = {
  children: PropTypes.element.isRequired,
  isForce: PropTypes.bool,
  isShow: PropTypes.bool.isRequired,
  pageStatus: PropTypes.string.isRequired,
  onPageOpenDone: PropTypes.func.isRequired,
  onPageCloseDone: PropTypes.func.isRequired,
};

const defaultProps = {
  isForce: undefined,
};

export default class Interpolation extends React.Component {

  constructor(props) {
    super(props);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { pageStatus, onPageOpenDone, onPageCloseDone } = this.props;
    if (!newProps.isForce) {
      return;
    }
    if (pageStatus === CLOSE_DONE && newProps.pageStatus === OPEN_PROCESSING) {
      onPageOpenDone();
      return;
    }
    if (pageStatus === OPEN_DONE && newProps.pageStatus === CLOSE_PROCESSING) {
      // force rendering in the next frame
      window.requestAnimationFrame(() => {
        onPageCloseDone();
      });
      return;
    }
    return;
  }

  onTransitionEnd() {
    const { pageStatus, onPageOpenDone, onPageCloseDone } = this.props;
    if (pageStatus === CLOSE_PROCESSING) {
      onPageCloseDone();
      return;
    }
    if (pageStatus === OPEN_PROCESSING) {
      onPageOpenDone();
      return;
    }
    return;
  }

  render() {
    const { children, isForce, isShow, pageStatus } = this.props;
    return React.cloneElement(React.Children.only(children), {
      isForce,
      isShow,
      pageStatus,
      onTransitionEnd: this.onTransitionEnd,
    });
  }
}

Interpolation.propTypes = propTypes;
Interpolation.defaultProps = defaultProps;

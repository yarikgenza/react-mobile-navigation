import React from 'react';
import {
  BACK_ANIMATING_OUT_DONE,
  OPEN_DONE,
  OPEN_PROCESSING,
  CLOSE_PROCESSING,
  CLOSE_DONE,
} from '../constants/page-status-types';

const propTypes = {
  children: React.PropTypes.element.isRequired,
  isAnimation: React.PropTypes.bool.isRequired,
  isForce: React.PropTypes.bool,
  isShow: React.PropTypes.bool.isRequired,
  pageStatusInit: React.PropTypes.string.isRequired,
  pageStatus: React.PropTypes.string.isRequired,
  onPageOpenDone: React.PropTypes.func.isRequired,
  onPageCloseDone: React.PropTypes.func.isRequired,
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
    // with no animation
    if (!newProps.isForce) {
      return;
    }
    // open the page
    if (pageStatus === CLOSE_DONE && newProps.pageStatus === OPEN_DONE) {
      onPageOpenDone();
      return;
    }
    // close the page
    if (pageStatus === OPEN_DONE && newProps.pageStatus === CLOSE_DONE) {
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

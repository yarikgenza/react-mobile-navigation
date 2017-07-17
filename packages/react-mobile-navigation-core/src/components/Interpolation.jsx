import React from 'react';
import * as PageStatusTypesEnum from '../constants/page-status-types';

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

  componentDidMount() {
    const { isAnimation, isForce, onPageOpenDone } = this.props;
    // open with no animation
    if (isForce) {
      // page is always mounted with an OPEN_DONE status, so no need to check
      onPageOpenDone();
      return;
    }
    // open with animation
    if (isAnimation) {
      this.triggerPageOpenAnimation();
    }
  }

  componentWillReceiveProps(newProps) {
    const { pageStatus, onPageOpenDone, onPageCloseDone } = this.props;
    // with no animation
    if (newProps.isForce) {
      // open the page
      if (
        pageStatus === PageStatusTypesEnum.CLOSE_DONE &&
        newProps.pageStatus === PageStatusTypesEnum.OPEN_DONE
      ) {
        onPageOpenDone();
        return;
      }
      // close the page
      if (
        pageStatus === PageStatusTypesEnum.OPEN_DONE &&
        newProps.pageStatus === PageStatusTypesEnum.CLOSE_DONE
      ) {
        window.requestAnimationFrame(() => {
          onPageCloseDone();
        });
        return;
      }
      return;
    }
    // with animation
    if (
      pageStatus === PageStatusTypesEnum.OPEN_DONE &&
      newProps.pageStatus === PageStatusTypesEnum.BACK_ANIMATING_OUT_DONE
    ) {
      // hide the page
      return;
    }
    if (
      pageStatus === PageStatusTypesEnum.OPEN_DONE &&
      newProps.pageStatus === PageStatusTypesEnum.CLOSE_DONE
    ) {
      // close the page
      return;
    }
    if (
      pageStatus !== PageStatusTypesEnum.OPEN_DONE &&
      newProps.pageStatus === PageStatusTypesEnum.OPEN_DONE
    ) {
      // open the page
      this.triggerPageOpenAnimation();
      return;
    }
    return;
  }

  onTransitionEnd() {
    const { pageStatus, onPageOpenDone, onPageCloseDone } = this.props;
    if (pageStatus === PageStatusTypesEnum.CLOSE_DONE) {
      onPageCloseDone();
      return;
    }
    if (pageStatus === PageStatusTypesEnum.OPEN_DONE) {
      onPageOpenDone();
      return;
    }
    return;
  }

  triggerPageOpenAnimation() { }

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

import React from 'react';
import * as PageStatusTypesEnum from '../constants/page-status-types';
import { getPositionFromStatus } from '../utils/position-api';

const propTypes = {
  children: React.PropTypes.element.isRequired,
  direction: React.PropTypes.string,
  isAnimation: React.PropTypes.bool.isRequired,
  isShow: React.PropTypes.bool.isRequired,
  pageStatusInit: React.PropTypes.string.isRequired,
  pageStatus: React.PropTypes.string.isRequired,
  onPageOpenDone: React.PropTypes.func.isRequired,
  onPageCloseDone: React.PropTypes.func.isRequired,
};

const defaultProps = {};

export default class Interpolation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      position: getPositionFromStatus(props.pageStatusInit),
    };
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
  }

  componentDidMount() {
    const { direction, isAnimation, onPageOpenDone } = this.props;
    // open with no animation
    if (direction === undefined) {
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
    if (newProps.direction === undefined) {
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
        onPageCloseDone();
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
      this.setState(() => ({
        position: getPositionFromStatus(PageStatusTypesEnum.BACK_ANIMATING_OUT_DONE),
      }));
      return;
    }
    if (
      pageStatus === PageStatusTypesEnum.OPEN_DONE &&
      newProps.pageStatus === PageStatusTypesEnum.CLOSE_DONE
    ) {
      // close the page
      this.setState(() => ({
        position: getPositionFromStatus(PageStatusTypesEnum.CLOSE_DONE),
      }));
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

  triggerPageOpenAnimation() {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        this.setState(() => ({
          position: getPositionFromStatus(PageStatusTypesEnum.OPEN_DONE),
        }));
      });
    });
  }

  render() {
    const { children, isShow, pageStatus } = this.props;
    const { position } = this.state;
    return React.cloneElement(React.Children.only(children), {
      isShow,
      pageStatus,
      position,
      onTransitionEnd: this.onTransitionEnd,
    });
  }
}

Interpolation.propTypes = propTypes;
Interpolation.defaultProps = defaultProps;

import React from 'react';
import * as PageStatusTypesEnum from '../constants/page-status-types';
import { getSpringValue } from '../utils/visability-statuses';

const propTypes = {
  children: React.PropTypes.element.isRequired,
  direction: React.PropTypes.string,
  isAnimation: React.PropTypes.bool.isRequired,
  pageStatusInit: React.PropTypes.string.isRequired,
  pageStatus: React.PropTypes.string.isRequired,
  onPageActivityEnd: React.PropTypes.func.isRequired,
};

const defaultProps = {};

export default class Interpolation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isShow: true,
      translateValue: getSpringValue(props.pageStatusInit),
    };
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
  }

  componentDidMount() {
    const { direction, isAnimation, onPageActivityEnd } = this.props;
    // open with no animation
    if (direction === undefined) {
      // page is always mounted with an OPEN_DONE status, so no need to check
      onPageActivityEnd();
    }
    // open with animation
    //  isShow is already true, so no need to set
    if (isAnimation) {
      this.triggerPageOpenAnimation();
    }
  }

  componentWillReceiveProps(newProps) {
    // with no animation
    if (newProps.direction === undefined) {
      const { pageStatus, onPageActivityEnd } = this.props;
      // open the page
      if (this.isPageOpen(pageStatus, newProps.pageStatus)) {
        this.setState(() => ({
          isShow: true,
        }));
        onPageActivityEnd();
        return;
      }
      // close the page
      if (this.isPageClose(pageStatus, newProps.pageStatus)) {
        onPageActivityEnd();
        return;
      }
      return;
    }
    // with animation
    if (newProps.pageStatus === PageStatusTypesEnum.BACK_ANIMATING_OUT_DONE) {
      // open the page
      this.setState(() => ({
        translateValue: getSpringValue(PageStatusTypesEnum.BACK_ANIMATING_OUT_DONE),
      }));
      return;
    }
    if (newProps.pageStatus === PageStatusTypesEnum.CLOSE_DONE) {
      // close the page
      this.setState(() => ({
        translateValue: getSpringValue(PageStatusTypesEnum.CLOSE_DONE),
      }));
      return;
    }
    this.setState(() => ({
      isShow: true,
    }));
    this.triggerPageOpenAnimation();
  }

  onTransitionEnd() {
    const { pageStatus, onPageActivityEnd } = this.props;
    if (pageStatus === PageStatusTypesEnum.CLOSE_DONE) {
      this.setState(() => ({
        isShow: false,
      }));
    }
    onPageActivityEnd();
  }

  isPageOpen(statusBefore, statusAfter) {
    return (
      statusBefore === PageStatusTypesEnum.CLOSE_DONE &&
      statusAfter === PageStatusTypesEnum.OPEN_DONE
    );
  }

  isPageClose(statusBefore, statusAfter) {
    return (
      statusBefore === PageStatusTypesEnum.OPEN_DONE &&
      statusAfter === PageStatusTypesEnum.CLOSE_DONE
    );
  }

  triggerPageOpenAnimation() {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        this.setState(() => ({
          translateValue: getSpringValue(PageStatusTypesEnum.OPEN_DONE),
        }));
      });
    });
  }

  render() {
    const { children, pageStatus } = this.props;
    const { isShow, translateValue } = this.state;
    return React.cloneElement(React.Children.only(children), {
      isShow,
      pageStatus,
      translateValue,
      onTransitionEnd: this.onTransitionEnd,
    });
  }
}

Interpolation.propTypes = propTypes;
Interpolation.defaultProps = defaultProps;

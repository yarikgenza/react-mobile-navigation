import React from 'react';
import * as PageStatusTypesEnum from '../constants/page-status-types';
import { getSpringValue } from '../utils/visability-statuses';

const propTypes = {
  children: React.PropTypes.element.isRequired,
  direction: React.PropTypes.string,
  isAnimation: React.PropTypes.bool.isRequired,
  pageStatus: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired,
  onPageActivityEnd: React.PropTypes.func.isRequired,
};

const defaultProps = {};

export default class Interpolation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isShow: true,
      translateValue: getSpringValue(props.status),
    };
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
  }

  componentDidMount() {
    const { direction, isAnimation, pageStatus } = this.props;
    // no animation
    if (direction === undefined) {
      const { onPageActivityEnd } = this.props;
      if (pageStatus === PageStatusTypesEnum.OPEN_DONE) {
        onPageActivityEnd();
      }
    }
    // is animation
    if (isAnimation) {
      requestAnimationFrame(() => {
        this.setState(() => ({
          translateValue: getSpringValue(PageStatusTypesEnum.OPEN_DONE),
        }));
      });
    }
  }

  componentWillReceiveProps(newProps) {
    // no animation
    if (newProps.direction === undefined) {
      const { pageStatus, onPageActivityEnd } = this.props;
      // open the page
      if (
        pageStatus === PageStatusTypesEnum.CLOSE_DONE &&
        newProps.pageStatus === PageStatusTypesEnum.OPEN_DONE
      ) {
        this.setState(() => ({
          isShow: true,
        }));
        onPageActivityEnd();
      }
      // close the page
      if (
        pageStatus === PageStatusTypesEnum.OPEN_DONE &&
        newProps.pageStatus === PageStatusTypesEnum.CLOSE_DONE
      ) {
        onPageActivityEnd();
      }
      return;
    }
    // is animation
    if (newProps.pageStatus === PageStatusTypesEnum.CLOSE_DONE) {
      this.setState(() => ({
        translateValue: getSpringValue(PageStatusTypesEnum.CLOSE_DONE),
      }));
      return;
    }
    if (newProps.pageStatus === PageStatusTypesEnum.BACK_ANIMATING_OUT_DONE) {
      this.setState(() => ({
        translateValue: getSpringValue(PageStatusTypesEnum.BACK_ANIMATING_OUT_DONE),
      }));
      return;
    }
    this.setState(() => ({
      isShow: true,
    }));
    requestAnimationFrame(() => {
      this.setState(() => ({
        translateValue: getSpringValue(PageStatusTypesEnum.OPEN_DONE),
      }));
    });
  }

  onTransitionEnd() {
    const { pageStatus } = this.props;
    if (pageStatus === PageStatusTypesEnum.CLOSE_DONE) {
      this.setState(() => ({
        isShow: false,
      }));
    }
    const { onPageActivityEnd } = this.props;
    onPageActivityEnd();
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

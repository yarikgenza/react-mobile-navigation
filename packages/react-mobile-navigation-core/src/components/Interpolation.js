import React from 'react';
import PageStatusTypesEnum from '../constants/page-status-types';
import { getSpringValue } from '../utils/visability-statuses';

const propTypes = {
  children: React.PropTypes.element.isRequired,
  isAction: React.PropTypes.bool.isRequired,
  pageState: React.PropTypes.object.isRequired,
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
    const { isAction } = this.props;
    if (isAction) {
      requestAnimationFrame(() => {
        this.setState(() => ({
          translateValue: getSpringValue(PageStatusTypesEnum.OPEN_DONE),
        }));
      });
    }
  }

  componentWillReceiveProps(newProps) {
    // with no animation
    if (newProps.pageState.direction === undefined) {
      const { onPageActivityEnd } = this.props;
      if (
        this.props.pageState.status !== PageStatusTypesEnum.OPEN_DONE &&
        newProps.pageState.status === PageStatusTypesEnum.OPEN_DONE
      ) {
        // onPageActivityEnd();
        // return;
      }
      if (
        this.props.pageState.status !== PageStatusTypesEnum.CLOSE_DONE &&
        newProps.pageState.status === PageStatusTypesEnum.CLOSE_DONE
      ) {
        onPageActivityEnd();
        // return;
      }
      // return;
    }
    // with animation
    if (newProps.pageState.status !== PageStatusTypesEnum.OPEN_DONE) {
      this.setState(() => ({
        translateValue: getSpringValue(newProps.pageState.status),
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
    const { pageState } = this.props;
    if (pageState.status === PageStatusTypesEnum.CLOSE_DONE) {
      this.setState(() => ({
        isShow: false,
      }));
    }
    const { onPageActivityEnd } = this.props;
    onPageActivityEnd();
  }

  render() {
    const { children, pageState } = this.props;
    const { isShow, translateValue } = this.state;
    return React.cloneElement(React.Children.only(children), {
      isShow,
      pageState,
      translateValue,
      onTransitionEnd: this.onTransitionEnd,
    });
  }
}

Interpolation.propTypes = propTypes;
Interpolation.defaultProps = defaultProps;

import React from 'react';
import { Motion, spring } from 'react-motion';
import { isPageOpen } from '../utils/visability-statuses';
import { fadeSpringConfig } from '../utils/spring-configs';

const propTypes = {
  setPageStatus: React.PropTypes.any,
  pageActionTransitionEndHandler: React.PropTypes.any,
  pageState: React.PropTypes.any,
  children: React.PropTypes.element.isRequired,
};

const defaultProps = {};

const INTERP_BEGIN = 0;
const INTERP_END = 100;

export default class Interpolation extends React.Component {

  componentDidMount() {
    this.props.setPageStatus();
  }

  componentDidUpdate() {
    this.props.setPageStatus();
  }

  render() {
    const { status } = this.props.pageState;
    const springValue = isPageOpen(status) ? INTERP_BEGIN : INTERP_END;
    return (
      <Motion
        style={{ translateValue: spring(springValue, fadeSpringConfig) }}
        onRest={this.props.pageActionTransitionEndHandler}
      >
        {(interp) => (
          React.cloneElement(React.Children.only(this.props.children), {
            translateValue: interp.translateValue,
            pageState: this.props.pageState,
          })
        )}
      </Motion>
    );
  }
}

Interpolation.propTypes = propTypes;
Interpolation.defaultProps = defaultProps;

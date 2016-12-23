import React from 'react';
import { Motion, spring } from 'react-motion';
import { fadeSpringConfig } from '../utils/spring-configs';
import { getSpringValue } from '../utils/visability-statuses';

const propTypes = {
  children: React.PropTypes.element.isRequired,
  pageState: React.PropTypes.object.isRequired,
  setPageStatus: React.PropTypes.func.isRequired,
  onPageTransitionEnd: React.PropTypes.func.isRequired,
};

const defaultProps = {};

export default class Interpolation extends React.Component {

  componentDidMount() {
    this.props.setPageStatus();
  }

  componentDidUpdate() {
    this.props.setPageStatus();
  }

  render() {
    const { children, pageState, onPageTransitionEnd } = this.props;
    const { status } = pageState;
    const springValue = getSpringValue(status);
    return (
      <Motion
        style={{ translateValue: spring(springValue, fadeSpringConfig) }}
        onRest={onPageTransitionEnd}
      >
        {({ translateValue }) => (
          React.cloneElement(React.Children.only(children), {
            pageState,
            translateValue,
          })
        )}
      </Motion>
    );
  }
}

Interpolation.propTypes = propTypes;
Interpolation.defaultProps = defaultProps;

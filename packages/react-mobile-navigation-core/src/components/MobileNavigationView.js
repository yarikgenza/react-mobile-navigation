import React from 'react';
import MobileNavigationViewRender from '../components-styled/MobileNavigationViewRender';
import getTranslate3dByDirection from '../utils/animation-position';

const propTypes = {
  children: React.PropTypes.element.isRequired,
  direction: React.PropTypes.string.isRequired,
  isShow: React.PropTypes.bool,
  translateValue: React.PropTypes.number,
  zIndex: React.PropTypes.number.isRequired,
  onTransitionEnd: React.PropTypes.func,
};

const defaultProps = {};

const MobileNavigationView = ({
  children,
  direction,
  isShow,
  translateValue,
  zIndex,
  onTransitionEnd,
}) => (
  isShow ? (
    <MobileNavigationViewRender
      styleIndex={zIndex}
      styleTranslate={getTranslate3dByDirection(direction, translateValue)}
      onTransitionEnd={onTransitionEnd}
    >
      {children}
    </MobileNavigationViewRender>
  ) : null
);

MobileNavigationView.propTypes = propTypes;
MobileNavigationView.defaultProps = defaultProps;

export default MobileNavigationView;

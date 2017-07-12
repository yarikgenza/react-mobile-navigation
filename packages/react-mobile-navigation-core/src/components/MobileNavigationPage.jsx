import React from 'react';
import MobileNavigationPageRender from '../components-styled/MobileNavigationPageRender';
import getTranslate3dByDirection from '../utils/style-api';

const propTypes = {
  children: React.PropTypes.element.isRequired,
  direction: React.PropTypes.string,
  isShow: React.PropTypes.bool,
  position: React.PropTypes.number,
  zIndex: React.PropTypes.number,
  onTransitionEnd: React.PropTypes.func,
};

const defaultProps = {
  position: undefined,
};

const MobileNavigationPage = ({
  children,
  direction,
  isShow,
  position,
  zIndex,
  onTransitionEnd,
  ...props,
}) => (
  isShow ? (
    <MobileNavigationPageRender
      styleIndex={zIndex}
      styleTranslate={getTranslate3dByDirection(direction, position)}
      onTransitionEnd={onTransitionEnd}
    >
      {React.cloneElement(React.Children.only(children), props)}
    </MobileNavigationPageRender>
  ) : null
);

MobileNavigationPage.propTypes = propTypes;
MobileNavigationPage.defaultProps = defaultProps;

export default MobileNavigationPage;

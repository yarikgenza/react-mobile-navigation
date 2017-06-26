import React from 'react';
import MobileNavigationViewRender from '../components-styled/MobileNavigationViewRender';
import getTranslate3dByDirection from '../utils/animation-position';

const propTypes = {
  children: React.PropTypes.element.isRequired,
  pageState: React.PropTypes.object,
  translateValue: React.PropTypes.number,
};

const defaultProps = {};

const MobileNavigationView = ({ children, pageState, translateValue }) => {
  const { status, zIndex, direction } = pageState;
  return (
    <MobileNavigationViewRender
      styleIndex={zIndex}
      styleTranslate={getTranslate3dByDirection(status, direction, translateValue)}
    >
      {children}
    </MobileNavigationViewRender>
  );
};

MobileNavigationView.propTypes = propTypes;
MobileNavigationView.defaultProps = defaultProps;

export default MobileNavigationView;

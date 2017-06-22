import React from 'react';
import {
  MobileNavigationViewRender,
  getTranslate3dByDirection,
} from 'react-mobile-navigation-core';

const propTypes = {
  children: React.PropTypes.element.isRequired,
  pageState: React.PropTypes.object,
  translateValue: React.PropTypes.number,
};

const defaultProps = {};

const MobileNavigationView = ({
  children,
  pageState,
  translateValue,
}) => {
  const { status, zIndex, direction } = pageState;
  return (
    <MobileNavigationViewRender
      zIndex={zIndex}
      style={Object.assign(
        {},
        getTranslate3dByDirection(status, direction, translateValue),
        { zIndex }
      )}
    >
      {children}
    </MobileNavigationViewRender>
  );
};

MobileNavigationView.propTypes = propTypes;
MobileNavigationView.defaultProps = defaultProps;

export default MobileNavigationView;

import React from 'react';
import MobileNavigationViewRender from '../components-styled/MobileNavigationViewRender';
import * as DirectionEnum from '../constants/direction-types';
import getTranslate3dByDirection from '../utils/style-api';
import { getPositionFromStatus } from '../utils/position-api';

const propTypes = {
  children: React.PropTypes.element,
  isForce: React.PropTypes.bool,
  isShow: React.PropTypes.bool,
  pageStatus: React.PropTypes.string,
  zIndex: React.PropTypes.number.isRequired,
  onTransitionEnd: React.PropTypes.func,
};

const defaultProps = {
  isForce: undefined,
  children: undefined,
  pageStatus: undefined,
};

const MobileNavigationView = ({
  children,
  isForce,
  isShow,
  pageStatus,
  zIndex,
  onTransitionEnd,
}) => (
  <MobileNavigationViewRender
    styleIndex={zIndex}
    styleTranslate={
      getTranslate3dByDirection(
        DirectionEnum.VERTICAL,
        isForce,
        getPositionFromStatus(pageStatus)
      )
    }
    onTransitionEnd={onTransitionEnd}
  >
    {isShow ? children : null}
  </MobileNavigationViewRender>
);

MobileNavigationView.propTypes = propTypes;
MobileNavigationView.defaultProps = defaultProps;

export default MobileNavigationView;

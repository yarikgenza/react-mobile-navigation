import React from 'react';
import MobileNavigationViewRender from '../components-styled/MobileNavigationViewRender';
import * as DirectionEnum from '../constants/direction-types';
import getTranslate3dByDirection, { MODAL_MARGIN } from '../utils/style-api';
import { getPositionFromStatus } from '../utils/position-api';

const propTypes = {
  children: React.PropTypes.element,
  isForce: React.PropTypes.bool,
  isShow: React.PropTypes.bool,
  pageStatus: React.PropTypes.string,
  pageWidth: React.PropTypes.number.isRequired,
  zIndex: React.PropTypes.number.isRequired,
  onTransitionEnd: React.PropTypes.func,
};

const defaultProps = {
  children: undefined,
  isForce: undefined,
  pageStatus: undefined,
};

const MobileNavigationView = ({
  children,
  isForce,
  isShow,
  pageStatus,
  pageWidth,
  zIndex,
  onTransitionEnd,
}) => {
  const pageWidthNew = pageWidth - (2 * MODAL_MARGIN);
  return (
    <MobileNavigationViewRender
      pageLeft={MODAL_MARGIN}
      pageWidth={pageWidthNew}
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
};

MobileNavigationView.propTypes = propTypes;
MobileNavigationView.defaultProps = defaultProps;

export default MobileNavigationView;

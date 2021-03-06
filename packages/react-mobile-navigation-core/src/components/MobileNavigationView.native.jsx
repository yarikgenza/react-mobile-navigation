import PropTypes from 'prop-types';
import React from 'react';
import MobileNavigationViewRender from '../components-styled/MobileNavigationViewRender';
import { VERTICAL } from '../constants/direction-types';
import getTranslate3dByDirection, { MODAL_MARGIN } from '../utils/style-api';
import { getPositionFromStatus } from '../utils/position-api';

const propTypes = {
  children: PropTypes.element,
  isForce: PropTypes.bool,
  isShow: PropTypes.bool,
  pageStatus: PropTypes.string,
  pageWidth: PropTypes.number.isRequired,
  zIndex: PropTypes.number.isRequired,
  onTransitionEnd: PropTypes.func,
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
          VERTICAL,
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

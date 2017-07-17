import React from 'react';
import MobileNavigationPageRender from '../components-styled/MobileNavigationPageRender';
import * as DirectionEnum from '../constants/direction-types';
import getTranslate3dByDirection from '../utils/style-api';
import { getPositionFromStatus } from '../utils/position-api';
import { ORIGINAL } from '../constants/page-types';

const propTypes = {
  children: React.PropTypes.element.isRequired,
  isForce: React.PropTypes.bool,
  isShow: React.PropTypes.bool,
  pageStatus: React.PropTypes.string,
  zIndex: React.PropTypes.number,
  onTransitionEnd: React.PropTypes.func,
};

const defaultProps = {
  isForce: undefined,
  pageStatus: undefined,
};

const MobileNavigationPage = ({
  children,
  isForce,
  isShow,
  pageStatus,
  zIndex,
  onTransitionEnd,
  ...props,
}) => (
  <MobileNavigationPageRender
    styleIndex={zIndex}
    styleTranslate={
      getTranslate3dByDirection(
        DirectionEnum.HORIZONTAL,
        isForce,
        getPositionFromStatus(pageStatus)
      )
    }
    onTransitionEnd={onTransitionEnd}
  >
    {isShow ? React.cloneElement(React.Children.only(children), props) : null}
  </MobileNavigationPageRender>
);

MobileNavigationPage.propTypes = propTypes;
MobileNavigationPage.defaultProps = defaultProps;
MobileNavigationPage.pageType = ORIGINAL;

export default MobileNavigationPage;

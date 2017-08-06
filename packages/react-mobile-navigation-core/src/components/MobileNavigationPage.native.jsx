import PropTypes from 'prop-types';
import React from 'react';
import MobileNavigationPageRender from '../components-styled/MobileNavigationPageRender';
import { HORIZONTAL } from '../constants/direction-types';
import { ORIGINAL } from '../constants/page-types';
import getTranslate3dByDirection from '../utils/style-api';
import { getPositionFromStatus } from '../utils/position-api';

const propTypes = {
  children: PropTypes.element.isRequired,
  isForce: PropTypes.bool,
  isShow: PropTypes.bool,
  pageStatus: PropTypes.string,
  zIndex: PropTypes.number,
  onTransitionEnd: PropTypes.func,
};

const defaultProps = {
  isForce: undefined,
  pageStatus: undefined,
};

const MobileNavigationPage = ({
  children,
  isForce,
  isShow,
  zIndex,
  onTransitionEnd,
  ...props,
}) => (
  <MobileNavigationPageRender
    styleIndex={zIndex}
    styleTranslate={
      getTranslate3dByDirection(
        HORIZONTAL,
        isForce,
        getPositionFromStatus(props.pageStatus)
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

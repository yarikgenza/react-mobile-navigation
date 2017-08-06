import PropTypes from 'prop-types';
import React from 'react';
import MobileNavigationPageRender from '../components-styled/MobileNavigationPageRender';
import BackgroundActiveRender from '../components-styled/BackgroundActiveRender';
import ContentRender from '../components-styled/ContentRender';
import { VERTICAL } from '../constants/direction-types';
import { getModalPositionFromStatus } from '../utils/position-api';
import getTranslate3dByDirection from '../utils/style-api';

const propTypes = {
  children: PropTypes.element,
  isForce: PropTypes.bool,
  isShow: PropTypes.bool,
  pageLeft: PropTypes.number.isRequired,
  pageStatus: PropTypes.string,
  pageWidth: PropTypes.number.isRequired,
  zIndex: PropTypes.number.isRequired,
  onShadowClick: PropTypes.func,
  onTransitionEnd: PropTypes.func,
};

const defaultProps = {
  children: undefined,
  isForce: undefined,
  isShow: undefined,
  pageStatus: undefined,
  onShadowClick: undefined,
  onTransitionEnd: undefined,
};

const MobileNavigationShadowPage = ({
  children,
  isForce,
  isShow,
  pageStatus,
  pageLeft,
  pageWidth,
  zIndex,
  onShadowClick,
  onTransitionEnd,
}) => {
  const position = getModalPositionFromStatus(pageStatus);
  return (
    <MobileNavigationPageRender styleIndex={zIndex} >
      <BackgroundActiveRender
        isForce={isForce}
        styleBackdropFilter={`blur(${2 * (1 - position / 100)}px)`}
        styleOpacity={0.2 * (1 - position / 100)}
        onClick={onShadowClick}
      />
      <ContentRender
        pageLeft={pageLeft}
        pageWidth={pageWidth}
        styleTranslate={getTranslate3dByDirection(VERTICAL, isForce, position)}
        onTransitionEnd={onTransitionEnd}
      >
        {isShow ? children : null}
      </ContentRender>
    </MobileNavigationPageRender>
  );
};

MobileNavigationShadowPage.propTypes = propTypes;
MobileNavigationShadowPage.defaultProps = defaultProps;

export default MobileNavigationShadowPage;

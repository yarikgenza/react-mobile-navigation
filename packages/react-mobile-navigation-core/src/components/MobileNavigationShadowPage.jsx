import React from 'react';
import MobileNavigationPageRender from '../components-styled/MobileNavigationPageRender';
import BackgroundActiveRender from '../components-styled/BackgroundActiveRender';
import ContentRender from '../components-styled/ContentRender';
import { getModalPositionFromStatus } from '../utils/position-api';
import getTranslate3dByDirection from '../utils/style-api';

const propTypes = {
  children: React.PropTypes.element,
  direction: React.PropTypes.string.isRequired,
  isForce: React.PropTypes.bool,
  isShow: React.PropTypes.bool,
  pageStatus: React.PropTypes.string,
  zIndex: React.PropTypes.number.isRequired,
  onShadowClick: React.PropTypes.func,
  onTransitionEnd: React.PropTypes.func,
};

const defaultProps = {
  isForce: undefined,
};

const MobileNavigationShadowPage = ({
  children,
  direction,
  isForce,
  isShow,
  pageStatus,
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
        styleTranslate={getTranslate3dByDirection(direction, isForce, position)}
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

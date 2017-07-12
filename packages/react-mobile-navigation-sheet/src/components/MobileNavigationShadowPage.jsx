import React from 'react';
import {
  getTranslate3dByDirection,
  MobileNavigationPageRender,
} from 'react-mobile-navigation-core';
import BackgroundActiveRender from '../components-styled/BackgroundActiveRender';
import ContentRender from '../components-styled/ContentRender';

const propTypes = {
  children: React.PropTypes.element,
  direction: React.PropTypes.string.isRequired,
  isShow: React.PropTypes.bool,
  position: React.PropTypes.number,
  zIndex: React.PropTypes.number.isRequired,
  onShadowClick: React.PropTypes.func,
  onTransitionEnd: React.PropTypes.func,
};

const defaultProps = {};

const MobileNavigationShadowPage = ({
  children,
  direction,
  isShow,
  position,
  zIndex,
  onShadowClick,
  onTransitionEnd,
}) => (
  isShow ? (
    <MobileNavigationPageRender styleIndex={zIndex} >
      <BackgroundActiveRender
        styleOpacity={0.3 * (1 - position / 100)}
        onClick={onShadowClick}
      />
      <ContentRender
        styleTranslate={getTranslate3dByDirection(direction, position)}
        onTransitionEnd={onTransitionEnd}
      >
        {children}
      </ContentRender>
    </MobileNavigationPageRender>
  ) : null
);

MobileNavigationShadowPage.propTypes = propTypes;
MobileNavigationShadowPage.defaultProps = defaultProps;

export default MobileNavigationShadowPage;

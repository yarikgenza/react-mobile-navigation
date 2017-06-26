import React from 'react';
import {
  getTranslate3dByDirection,
  MobileNavigationPageRender,
} from 'react-mobile-navigation-core';
import BackgroundActiveRender from '../components-styled/BackgroundActiveRender';
import ContentRender from '../components-styled/ContentRender';
import { getDarkBackgroundStyle } from '../utils/shadow-page-styles';

const propTypes = {
  children: React.PropTypes.element,
  pageState: React.PropTypes.object,
  translateValue: React.PropTypes.number,
  onShadowClick: React.PropTypes.func,
};

const defaultProps = {};

const MobileNavigationShadowPage = ({ children, pageState, translateValue, onShadowClick }) => {
  const { direction, status, zIndex } = pageState;
  return (
    <MobileNavigationPageRender styleIndex={zIndex} >
      <BackgroundActiveRender
        style={getDarkBackgroundStyle(status, translateValue)}
        onClick={onShadowClick}
      />
      <ContentRender styleTranslate={getTranslate3dByDirection(status, direction, translateValue)} >
        {children}
      </ContentRender>
    </MobileNavigationPageRender>
  );
};

MobileNavigationShadowPage.propTypes = propTypes;
MobileNavigationShadowPage.defaultProps = defaultProps;

export default MobileNavigationShadowPage;

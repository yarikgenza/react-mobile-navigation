import React from 'react';
import {
  MobileNavigationPageRender,
  getTranslate3dByDirection,
} from 'react-mobile-navigation-core';

const propTypes = {
  children: React.PropTypes.element.isRequired,
  pageId: React.PropTypes.any,
  pageState: React.PropTypes.any,
  pageHeight: React.PropTypes.number,
  pageWidth: React.PropTypes.number,
  pagingActions: React.PropTypes.object,
  pagingCallbacks: React.PropTypes.object,
  stackId: React.PropTypes.any,
  translateValue: React.PropTypes.number,
};

const defaultProps = {};

const MobileNavigationPage = ({
  children,
  pageHeight,
  pageId,
  pageState,
  pageWidth,
  pagingActions,
  pagingCallbacks,
  stackId,
  translateValue,
}) => {
  const { status, zIndex, direction } = pageState;
  const transformStyle = getTranslate3dByDirection(status, direction, translateValue);
  const standardPageStyle = Object.assign({ zIndex }, transformStyle);
  return (
    <MobileNavigationPageRender style={standardPageStyle} >
      {React.cloneElement(React.Children.only(children), {
        pageHeight,
        pageId,
        pageState,
        pageWidth,
        pagingActions,
        pagingCallbacks,
        stackId,
      })}
    </MobileNavigationPageRender>
  );
};

MobileNavigationPage.propTypes = propTypes;
MobileNavigationPage.defaultProps = defaultProps;

export default MobileNavigationPage;

import React from 'react';
import {
  MobileNavigationPageRender,
  getTranslate3dByDirection,
} from 'react-mobile-navigation-core';

const propTypes = {
  alertOpen: React.PropTypes.func,
  children: React.PropTypes.element.isRequired,
  pageId: React.PropTypes.any,
  pageState: React.PropTypes.object,
  pageHeight: React.PropTypes.number,
  pageWidth: React.PropTypes.number,
  pagingActions: React.PropTypes.object,
  pagingCallbacks: React.PropTypes.object,
  stackId: React.PropTypes.any,
  translateValue: React.PropTypes.number,
};

const defaultProps = {};

const MobileNavigationPage = ({
  alertOpen,
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
  return (
    <MobileNavigationPageRender
      zIndex={zIndex}
      style={Object.assign(
        {},
        getTranslate3dByDirection(status, direction, translateValue),
        { zIndex }
      )}
    >
      {React.cloneElement(React.Children.only(children), {
        alertOpen,
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

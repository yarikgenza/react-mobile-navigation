import React from 'react';
import MobileNavigationPageRender from '../components-styled/MobileNavigationPageRender';
import getTranslate3dByDirection from '../utils/animation-position';

const propTypes = {
  children: React.PropTypes.element.isRequired,
  pageState: React.PropTypes.object,
  translateValue: React.PropTypes.number,
};

const defaultProps = {
  pageState: undefined,
  translateValue: undefined,
};

const MobileNavigationPage = ({ children, pageState, translateValue, ...props }) => {
  const { status, zIndex, direction } = pageState;
  return (
    <MobileNavigationPageRender
      styleIndex={zIndex}
      styleTranslate={getTranslate3dByDirection(status, direction, translateValue)}
    >
      {React.cloneElement(React.Children.only(children), {
        pageState,
        ...props,
      })}
    </MobileNavigationPageRender>
  );
};

MobileNavigationPage.propTypes = propTypes;
MobileNavigationPage.defaultProps = defaultProps;

export default MobileNavigationPage;

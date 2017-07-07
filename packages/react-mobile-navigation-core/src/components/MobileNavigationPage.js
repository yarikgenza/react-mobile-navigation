import React from 'react';
import MobileNavigationPageRender from '../components-styled/MobileNavigationPageRender';
import getTranslate3dByDirection from '../utils/animation-position';

const propTypes = {
  children: React.PropTypes.element.isRequired,
  direction: React.PropTypes.string,
  isShow: React.PropTypes.bool,
  pageState: React.PropTypes.object,
  translateValue: React.PropTypes.number,
  zIndex: React.PropTypes.number,
  onTransitionEnd: React.PropTypes.func,
};

const defaultProps = {
  pageState: undefined,
  translateValue: undefined,
};

const MobileNavigationPage = ({
  children,
  direction,
  isShow,
  pageState,
  translateValue,
  zIndex,
  onTransitionEnd,
  ...props,
}) => (
  isShow ? (
    <MobileNavigationPageRender
      styleIndex={zIndex}
      styleTranslate={getTranslate3dByDirection(direction, translateValue)}
      onTransitionEnd={onTransitionEnd}
    >
      {React.cloneElement(React.Children.only(children), {
        pageState,
        ...props,
      })}
    </MobileNavigationPageRender>
  ) : null
);

MobileNavigationPage.propTypes = propTypes;
MobileNavigationPage.defaultProps = defaultProps;

export default MobileNavigationPage;

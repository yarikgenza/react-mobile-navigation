import React from 'react';
import { getTranslate3dByDirection, BASE_CONTAINER_STYLE } from 'react-mobile-navigation-core';
import StandardPageWrapper from '../components-styled/StandardPageWrapper';

const propTypes = {
  children: React.PropTypes.element.isRequired,
  pageId: React.PropTypes.any,
  pageState: React.PropTypes.any,
  pageHeight: React.PropTypes.number,
  pageWidth: React.PropTypes.number,
  pagingActions: React.PropTypes.any,
  stackId: React.PropTypes.any,
  translateValue: React.PropTypes.number,
};

const defaultProps = {};

const StandardPageComponent = ({
  translateValue,
  pageState,
  children,
  stackId,
  pageId,
  pagingActions,
  pageHeight,
  pageWidth,
}) => {
  const { status, zIndex, direction } = pageState;
  const transform = getTranslate3dByDirection(status, direction, translateValue);
  const standardPageStyle = Object.assign({}, BASE_CONTAINER_STYLE, {
    zIndex,
  }, transform);
  return (
    <StandardPageWrapper style={standardPageStyle} >
      {React.cloneElement(React.Children.only(children), {
        pageState,
        stackId,
        pageId,
        pagingActions,
        pageHeight,
        pageWidth,
      })}
    </StandardPageWrapper>
  );
};

StandardPageComponent.propTypes = propTypes;
StandardPageComponent.defaultProps = defaultProps;

export default StandardPageComponent;

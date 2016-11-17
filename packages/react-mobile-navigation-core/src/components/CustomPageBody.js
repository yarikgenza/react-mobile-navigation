import React from 'react';
import CustomPageBodyWrapper from '../components-styled/CustomPageBodyWrapper';

const propTypes = {
  zIndex: React.PropTypes.number,
  children: React.PropTypes.any,
};

const defaultProps = {};

const CustomPageBody = ({ zIndex, children }) => (
  <CustomPageBodyWrapper style={{ zIndex }} >
    {children}
  </CustomPageBodyWrapper>
);

CustomPageBody.propTypes = propTypes;
CustomPageBody.defaultProps = defaultProps;

export default CustomPageBody;

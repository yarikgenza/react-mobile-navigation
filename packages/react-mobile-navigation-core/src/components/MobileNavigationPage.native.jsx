import PropTypes from 'prop-types';
import React from 'react';
import { ORIGINAL } from '../constants/page-types';

const propTypes = {
  children: PropTypes.element.isRequired,
};

const defaultProps = {};

const MobileNavigationPage = ({ children, ...props }) => (
  React.cloneElement(React.Children.only(children), props)
);

MobileNavigationPage.propTypes = propTypes;
MobileNavigationPage.defaultProps = defaultProps;
MobileNavigationPage.pageType = ORIGINAL;

export default MobileNavigationPage;

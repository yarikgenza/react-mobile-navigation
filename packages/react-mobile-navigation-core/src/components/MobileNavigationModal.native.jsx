import PropTypes from 'prop-types';
import React from 'react';
import { MODAL } from '../constants/page-types';

const propTypes = {
  children: PropTypes.element,
};

const defaultProps = {
  children: undefined,
};

export default class MobileNavigationModal extends React.Component {
  render() {
    const { children, ...props } = this.props;
    return React.cloneElement(React.Children.only(children), props);
  }
}

MobileNavigationModal.propTypes = propTypes;
MobileNavigationModal.defaultProps = defaultProps;
MobileNavigationModal.pageType = MODAL;

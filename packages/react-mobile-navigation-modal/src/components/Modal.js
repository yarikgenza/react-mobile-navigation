﻿import React from 'react';
import {
  PageStatusTypesEnum,
  Interpolation,
  MobileNavigationPage,
} from 'react-mobile-navigation-core';

const propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.arrayOf(React.PropTypes.number),
    React.PropTypes.arrayOf(React.PropTypes.string),
    React.PropTypes.node,
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  direction: React.PropTypes.string.isRequired,
  pageHeight: React.PropTypes.number.isRequired,
  pageStatus: React.PropTypes.string,
  zIndex: React.PropTypes.number.isRequired,
  onModalOpenDone: React.PropTypes.func.isRequired,
  onModalCloseDone: React.PropTypes.func.isRequired,
};

const defaultProps = {};

export default class Modal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: undefined,
    };
    this.onPageActivityEnd = this.onPageActivityEnd.bind(this);
  }

  onPageActivityEnd() {
    const { pageStatus, onModalOpenDone, onModalCloseDone } = this.props;
    switch (pageStatus) {
      case PageStatusTypesEnum.OPEN_DONE:
        onModalOpenDone();
        return;
      case PageStatusTypesEnum.CLOSE_DONE: {
        onModalCloseDone();
        return;
      }
      default:
        return;
    }
  }

  render() {
    const { children, direction, pageHeight, pageStatus, zIndex } = this.props;
    return (
      <Interpolation
        direction={direction}
        isAnimation
        pageStatusInit={PageStatusTypesEnum.CLOSE_DONE}
        pageStatus={pageStatus}
        onPageActivityEnd={this.onPageActivityEnd}
      >
        <MobileNavigationPage direction={direction} pageHeight={pageHeight} zIndex={zIndex} >
          {children}
        </MobileNavigationPage>
      </Interpolation>
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

import React from 'react';
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
  pageState: React.PropTypes.object,
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
    const { pageState, onModalOpenDone, onModalCloseDone } = this.props;
    switch (pageState.status) {
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
    const { children, direction, pageHeight, pageState, zIndex } = this.props;
    return (
      <Interpolation
        direction={direction}
        isAnimation
        pageState={pageState}
        status={PageStatusTypesEnum.CLOSE_DONE}
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

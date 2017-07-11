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
  isShow: React.PropTypes.bool.isRequired,
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
    this.onPageOpenDone = this.onPageOpenDone.bind(this);
    this.onPageCloseDone = this.onPageCloseDone.bind(this);
  }

  onPageOpenDone() {
    const { onModalOpenDone } = this.props;
    onModalOpenDone();
  }

  onPageCloseDone() {
    const { onModalCloseDone } = this.props;
    onModalCloseDone();
  }

  render() {
    const { children, direction, isShow, pageHeight, pageStatus, zIndex } = this.props;
    return (
      <Interpolation
        direction={direction}
        isAnimation
        isShow={isShow}
        pageStatusInit={PageStatusTypesEnum.CLOSE_DONE}
        pageStatus={pageStatus}
        onPageOpenDone={this.onPageOpenDone}
        onPageCloseDone={this.onPageCloseDone}
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

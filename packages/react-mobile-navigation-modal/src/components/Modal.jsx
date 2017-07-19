import React from 'react';
import { Interpolation, MobileNavigationModal } from 'react-mobile-navigation-core';

const propTypes = {
  isShow: React.PropTypes.bool.isRequired,
  pageHeight: React.PropTypes.number.isRequired,
  pageStatus: React.PropTypes.string,
  pageWidth: React.PropTypes.number.isRequired,
  render: React.PropTypes.func.isRequired,
  zIndex: React.PropTypes.number.isRequired,
  onModalOpenDone: React.PropTypes.func.isRequired,
  onModalCloseStart: React.PropTypes.func.isRequired,
  onModalCloseDone: React.PropTypes.func.isRequired,
};

const defaultProps = {
  render: () => null,
};

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
    const {
      isShow,
      pageHeight,
      pageStatus,
      pageWidth,
      zIndex,
      render,
      onModalCloseStart,
    } = this.props;
    return (
      <Interpolation
        isShow={isShow}
        pageStatus={pageStatus}
        onPageOpenDone={this.onPageOpenDone}
        onPageCloseDone={this.onPageCloseDone}
      >
        <MobileNavigationModal
          pageHeight={pageHeight}
          pageWidth={pageWidth}
          zIndex={zIndex}
          onPageClose={onModalCloseStart}
        >
          {render()}
        </MobileNavigationModal>
      </Interpolation>
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

import React from 'react';
import { PageStatusTypesEnum, Interpolation } from 'react-mobile-navigation-core';

const propTypes = {
  children: React.PropTypes.any.isRequired,
  isAnimation: React.PropTypes.bool.isRequired,
  pageHeight: React.PropTypes.number,
  pageId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]).isRequired,
  pageStatusInit: React.PropTypes.string,
  pageState: React.PropTypes.object.isRequired,
  pageWidth: React.PropTypes.number,
  onActionSheetOpenStart: React.PropTypes.func.isRequired,
  onActionSheetCloseStart: React.PropTypes.func.isRequired,
  onAlertOpenStart: React.PropTypes.func.isRequired,
  onComboBoxOpenStart: React.PropTypes.func.isRequired,
  onComboBoxCloseStart: React.PropTypes.func.isRequired,
  onModalOpenStart: React.PropTypes.func.isRequired,
  onModalCloseStart: React.PropTypes.func.isRequired,
  onPageOpenStart: React.PropTypes.func.isRequired,
  onPageOpenHorizontalStart: React.PropTypes.func.isRequired,
  onPageOpenVerticalStart: React.PropTypes.func.isRequired,
  onPageOpenDone: React.PropTypes.func,
  onPageCloseStart: React.PropTypes.func.isRequired,
  onPageCloseForce: React.PropTypes.func.isRequired,
  onPageCloseDone: React.PropTypes.func,
};

const defaultProps = {};

export default class MobileNavigationPageEngine extends React.Component {

  constructor(props) {
    super(props);
    this.cache = {
      onOpenCallback: null,
      onCloseCallback: null,
    };
    this.onPageActivityEnd = this.onPageActivityEnd.bind(this);
    this.setOnOpen = this.setOnOpen.bind(this);
    this.setOnClose = this.setOnClose.bind(this);
  }

  onPageActivityEnd() {
    const { pageState, onPageOpenDone, onPageCloseDone } = this.props;
    switch (pageState.status) {
      case PageStatusTypesEnum.OPEN_DONE: {
        if (onPageOpenDone) {
          onPageOpenDone();
        }
        const { onOpenCallback } = this.cache;
        if (typeof onOpenCallback !== 'function') {
          return;
        }
        onOpenCallback();
        return;
      }
      case PageStatusTypesEnum.CLOSE_DONE: {
        if (onPageCloseDone) {
          onPageCloseDone();
        }
        const { onCloseCallback } = this.cache;
        if (typeof onCloseCallback !== 'function') {
          return;
        }
        onCloseCallback();
        return;
      }
      default:
        return;
    }
  }

  setOnOpen(onOpenFn) {
    this.cache.onOpenCallback = onOpenFn;
  }

  setOnClose(onCloseFn) {
    this.cache.onCloseCallback = onCloseFn;
  }

  render() {
    const {
      children,
      isAnimation,
      pageHeight,
      pageId,
      pageStatusInit,
      pageState,
      pageWidth,
      onActionSheetOpenStart,
      onActionSheetCloseStart,
      onAlertOpenStart,
      onComboBoxOpenStart,
      onComboBoxCloseStart,
      onModalOpenStart,
      onModalCloseStart,
      onPageOpenStart,
      onPageOpenHorizontalStart,
      onPageOpenVerticalStart,
      onPageCloseStart,
      onPageCloseForce,
    } = this.props;
    const { direction, status, zIndex } = pageState;
    return (
      <Interpolation
        direction={direction}
        isAnimation={isAnimation}
        pageStatusInit={pageStatusInit || status}
        pageStatus={status}
        onPageActivityEnd={this.onPageActivityEnd}
      >
        {React.cloneElement(children, {
          direction,
          pageHeight,
          pageId,
          pageWidth,
          zIndex,
          setOnPageOpenCallback: this.setOnOpen,
          setOnPageCloseCallback: this.setOnClose,
          onActionSheetOpen: onActionSheetOpenStart,
          onActionSheetClose: onActionSheetCloseStart,
          onAlertOpen: onAlertOpenStart,
          onComboBoxOpen: onComboBoxOpenStart,
          onComboBoxClose: onComboBoxCloseStart,
          onModalOpen: onModalOpenStart,
          onModalClose: onModalCloseStart,
          onPageOpen: onPageOpenStart,
          onPageOpenHorizontal: onPageOpenHorizontalStart,
          onPageOpenVertical: onPageOpenVerticalStart,
          onPageClose: onPageCloseStart,
          onPageCloseForce,
        })}
      </Interpolation>
    );
  }
}

MobileNavigationPageEngine.propTypes = propTypes;
MobileNavigationPageEngine.defaultProps = defaultProps;

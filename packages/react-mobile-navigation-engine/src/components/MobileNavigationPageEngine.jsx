import React from 'react';
import { Interpolation, PageStatusTypesEnum } from 'react-mobile-navigation-core';

const propTypes = {
  children: React.PropTypes.any.isRequired,
  isAnimation: React.PropTypes.bool.isRequired,
  pageHeight: React.PropTypes.number.isRequired,
  pageId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]).isRequired,
  pageStatusInit: React.PropTypes.string,
  pageState: React.PropTypes.object.isRequired,
  pageWidth: React.PropTypes.number.isRequired,
  onActionSheetOpenStart: React.PropTypes.func.isRequired,
  onActionSheetCloseStart: React.PropTypes.func.isRequired,
  onAlertOpenStart: React.PropTypes.func.isRequired,
  onAlertCloseStart: React.PropTypes.func.isRequired,
  onComboBoxOpenStart: React.PropTypes.func.isRequired,
  onComboBoxCloseStart: React.PropTypes.func.isRequired,
  onModalOpenStart: React.PropTypes.func.isRequired,
  onModalCloseStart: React.PropTypes.func.isRequired,
  onPageOpenStart: React.PropTypes.func.isRequired,
  onPageOpenDone: React.PropTypes.func,
  onPageCloseStart: React.PropTypes.func.isRequired,
  onPageCloseDone: React.PropTypes.func,
};

const defaultProps = {};

export default class MobileNavigationPageEngine extends React.Component {

  constructor(props) {
    super(props);
    this.cache = {
      onOpenUserCallback: null,
      onCloseUserCallback: null,
    };
    this.setOnOpen = this.setOnOpen.bind(this);
    this.setOnClose = this.setOnClose.bind(this);
    this.onPageOpenDone = this.onPageOpenDone.bind(this);
    this.onPageCloseDone = this.onPageCloseDone.bind(this);
  }

  onPageOpenDone() {
    const { onPageOpenDone } = this.props;
    if (onPageOpenDone) {
      onPageOpenDone();
    }
    const { onOpenUserCallback } = this.cache;
    if (typeof onOpenUserCallback === 'function') {
      onOpenUserCallback();
      return;
    }
    return;
  }

  onPageCloseDone() {
    const { onPageCloseDone } = this.props;
    if (onPageCloseDone) {
      onPageCloseDone();
    }
    const { onCloseUserCallback } = this.cache;
    if (typeof onCloseUserCallback === 'function') {
      onCloseUserCallback();
      return;
    }
    return;
  }

  setOnOpen(onOpenFn) {
    this.cache.onOpenUserCallback = onOpenFn;
  }

  setOnClose(onCloseFn) {
    this.cache.onCloseUserCallback = onCloseFn;
  }

  getStatus() {
    const { pageState } = this.props;
    const { status } = pageState;
    if (status === PageStatusTypesEnum.BACK_ANIMATING_OUT_START) {
      return PageStatusTypesEnum.BACK_ANIMATING_OUT_DONE;
    }
    if (status === PageStatusTypesEnum.CLOSE_START) {
      return PageStatusTypesEnum.CLOSE_DONE;
    }
    if (status === PageStatusTypesEnum.OPEN_START) {
      return PageStatusTypesEnum.OPEN_DONE;
    }
    return status;
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
      onAlertCloseStart,
      onComboBoxOpenStart,
      onComboBoxCloseStart,
      onModalOpenStart,
      onModalCloseStart,
      onPageOpenStart,
      onPageCloseStart,
    } = this.props;
    const { isForce, status, zIndex } = pageState;
    const statusValidated = this.getStatus();
    return (
      <Interpolation
        isAnimation={isAnimation}
        isForce={isForce}
        isShow={
          status !== PageStatusTypesEnum.BACK_ANIMATING_OUT_DONE &&
          status !== PageStatusTypesEnum.CLOSE_DONE
        }
        pageStatusInit={pageStatusInit || statusValidated}
        pageStatus={statusValidated}
        onPageOpenDone={this.onPageOpenDone}
        onPageCloseDone={this.onPageCloseDone}
      >
        {React.cloneElement(children, {
          pageHeight,
          pageId,
          pageWidth,
          zIndex,
          setOnPageOpenCallback: this.setOnOpen,
          setOnPageCloseCallback: this.setOnClose,
          onActionSheetOpen: onActionSheetOpenStart,
          onActionSheetClose: onActionSheetCloseStart,
          onAlertOpen: onAlertOpenStart,
          onAlertClose: onAlertCloseStart,
          onComboBoxOpen: onComboBoxOpenStart,
          onComboBoxClose: onComboBoxCloseStart,
          onModalOpen: onModalOpenStart,
          onModalClose: onModalCloseStart,
          onPageOpen: onPageOpenStart,
          onPageClose: onPageCloseStart,
        })}
      </Interpolation>
    );
  }
}

MobileNavigationPageEngine.propTypes = propTypes;
MobileNavigationPageEngine.defaultProps = defaultProps;

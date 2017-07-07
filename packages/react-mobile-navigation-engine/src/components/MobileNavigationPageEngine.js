import React from 'react';
import { PageStatusTypesEnum, Interpolation } from 'react-mobile-navigation-core';

const propTypes = {
  children: React.PropTypes.any.isRequired,
  direction: React.PropTypes.string,
  isAction: React.PropTypes.bool.isRequired,
  pageHeight: React.PropTypes.number,
  pageId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]).isRequired,
  pageState: React.PropTypes.object.isRequired,
  pageWidth: React.PropTypes.number,
  status: React.PropTypes.string.isRequired,
  zIndex: React.PropTypes.number.isRequired,
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
  onPageOpenDone: React.PropTypes.func.isRequired,
  onPageCloseStart: React.PropTypes.func.isRequired,
  onPageCloseDone: React.PropTypes.func.isRequired,
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
    const { pageId, pageState, onPageOpenDone, onPageCloseDone } = this.props;
    switch (pageState.status) {
      case PageStatusTypesEnum.OPEN_DONE:
        onPageOpenDone(pageId);
        if (typeof this.cache.onOpenCallback !== 'function') {
          return;
        }
        this.cache.onOpenCallback();
        return;
      case PageStatusTypesEnum.CLOSE_DONE:
        onPageCloseDone();
        if (typeof this.cache.onCloseCallback !== 'function') {
          return;
        }
        this.cache.onCloseCallback();
        return;
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
      direction,
      isAction,
      pageHeight,
      pageId,
      pageState,
      pageWidth,
      status,
      zIndex,
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
      onPageCloseDone,
    } = this.props;
    console.log(pageId, direction, status);
    return (
      <Interpolation
        isAction={isAction}
        pageState={pageState}
        status={status}
        onPageActivityEnd={this.onPageActivityEnd}
      >
        {React.cloneElement(children, {
          actionSheetOpen: onActionSheetOpenStart,
          actionSheetClose: onActionSheetCloseStart,
          alertOpen: onAlertOpenStart,
          comboBoxOpen: onComboBoxOpenStart,
          comboBoxClose: onComboBoxCloseStart,
          direction,
          modalOpen: onModalOpenStart,
          modalClose: onModalCloseStart,
          pageHeight,
          pageId,
          pageState,
          pageWidth,
          pagingActions: {
            openPage: onPageOpenStart,
            openPageHorizontal: onPageOpenHorizontalStart,
            openPageVertical: onPageOpenVerticalStart,
            goBack: onPageCloseStart,
            goBackForce: onPageCloseDone,
          },
          pagingCallbacks: {
            setOnOpen: this.setOnOpen,
            setOnClose: this.setOnClose,
          },
          zIndex,
        })}
      </Interpolation>
    );
  }
}

MobileNavigationPageEngine.propTypes = propTypes;
MobileNavigationPageEngine.defaultProps = defaultProps;

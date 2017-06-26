import React from 'react';
import { PageStatusTypesEnum, Interpolation } from 'react-mobile-navigation-core';

const propTypes = {
  actionSheetActions: React.PropTypes.object.isRequired,
  alertActions: React.PropTypes.object.isRequired,
  children: React.PropTypes.any.isRequired,
  comboBoxActions: React.PropTypes.object.isRequired,
  modalActions: React.PropTypes.object.isRequired,
  pageHeight: React.PropTypes.number,
  pageId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]).isRequired,
  pageState: React.PropTypes.object.isRequired,
  pageWidth: React.PropTypes.number,
  pagingActions: React.PropTypes.object.isRequired,
  stackId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]).isRequired,
};

const defaultProps = {};

export default class MobileNavigationPageEngine extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: undefined,
    };
    this.cache = {
      onOpenCallback: null,
      onCloseCallback: null,
    };
    this.onPageTransitionEnd = this.onPageTransitionEnd.bind(this);
    this.onPageStatusChanged = this.onPageStatusChanged.bind(this);
    this.setOnOpen = this.setOnOpen.bind(this);
    this.setOnClose = this.setOnClose.bind(this);
  }

  onPageTransitionEnd() {
    const { pageId, pageState, pagingActions, stackId } = this.props;
    switch (pageState.status) {
      case PageStatusTypesEnum.OPEN_ANIMATING:
        pagingActions.openPageDone(stackId, pageId);
        if (typeof this.cache.onOpenCallback !== 'function') {
          return;
        }
        this.cache.onOpenCallback();
        return;
      case PageStatusTypesEnum.CLOSE_ANIMATING:
        pagingActions.goBackDone(stackId, pageId);
        if (typeof this.cache.onCloseCallback !== 'function') {
          return;
        }
        this.cache.onCloseCallback();
        return;
      default:
        return;
    }
  }

  onPageStatusChanged() {
    const { pageState, stackId, pageId, pagingActions } = this.props;
    switch (pageState.status) {
      case PageStatusTypesEnum.OPEN_PREPARE:
        pagingActions.openingPage(stackId, pageId);
        return;
      case PageStatusTypesEnum.CLOSE_PREPARE:
        pagingActions.goingBack(stackId, pageId);
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
      actionSheetActions,
      alertActions,
      children,
      comboBoxActions,
      modalActions,
      pageHeight,
      pageId,
      pageState,
      pageWidth,
      pagingActions,
      stackId,
    } = this.props;
    return (
      <Interpolation
        pageState={pageState}
        setPageStatus={this.onPageStatusChanged}
        onPageTransitionEnd={this.onPageTransitionEnd}
      >
        {React.cloneElement(children, {
          actionSheetOpen: actionSheetActions.openPage,
          actionSheetClose: actionSheetActions.goBack,
          alertOpen: alertActions.openPage,
          comboBoxOpen: comboBoxActions.openPage,
          comboBoxClose: comboBoxActions.goBack,
          modalOpen: modalActions.openPage,
          modalClose: modalActions.goBack,
          pageHeight,
          pageId,
          pageState,
          pageWidth,
          pagingActions: {
            openPage: pagingActions.openPage,
            openPageHorizontal: pagingActions.openPageHorizontal,
            openPageVertical: pagingActions.openPageVertical,
            goBack: pagingActions.goBack,
            goBackForce: pagingActions.goBackForce,
          },
          pagingCallbacks: {
            setOnOpen: this.setOnOpen,
            setOnClose: this.setOnClose,
          },
          stackId,
        })}
      </Interpolation>
    );
  }
}

MobileNavigationPageEngine.propTypes = propTypes;
MobileNavigationPageEngine.defaultProps = defaultProps;

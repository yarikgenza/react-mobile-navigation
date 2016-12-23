import React from 'react';
import invariant from 'invariant';
import { PageStatusTypesEnum, Interpolation } from 'react-mobile-navigation-core';

const {
  OPEN_PREPARE,
  OPEN_ANIMATING,
  CLOSE_PREPARE,
  CLOSE_ANIMATING,
} = PageStatusTypesEnum;

const propTypes = {
  children: React.PropTypes.any.isRequired,
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
      case OPEN_ANIMATING:
        pagingActions.openingPageDone(stackId, pageId);
        if (typeof this.cache.onOpenCallback !== 'function') {
          return;
        }
        this.cache.onOpenCallback();
        return;
      case CLOSE_ANIMATING:
        pagingActions.goingBackDone(stackId, pageId);
        if (typeof this.cache.onCloseCallback !== 'function') {
          return;
        }
        this.cache.onCloseCallback();
        return;
      default:
        invariant(
          true,
          `Page status should be ${OPEN_ANIMATING} or ${CLOSE_ANIMATING}`
        );
        return;
    }
  }

  onPageStatusChanged() {
    const { pageState, stackId, pageId, pagingActions } = this.props;
    switch (pageState.status) {
      case OPEN_PREPARE:
        pagingActions.openingPage(stackId, pageId);
        return;
      case CLOSE_PREPARE:
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
      children,
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
          pageHeight,
          pageId,
          pageState,
          pageWidth,
          pagingActions: {
            openPage: pagingActions.openPage,
            openPageHorizontal: pagingActions.openPageHorizontal,
            openPageVertical: pagingActions.openPageVertical,
            goBack: pagingActions.goBack,
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

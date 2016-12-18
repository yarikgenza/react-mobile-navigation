import React from 'react';
import invariant from 'invariant';
import { PageStatusTypesEnum, Interpolation } from 'react-mobile-navigation-core';

const propTypes = {
  children: React.PropTypes.any.isRequired,
  pageHeight: React.PropTypes.number,
  pageId: React.PropTypes.any.isRequired,
  pageState: React.PropTypes.object.isRequired,
  pageWidth: React.PropTypes.number,
  pagingActions: React.PropTypes.object.isRequired,
  stackId: React.PropTypes.any.isRequired,
};

const defaultProps = {};

export class CustomPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: undefined,
    };
    this.cache = {
      onOpenCallback: null,
      onCloseCallback: null,
    };
    this.onActionTransitionEnd = this.onActionTransitionEnd.bind(this);
    this.onPageStatusChanged = this.onPageStatusChanged.bind(this);
    this.setOnOpen = this.setOnOpen.bind(this);
    this.setOnClose = this.setOnClose.bind(this);
  }

  onActionTransitionEnd() {
    const { pageId, pageState, pagingActions, stackId } = this.props;
    switch (pageState.status) {
      case PageStatusTypesEnum.OPENING:
        pagingActions.openingPageDone(stackId, pageId);
        if (typeof this.cache.onOpenCallback !== 'function') {
          return;
        }
        this.cache.onOpenCallback();
        return;
      case PageStatusTypesEnum.CLOSING:
        pagingActions.goingBackDone(stackId, pageId);
        if (typeof this.cache.onCloseCallback !== 'function') {
          return;
        }
        this.cache.onCloseCallback();
        return;
      default:
        invariant(
          true,
          `Page status should be ${PageStatusTypesEnum.OPENING} or ${PageStatusTypesEnum.CLOSING}`
        );
        return;
    }
  }

  onPageStatusChanged() {
    const { pageState, stackId, pageId, pagingActions } = this.props;
    switch (pageState.status) {
      case PageStatusTypesEnum.PREPARE_TO_OPEN:
        pagingActions.openingPage(stackId, pageId);
        return;
      case PageStatusTypesEnum.PREPARE_TO_CLOSE:
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
        setPageStatus={this.onPageStatusChanged}
        pageActionTransitionEndHandler={this.onActionTransitionEnd}
        pageState={pageState}
      >
        {React.cloneElement(children, {
          pageState,
          stackId,
          pagingActions,
          pagingCallbacks: {
            setOnOpen: this.setOnOpen,
            setOnClose: this.setOnClose,
          },
          pageHeight,
          pageId,
          pageWidth,
        })}
      </Interpolation>
    );
  }
}

CustomPage.propTypes = propTypes;
CustomPage.defaultProps = defaultProps;

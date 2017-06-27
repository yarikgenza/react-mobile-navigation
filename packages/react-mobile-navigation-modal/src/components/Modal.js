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
  pagingActions: React.PropTypes.objectOf(React.PropTypes.func),
  pageHeight: React.PropTypes.number.isRequired,
  pageState: React.PropTypes.object,
};

const defaultProps = {};

export default class Modal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: undefined,
    };
    this.onPageTransitionEnd = this.onPageTransitionEnd.bind(this);
    this.setPageStatus = this.setPageStatus.bind(this);
  }

  onPageTransitionEnd() {
    const { pageState, pagingActions } = this.props;
    switch (pageState.status) {
      case PageStatusTypesEnum.OPEN_ANIMATING:
        pagingActions.openPageDone();
        return;
      case PageStatusTypesEnum.CLOSE_ANIMATING: {
        pagingActions.goBackDone();
        return;
      }
      default:
        return;
    }
  }

  setPageStatus() {
    const { pageState, pagingActions } = this.props;
    switch (pageState.status) {
      case PageStatusTypesEnum.OPEN_PREPARE:
        // case PageSideTypesEnum.GOING_TO_MAIN:
        pagingActions.openingPage();
        return;
      case PageStatusTypesEnum.CLOSE_PREPARE:
        // case PageSideTypesEnum.GOING_TO_COVER:
        pagingActions.goingBack();
        return;
      default:
        return;
    }
  }

  render() {
    const { children, pageHeight, pageState } = this.props;
    if (pageState.status === PageStatusTypesEnum.CLOSE_DONE) {
      return null;
    }
    return (
      <Interpolation
        setPageStatus={this.setPageStatus}
        onPageTransitionEnd={this.onPageTransitionEnd}
        pageState={pageState}
      >
        <MobileNavigationPage pageHeight={pageHeight} >
          {children}
        </MobileNavigationPage>
      </Interpolation>
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

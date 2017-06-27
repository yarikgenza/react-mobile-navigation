import React from 'react';
import MobileNavigationShadowPage from 'react-mobile-navigation-sheet';
import { PageStatusTypesEnum, Interpolation } from 'react-mobile-navigation-core';
import { ActionSheetListComponent } from './ActionSheetListComponent';

const propTypes = {
  onCancel: React.PropTypes.func,
  pageState: React.PropTypes.object,
  pageId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  onShadowClick: React.PropTypes.func,
  pagingActions: React.PropTypes.objectOf(React.PropTypes.func),
};

const defaultProps = {};

export default class ActionSheet extends React.Component {

  constructor(props) {
    super(props);
    this.onShadowClick = this.onShadowClick.bind(this);
    this.setPageStatus = this.setPageStatus.bind(this);
    this.onPageTransitionEnd = this.onPageTransitionEnd.bind(this);
  }

  onShadowClick() {
    if (this.props.onShadowClick) {
      this.props.onShadowClick();
      return;
    }
    this.props.onCancel();
  }

  setPageStatus() {
    const stackData = {
      status: this.props.pageState.status,
      pagingActions: this.props.pagingActions,
      pageId: this.props.pageId,
    };
    switch (stackData.status) {
      case PageStatusTypesEnum.OPEN_PREPARE:
        // case PageSideTypesEnum.GOING_TO_MAIN:
        stackData.pagingActions.openingPage(
          stackData.pageId
        );
        return;
      case PageStatusTypesEnum.CLOSE_PREPARE:
        // case PageSideTypesEnum.GOING_TO_COVER:
        stackData.pagingActions.goingBack(
          stackData.pageId
        );
        return;
      default:
        return;
    }
  }

  onPageTransitionEnd() {
    switch (this.props.pageState.status) {
      case PageStatusTypesEnum.OPEN_ANIMATING:
        this.props.pagingActions.openPageDone(
          this.props.pageId
        );
        return;
      case PageStatusTypesEnum.CLOSE_ANIMATING:
        this.props.pagingActions.goBackDone(
          this.props.pageId
        );
        return;
      default:
        return;
    }
  }

  render() {
    return (
      <Interpolation
        onPageTransitionEnd={this.onPageTransitionEnd}
        pageState={this.props.pageState}
        setPageStatus={this.setPageStatus}
      >
        <MobileNavigationShadowPage onShadowClick={this.onShadowClick} >
          <ActionSheetListComponent />
        </MobileNavigationShadowPage>
      </Interpolation>
    );
  }
}

ActionSheet.propTypes = propTypes;
ActionSheet.defaultProps = defaultProps;

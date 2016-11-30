import React from 'react';
import autobind from 'autobind-decorator';
import invariant from 'invariant';
import ShadowPageComponent from 'react-mobile-navigation-sheet';
import { PageStatusTypesEnum, Interpolation } from 'react-mobile-navigation-core';
import { ActionSheetListComponent } from './ActionSheetListComponent';
import { ACTION_SHEET_PAGE_ID } from '../../enums/system-pages-types-enum';

const propTypes = {
  onCancel: React.PropTypes.func,

  pageState: React.PropTypes.object,
  stackId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  pageId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  onShadowClick: React.PropTypes.func,
  pagingActions: React.PropTypes.objectOf(React.PropTypes.func),
};

const defaultProps = {};

export class ActionSheetPage extends React.Component {

  @autobind
  onShadowClick() {
    if (this.props.onShadowClick) {
      this.props.onShadowClick();
      return;
    }
    this.props.onCancel();
  }

  @autobind
  setPageStatus() {
    const stackData = {
      status: this.props.pageState.status,
      pagingActions: this.props.pagingActions,
      stackId: this.props.stackId,
      pageId: this.props.pageId,
    };

    switch (stackData.status) {
      case PageStatusTypesEnum.PREPARE_TO_OPEN:
        // case PageSideTypesEnum.GOING_TO_MAIN:
        stackData.pagingActions.openingPage(
          stackData.stackId,
          stackData.pageId,
          ACTION_SHEET_PAGE_ID
        );
        return;
      case PageStatusTypesEnum.PREPARE_TO_CLOSE:
        // case PageSideTypesEnum.GOING_TO_COVER:
        stackData.pagingActions.goingBack(
          stackData.stackId,
          stackData.pageId,
          ACTION_SHEET_PAGE_ID
        );
        return;
      default:
        return;
    }
  }

  @autobind
  pageActionTransitionEndHandler() {
    switch (this.props.pageState.status) {
      case PageStatusTypesEnum.OPENING:
        this.props.pagingActions.openingPageDone(
          this.props.stackId,
          this.props.pageId,
          ACTION_SHEET_PAGE_ID
        );
        return;
      case PageStatusTypesEnum.CLOSING:
        this.props.pagingActions.goingBackDone(
          this.props.stackId,
          this.props.pageId,
          ACTION_SHEET_PAGE_ID
        );
        return;
      default:
        invariant(true, 'ERROR');
        return;
    }
  }

  render() {
    return (
      <Interpolation
        setPageStatus={this.setPageStatus}
        pageActionTransitionEndHandler={this.pageActionTransitionEndHandler}
        pageState={this.props.pageState}
      >
        <ShadowPageComponent
          stackId={this.props.stackId}
          onShadowClick={this.onShadowClick}
        >
          <ActionSheetListComponent />
        </ShadowPageComponent>
      </Interpolation>
    );
  }
}

ActionSheetPage.propTypes = propTypes;
ActionSheetPage.defaultProps = defaultProps;

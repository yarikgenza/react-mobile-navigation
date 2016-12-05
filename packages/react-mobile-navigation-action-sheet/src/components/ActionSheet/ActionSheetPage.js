import invariant from 'invariant';
import React from 'react';
import { PageStatusTypesEnum, Interpolation } from 'react-mobile-navigation-core';
import ShadowPage from 'react-mobile-navigation-sheet';
import { ActionSheetListComponent } from './ActionSheetListComponent';
import { ACTION_SHEET_PAGE_ID } from '../../enums/system-pages-types-enum';

const propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  cancelLabel: React.PropTypes.string,
  onCancel: React.PropTypes.func,
  onSelect: React.PropTypes.func,
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

const defaultProps = {
  items: [],
};

export class ActionSheetPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: undefined,
    };
    this.onSelect = this.onSelect.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onShadowClick = this.onShadowClick.bind(this);
    this.setPageStatus = this.setPageStatus.bind(this);
    this.pageActionTransitionEndHandler = this.pageActionTransitionEndHandler.bind(this);
  }

  onSelect(selectedOption) {
    this.setState({
      selectedOption,
    });
    this.closeActionSheet();
  }

  onCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
    this.closeActionSheet();
  }

  onShadowClick() {
    if (this.props.onShadowClick) {
      this.props.onShadowClick();
      return;
    }
    this.onCancel();
  }

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
        invariant(
          true,
          'Property "status" in setPageStatus function is out of range'
        );
        return;
    }
  }

  closeActionSheet() {
    this.props.pagingActions.goBack(
      this.props.stackId,
      this.props.pageId,
      ACTION_SHEET_PAGE_ID
    );
  }

  pageActionTransitionEndHandler() {
    switch (this.props.pageState.status) {
      case PageStatusTypesEnum.OPENING:
        this.props.pagingActions.openingPageDone(
          this.props.stackId,
          this.props.pageId,
          ACTION_SHEET_PAGE_ID
        );
        return;
      case PageStatusTypesEnum.CLOSING: {
        this.props.pagingActions.goingBackDone(
          this.props.stackId,
          this.props.pageId,
          ACTION_SHEET_PAGE_ID
        );
        const { selectedOption } = this.state;
        if (selectedOption && selectedOption.handler) {
          selectedOption.handler();
        }
        const { onSelect } = this.props;
        if (onSelect && selectedOption) {
          onSelect(selectedOption);
        }
        this.setState({
          selectedOption: undefined,
        });
        return;
      }
      default:
        invariant(
          true,
          'Property "status" in setPageStatus function is out of range'
        );
        return;
    }
  }

  render() {
    if (this.props.pageState.status === PageStatusTypesEnum.CLOSED) {
      return null;
    }
    const {
      pageState,
      stackId,
      items,
      cancelLabel,
    } = this.props;
    return (
      <Interpolation
        setPageStatus={this.setPageStatus}
        pageActionTransitionEndHandler={this.pageActionTransitionEndHandler}
        pageState={pageState}
      >
        <ShadowPage stackId={stackId} onShadowClick={this.onShadowClick} >
          <ActionSheetListComponent
            items={items}
            cancelLabel={cancelLabel}
            onCancel={this.onCancel}
            onSelect={this.onSelect}
          />
        </ShadowPage>
      </Interpolation>
    );
  }
}

ActionSheetPage.propTypes = propTypes;
ActionSheetPage.defaultProps = defaultProps;

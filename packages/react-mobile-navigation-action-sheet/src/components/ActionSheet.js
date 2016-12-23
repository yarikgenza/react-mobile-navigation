import invariant from 'invariant';
import React from 'react';
import { PageStatusTypesEnum, Interpolation } from 'react-mobile-navigation-core';
import MobileNavigationShadowPage from 'react-mobile-navigation-sheet';
import ActionSheetList from './ActionSheetList';

const propTypes = {
  cancelLabel: React.PropTypes.string,
  items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  pageId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  pageState: React.PropTypes.object,
  pagingActions: React.PropTypes.objectOf(React.PropTypes.func),
  stackId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  onCancel: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  onShadowClick: React.PropTypes.func,
};

const defaultProps = {
  items: [],
};

/**
 * MobileNavigationShadowPage engine
 */
export default class ActionSheet extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: undefined,
    };
    this.onSelect = this.onSelect.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onShadowClick = this.onShadowClick.bind(this);
    this.setPageStatus = this.setPageStatus.bind(this);
    this.onPageTransitionEnd = this.onPageTransitionEnd.bind(this);
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

  onPageTransitionEnd() {
    switch (this.props.pageState.status) {
      case PageStatusTypesEnum.OPEN_ANIMATING:
        this.props.pagingActions.openingPageDone(
          this.props.stackId,
          this.props.pageId
        );
        return;
      case PageStatusTypesEnum.CLOSE_ANIMATING: {
        this.props.pagingActions.goingBackDone(
          this.props.stackId,
          this.props.pageId
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

  setPageStatus() {
    const stackData = {
      status: this.props.pageState.status,
      pagingActions: this.props.pagingActions,
      stackId: this.props.stackId,
      pageId: this.props.pageId,
    };
    switch (stackData.status) {
      case PageStatusTypesEnum.OPEN_PREPARE:
        // case PageSideTypesEnum.GOING_TO_MAIN:
        stackData.pagingActions.openingPage(
          stackData.stackId,
          stackData.pageId
        );
        return;
      case PageStatusTypesEnum.CLOSE_PREPARE:
        // case PageSideTypesEnum.GOING_TO_COVER:
        stackData.pagingActions.goingBack(
          stackData.stackId,
          stackData.pageId
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
      this.props.pageId
    );
  }

  render() {
    if (this.props.pageState.status === PageStatusTypesEnum.CLOSE_DONE) {
      return null;
    }
    const {
      cancelLabel,
      items,
      pageId,
      pageState,
      pagingActions,
      stackId,
    } = this.props;
    return (
      <Interpolation
        pageState={pageState}
        setPageStatus={this.setPageStatus}
        onPageTransitionEnd={this.onPageTransitionEnd}
      >
        <MobileNavigationShadowPage
          pageId={pageId}
          pagingActions={pagingActions}
          stackId={stackId}
          onShadowClick={this.onShadowClick}
        >
          <ActionSheetList
            cancelLabel={cancelLabel}
            items={items}
            onCancel={this.onCancel}
            onSelect={this.onSelect}
          />
        </MobileNavigationShadowPage>
      </Interpolation>
    );
  }
}

ActionSheet.propTypes = propTypes;
ActionSheet.defaultProps = defaultProps;

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
    this.setState(() => ({ selectedOption }));
    this.closeActionSheet();
  }

  onCancel() {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
    this.closeActionSheet();
  }

  onShadowClick() {
    const { onShadowClick } = this.props;
    if (onShadowClick) {
      onShadowClick();
      return;
    }
    this.onCancel();
  }

  onPageTransitionEnd() {
    const { pageId, pageState, pagingActions, stackId, onSelect } = this.props;
    switch (pageState.status) {
      case PageStatusTypesEnum.OPEN_ANIMATING:
        pagingActions.openPageDone(stackId, pageId);
        return;
      case PageStatusTypesEnum.CLOSE_ANIMATING: {
        const { selectedOption } = this.state;
        // set state until use does actions which can possibly unmount the component
        this.setState(() => ({ selectedOption: undefined }));
        pagingActions.goBackDone(stackId, pageId);
        if (selectedOption && selectedOption.handler) {
          selectedOption.handler();
        }
        if (onSelect && selectedOption) {
          onSelect(selectedOption);
        }
        return;
      }
      default:
        return;
    }
  }

  setPageStatus() {
    const { pageId, pageState, pagingActions, stackId } = this.props;
    switch (pageState.status) {
      case PageStatusTypesEnum.OPEN_PREPARE:
        // case PageSideTypesEnum.GOING_TO_MAIN:
        pagingActions.openingPage(stackId, pageId);
        return;
      case PageStatusTypesEnum.CLOSE_PREPARE:
        // case PageSideTypesEnum.GOING_TO_COVER:
        pagingActions.goingBack(stackId, pageId);
        return;
      default:
        return;
    }
  }

  closeActionSheet() {
    const { pageId, pagingActions, stackId } = this.props;
    pagingActions.goBack(stackId, pageId);
  }

  render() {
    const {
      cancelLabel,
      items,
      pageId,
      pageState,
      pagingActions,
      stackId,
    } = this.props;
    if (pageState.status === PageStatusTypesEnum.CLOSE_DONE) {
      return null;
    }
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

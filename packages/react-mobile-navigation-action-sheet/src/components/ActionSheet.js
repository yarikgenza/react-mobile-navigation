import React from 'react';
import { PageStatusTypesEnum, Interpolation } from 'react-mobile-navigation-core';
import MobileNavigationShadowPage from 'react-mobile-navigation-sheet';
import ActionSheetList from './ActionSheetList';

const propTypes = {
  cancelLabel: React.PropTypes.string,
  items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  pageState: React.PropTypes.object,
  pagingActions: React.PropTypes.objectOf(React.PropTypes.func),
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
    const { pageState, pagingActions, onSelect } = this.props;
    switch (pageState.status) {
      case PageStatusTypesEnum.OPEN_ANIMATING:
        pagingActions.openPageDone();
        return;
      case PageStatusTypesEnum.CLOSE_ANIMATING: {
        const { selectedOption } = this.state;
        // set state until use does actions which can possibly unmount the component
        this.setState(() => ({ selectedOption: undefined }));
        pagingActions.goBackDone();
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

  closeActionSheet() {
    const { pagingActions } = this.props;
    pagingActions.goBack();
  }

  render() {
    const { cancelLabel, items, pageState } = this.props;
    if (pageState.status === PageStatusTypesEnum.CLOSE_DONE) {
      return null;
    }
    return (
      <Interpolation
        pageState={pageState}
        setPageStatus={this.setPageStatus}
        onPageTransitionEnd={this.onPageTransitionEnd}
      >
        <MobileNavigationShadowPage onShadowClick={this.onShadowClick} >
          <ActionSheetList
            cancelLabel={cancelLabel}
            items={items}
            pageStateIndex={pageState.zIndex}
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

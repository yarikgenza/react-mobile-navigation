import React from 'react';
import { DirectionEnum, CustomPageBody, PageWrapper } from 'react-mobile-navigation-core';
import {
  ActionSheetPage,
  ActionSheetOptionModel,
  ACTION_SHEET_PAGE_ID,
} from 'react-mobile-navigation-action-sheet';

export class SettingsMainPageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.actionSheetItems = [];
    this.openActionsheet = this.openActionsheet.bind(this);
    this.onActionSheetSelect = this.onActionSheetSelect.bind(this);
    this.onActionSheetCancel = this.onActionSheetCancel.bind(this);
  }

  openActionsheet() {
    this.actionSheetItems = [
      new ActionSheetOptionModel('licenses', 'Licenses', () => { console.log('licenses'); }),
    ];
    this.props.actionSheetActions.openPage(
      this.props.stackId,
      this.props.pageId,
      ACTION_SHEET_PAGE_ID,
      DirectionEnum.VERTICAL,
      this.props.pageState.zIndex
    );
  }

  onActionSheetSelect(selectedItem) {
    if (selectedItem.key === 'licenses') {
      console.log('onActionSheetSelect', selectedItem.key);
    }
  }

  onActionSheetCancel() {
    console.log('onActionSheetCancel');
  }

  render() {
    const ACTION_SHEET = 'ACTION_SHEET';
    const actionSheetPageState = this.props.actionSheet;
    return (
      <PageWrapper>
        <CustomPageBody zIndex={this.props.pageState.zIndex} >
          <div onClick={this.openActionsheet}>{ACTION_SHEET}</div>
        </CustomPageBody>
        <ActionSheetPage
          items={this.actionSheetItems}
          onSelect={this.onActionSheetSelect}
          onCancel={this.onActionSheetCancel}
          pageState={actionSheetPageState}
          stackId={this.props.stackId}
          pageId={this.props.pageId}
          pagingActions={this.props.actionSheetActions}
        />
      </PageWrapper>
    );
  }
}

SettingsMainPageComponent.defaultProps = {
  pagingActions: undefined,
  stackId: undefined,
  pageId: undefined,
  actionSheet: undefined,
  actionSheetActions: undefined,
};

SettingsMainPageComponent.propTypes = {
  pagingActions: React.PropTypes.any,
  stackId: React.PropTypes.any,
  pageId: React.PropTypes.any,
  actionSheet: React.PropTypes.any,
  actionSheetActions: React.PropTypes.any,
};

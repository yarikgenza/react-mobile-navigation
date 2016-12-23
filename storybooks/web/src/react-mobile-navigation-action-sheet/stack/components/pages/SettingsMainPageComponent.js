import React from 'react';
import { DirectionEnum, PageContent, PageWrapper } from 'react-mobile-navigation-core';
import {
  ActionSheet,
  actionSheetOptionModel,
} from 'react-mobile-navigation-action-sheet';

export class SettingsMainPageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.actionSheetItems = [];
    this.openActionSheet = this.openActionSheet.bind(this);
    this.onActionSheetSelect = this.onActionSheetSelect.bind(this);
    this.onActionSheetCancel = this.onActionSheetCancel.bind(this);
  }

  openActionSheet() {
    this.actionSheetItems = [
      actionSheetOptionModel('licenses', 'Licenses', () => { console.log('licenses'); }),
    ];
    this.props.actionSheetPagingActions.openPage(
      this.props.stackId,
      this.props.pageId,
      DirectionEnum.VERTICAL,
      2
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
    return (
      <PageWrapper>
        <PageContent>
          <div onClick={this.openActionSheet}>
            Action Sheet
          </div>
        </PageContent>
        <ActionSheet
          items={this.actionSheetItems}
          pageId={this.props.pageId}
          pageState={this.props.actionSheet}
          pagingActions={this.props.actionSheetPagingActions}
          stackId={this.props.stackId}
          onSelect={this.onActionSheetSelect}
          onCancel={this.onActionSheetCancel}
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
  actionSheetPagingActions: undefined,
};

SettingsMainPageComponent.propTypes = {
  pagingActions: React.PropTypes.any,
  stackId: React.PropTypes.any,
  pageId: React.PropTypes.any,
  actionSheet: React.PropTypes.any,
  actionSheetPagingActions: React.PropTypes.any,
};

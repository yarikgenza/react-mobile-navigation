import React from 'react';
import {
  DirectionEnum,
  CustomPageBody,
  PageWrapper,
} from 'react-mobile-navigation-core';
import {
  ActionSheetPage,
  ACTION_SHEET_PAGE_ID,
} from '../../stack-action-pages';

export class SettingsMainPageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.actionSheetItems = [];
    this.openActionsheet = this.openActionsheet.bind(this);
    this.onActionSheetSelect = this.onActionSheetSelect.bind(this);
    this.onActionSheetCancel = this.onActionSheetCancel.bind(this);
  }

  openActionsheet() {
    this.actionSheetItems = [];
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
      this.onActionSheetCancel();
    }
  }

  onActionSheetCancel() {
    this.props.actionSheetActions.goBack(
      this.props.stackId,
      this.props.pageId,
      ACTION_SHEET_PAGE_ID
    );
  }

  render() {
    const ACTION_SHEET = 'ACTION_SHEET';
    const actionSheetPageState = this.props.actionSheet;
    const mainPageStyle = {
      backgroundColor: 'white',
      width: '100%',
      height: '100%',
    };
    return (
      <PageWrapper>
        <CustomPageBody zIndex={this.props.pageState.zIndex} >
          <div style={mainPageStyle}>
            <div onClick={this.openActionsheet} >
              {ACTION_SHEET}
            </div>
          </div>
        </CustomPageBody>
        <ActionSheetPage
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

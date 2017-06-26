import React from 'react';
import {
  DirectionEnum,
  PageContent,
  PageWrapper,
} from 'react-mobile-navigation-core';
import { ActionSheet } from '../../stack-action-pages';

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
      this.props.pageId
    );
  }

  render() {
    const actionSheetPageState = this.props.actionSheet;
    const mainPageStyle = {
      backgroundColor: 'white',
      width: '100%',
      height: '100%',
    };
    return (
      <PageWrapper>
        <PageContent>
          <div style={mainPageStyle}>
            <div onClick={this.openActionsheet} >
              Action Sheet
            </div>
          </div>
        </PageContent>
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

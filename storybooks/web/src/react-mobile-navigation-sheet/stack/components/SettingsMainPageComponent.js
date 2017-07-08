import React from 'react';
import { DirectionEnum } from 'react-mobile-navigation-core';
import { ActionSheet } from '../../stack-action-pages';

export default class SettingsMainPageComponent extends React.Component {

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
      <div style={mainPageStyle}>
        <div onClick={this.openActionsheet} >
          Action Sheet
        </div>
      </div>
    );
  }
}

SettingsMainPageComponent.defaultProps = {
  pageId: undefined,
  actionSheet: undefined,
  actionSheetActions: undefined,
};

SettingsMainPageComponent.propTypes = {
  pageId: React.PropTypes.any,
  actionSheet: React.PropTypes.any,
  actionSheetActions: React.PropTypes.any,
};

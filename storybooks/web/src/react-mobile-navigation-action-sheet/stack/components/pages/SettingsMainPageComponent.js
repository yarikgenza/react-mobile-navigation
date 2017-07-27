import PropTypes from 'prop-types';
import React from 'react';
import {
  ActionSheet,
  actionSheetOptionModel,
} from 'react-mobile-navigation-action-sheet';

export default class SettingsMainPageComponent extends React.Component {

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
    this.props.actionSheetActions.openPage();
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
      <div onClick={this.openActionSheet}>
        Action Sheet
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
  pageId: PropTypes.any,
  actionSheet: PropTypes.any,
  actionSheetActions: PropTypes.any,
};

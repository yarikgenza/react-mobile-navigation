import { ALERT_TYPES } from 'binary-ui-components/mobile/Alert';
import React from 'react';
import * as SettingsModeTypesEnum from '../../enum/settings-mode-types-enum';
import {
  DirectionEnum,
  PageContent,
  PageWrapper,
} from 'react-mobile-navigation-core';
import { MobileNavigationPage } from 'react-mobile-navigation-engine';

export class SettingsHelpPageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.cache = '1';
    this.onClick = this.onClick.bind(this);
    this.openActionSheet = this.openActionSheet.bind(this);
    this.openComboBox = this.openComboBox.bind(this);
    this.openAlert = this.openAlert.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closePageClick = this.closePageClick.bind(this);
    this.connectedHelpText = this.connectedHelpText.bind(this);
  }

  onClick() {
    console.log(1);
  }

  openActionSheet() {
    this.props.actionSheetOpen({
      cancelLabel: 'Cancel',
      items: [],
      onCancel: () => {},
      onSelect: () => {},
    }, DirectionEnum.VERTICAL);
  }

  openComboBox() {
    this.props.comboBoxOpen({
      bodyStyle: {
        backgroundColor: 'white',
        borderRadius: '5px',
        overflowX: 'hidden',
        overflowY: 'auto',
      },
      headerStyle: {
        backgroundColor: '#eeeae5',
      },
      allowCustomValue: false,
      customOptionModel: undefined,
      items: [],
      inputPlaceholder: 'Placeholder',
      isBold: true,
      noOptionsMatchingInputLabel: 'No matches',
      pressEnterToSaveCustomFieldLabel: 'Press enter',
      title: 'ComboBox title',
      onCancel: () => {},
      onSelect: () => {},
      onSelectCustom: () => {},
    }, DirectionEnum.VERTICAL);
  }

  openAlert() {
    this.props.alertOpen({
      autoHideDuration: 1000,
      text: 'text',
      type: ALERT_TYPES.CRITICAL,
      onClick: () => { console.log(1); },
    });
  }

  openModal() {
    this.props.modalOpen({
      bodyStyle: {
        backgroundColor: 'white',
        borderRadius: '5px',
        overflowX: 'hidden',
        overflowY: 'auto',
      },
      headerStyle: {
        backgroundColor: '#eeeae5',
      },
      title: 'Modal Title',
      render: () => { return 'Content Here'; },
      onCancel: () => {},
      onConfirm: () => {},
    }, DirectionEnum.VERTICAL);
  }

  componentOpeningDone() {
    console.log('componentOpeningDone', this.cache);
  }

  componentClosingDone() {
    console.log('componentClosingDone', this.cache);
  }

  connectedHelpText() {
    this.props.pagingActions.openPage(
      this.props.stackId,
      SettingsModeTypesEnum.LICENSES
    );
  }

  closePageClick(e) {
    this.props.pagingActions.goBack(this.props.stackId);
  }

  render() {
    return (
      <PageWrapper style={{ backgroundColor: 'white' }} >
        <PageContent>
          <div style={{ textAlign: 'center' }} >Help</div>
          <div onClick={this.connectedHelpText} >
            Open licenses
          </div>
          <div onClick={this.closePageClick} >
            Go back
          </div>
          <div onClick={this.openActionSheet} >
            Show action sheet
          </div>
          <div onClick={this.openComboBox} >
            Show combobox
          </div>
          <div onClick={this.openAlert} >
            Show alert
          </div>
          <div onClick={this.openModal} >
            Show modal
          </div>
        </PageContent>
      </PageWrapper>
    );
  }
}

SettingsHelpPageComponent.defaultProps = {
  actionSheetOpen: undefined,
  alertOpen: undefined,
  modalOpen: undefined,
  pagingActions: undefined,
  stackId: undefined,
};

SettingsHelpPageComponent.propTypes = {
  actionSheetOpen: React.PropTypes.func,
  alertOpen: React.PropTypes.func,
  modalOpen: React.PropTypes.func,
  pagingActions: React.PropTypes.any,
  stackId: React.PropTypes.any,
};

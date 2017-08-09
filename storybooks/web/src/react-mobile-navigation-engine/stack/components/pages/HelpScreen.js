import IconCancel from 'binary-ui-icons/binary/Cancel';
import IconDone from 'binary-ui-icons/binary/Done';
import Alert, { ALERT_TYPES } from 'binary-ui-components/mobile/Alert';
import Button from 'binary-ui-components/mobile/Button';
import StackPage from 'binary-ui-stack';
import PropTypes from 'prop-types';
import React from 'react';

import { actionSheetOptionModel } from 'react-mobile-navigation-action-sheet';
import { MobileNavigationPage } from 'react-mobile-navigation-engine';

import * as SettingsModeTypesEnum from '../../enum/settings-mode-types-enum';

export default class HelpScreen extends React.Component {

  constructor(props) {
    super(props);
    this.cache = '1';
    this.onClick = this.onClick.bind(this);
    this.openActionSheet = this.openActionSheet.bind(this);
    this.openComboBox = this.openComboBox.bind(this);
    this.openAlert = this.openAlert.bind(this);
    this.openAlertAutoHide = this.openAlertAutoHide.bind(this);
    this.closePageClick = this.closePageClick.bind(this);
    this.closePageForceClick = this.closePageForceClick.bind(this);
    this.connectedLicensesText = this.connectedLicensesText.bind(this);
    this.connectedLicensesTextForce = this.connectedLicensesTextForce.bind(this);
    this.onAlertCloseCallback = this.onAlertCloseCallback.bind(this);
    this.onPageCloseCallback = this.onPageCloseCallback.bind(this);
    props.setOnAlertCloseCallback(this.onAlertCloseCallback);
    props.setOnPageCloseCallback(this.onPageCloseCallback);
  }

  onAlertCloseCallback() {
    console.log('onAlertCloseCallback');
  }

  onPageCloseCallback() {
    console.log('onPageCloseCallback');
  }

  onClick() {
    console.log(1);
  }

  openActionSheet() {
    this.props.onActionSheetOpen({
      cancelLabel: 'Cancel',
      items: [
        actionSheetOptionModel('licenses', 'Licenses', () => { console.log('licenses'); }),
      ],
      onCancel: () => {},
      onSelect: () => {},
    });
  }

  openComboBox() {
    this.props.onComboBoxOpen({
      bodyStyle: {
        backgroundColor: 'white',
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
    });
  }

  openAlertAutoHide() {
    const { onAlertOpen } = this.props;
    onAlertOpen({
      autoHideDuration: 2500,
      render: () => (
        <Alert text="text" type={ALERT_TYPES.CRITICAL} onClick={() => { console.log(1); }} />
      ),
    });
  }

  openAlert() {
    const { onAlertOpen, onAlertClose } = this.props;
    onAlertOpen({
      autoHideDuration: 0,
      render: () => (
        <Alert text="text" type={ALERT_TYPES.CRITICAL} onClick={() => { console.log(1); onAlertClose(); }} />
      ),
    });
  }

  componentOpeningDone() {
    console.log('componentOpeningDone', this.cache);
  }

  componentClosingDone() {
    console.log('componentClosingDone', this.cache);
  }

  connectedLicensesText() {
    this.props.onPageOpen(SettingsModeTypesEnum.LICENSES);
  }

  connectedLicensesTextForce() {
    this.props.onPageOpen(SettingsModeTypesEnum.LICENSES, true);
  }

  closePageClick(e) {
    this.props.onPageClose();
  }

  closePageForceClick(e) {
    this.props.onPageClose(true);
  }

  render() {
    console.log('Render (3)');
    return (
      <div style={{ backgroundColor: 'white', height: '100%', width: '100%' }} >
        <div style={{ textAlign: 'center' }} >Help (3)</div>
        <Button onClick={this.connectedLicensesText} label="Open Licenses" />
        <Button onClick={this.connectedLicensesTextForce} label="Open Licenses Force" />
        <Button onClick={this.closePageClick} label="Go Back" />
        <Button onClick={this.closePageForceClick} label="Go Back force" />
        <Button onClick={this.openActionSheet} label="Show ActionSheet" />
        <Button onClick={this.openComboBox} label="Show ComboBox" />
        <Button onClick={this.openAlertAutoHide} label="Show Alert auto-hide" />
        <Button onClick={this.openAlert} label="Show Alert" />
      </div>
    );
  }
}

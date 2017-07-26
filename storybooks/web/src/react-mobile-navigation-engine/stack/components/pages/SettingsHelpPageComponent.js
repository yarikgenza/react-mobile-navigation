import IconCancel from 'binary-ui-icons/binary/Cancel';
import IconDone from 'binary-ui-icons/binary/Done';
import Alert, { ALERT_TYPES } from 'binary-ui-components/mobile/Alert';
import StackPage from 'binary-ui-stack';
import React from 'react';
import * as SettingsModeTypesEnum from '../../enum/settings-mode-types-enum';
import { MobileNavigationPage } from 'react-mobile-navigation-engine';

export default class SettingsHelpPageComponent extends React.Component {

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
      items: [],
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
        <div onClick={this.connectedLicensesText} >
          Open licenses
        </div>
        <div onClick={this.connectedLicensesTextForce} >
          Open licenses force
        </div>
        <div onClick={this.closePageClick} >
          Go back
        </div>
        <div onClick={this.closePageForceClick} >
          Go back force
        </div>
        <div onClick={this.openActionSheet} >
          Show action sheet
        </div>
        <div onClick={this.openComboBox} >
          Show combobox
        </div>
        <div onClick={this.openAlertAutoHide} >
          Show alert auto-hide
        </div>
        <div onClick={this.openAlert} >
          Show alert
        </div>
      </div>
    );
  }
}

SettingsHelpPageComponent.defaultProps = {
  setOnAlertCloseCallback: undefined,
  setOnPageCloseCallback: undefined,
  onActionSheetOpen: undefined,
  onAlertOpen: undefined,
};

SettingsHelpPageComponent.propTypes = {
  setOnAlertCloseCallback: React.PropTypes.func,
  setOnPageCloseCallback: React.PropTypes.func,
  onActionSheetOpen: React.PropTypes.func,
  onAlertOpen: React.PropTypes.func,
};

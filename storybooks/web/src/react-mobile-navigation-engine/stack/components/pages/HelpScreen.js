import IconCancel from 'binary-ui-icons/binary/Cancel';
import IconDone from 'binary-ui-icons/binary/Done';
import Alert, { ALERT_TYPES } from 'binary-ui-components/mobile/Alert';
import Button from 'binary-ui-components/mobile/Button';
import StackPage from 'binary-ui-stack';
import PropTypes from 'prop-types';
import React from 'react';

import { actionSheetOptionModel } from 'react-mobile-navigation-action-sheet';
import { comboBoxOptionModel } from 'react-mobile-navigation-combobox';
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
      items: [
        comboBoxOptionModel('first0', 'First', () => { console.log('1'); }, { color: 'blue' }),
        comboBoxOptionModel('first1', 'Second', () => { console.log('2'); }),
        comboBoxOptionModel('first2', 'Third', () => { console.log('3'); }),
        comboBoxOptionModel('first3', 'Fourth', () => { console.log('4'); }),
        comboBoxOptionModel('first4', 'Fifth', () => { console.log('5'); }),
        comboBoxOptionModel('first5', 'Sixth', () => { console.log('6'); }),
        comboBoxOptionModel('first6', 'Seventh', () => { console.log('7'); }),
        comboBoxOptionModel('first7', 'Eighth', () => { console.log('8'); }),
        comboBoxOptionModel('first8', 'Ninth', () => { console.log('9'); }),
        comboBoxOptionModel('first9', 'Tenth', () => { console.log('10'); }),
        comboBoxOptionModel('first10', 'Eleventh', () => { console.log('11'); }),
        comboBoxOptionModel('first11', 'Twelveth', () => { console.log('12'); }),
        comboBoxOptionModel('first12', 'Thirteenth', () => { console.log('13'); }),
        comboBoxOptionModel('first13', 'Fourteenth', () => { console.log('14'); }),
        comboBoxOptionModel('first14', 'Fifteenth', () => { console.log('15'); }),
        comboBoxOptionModel('first15', 'Sixteenth', () => { console.log('16'); }),
        comboBoxOptionModel('first16', 'Seventeenth', () => { console.log('17'); }),
        comboBoxOptionModel('first17', 'Eighteenth', () => { console.log('18'); }),
        comboBoxOptionModel('first18', 'Nineteenth', () => { console.log('19'); }),
        comboBoxOptionModel('first19', 'Twentieth', () => { console.log('20'); }),
        comboBoxOptionModel('first20', 'Twenty first', () => { console.log('21'); }),
        comboBoxOptionModel('first21', 'Twenty second', () => { console.log('22'); }),
        comboBoxOptionModel('first22', 'Twenty third', () => { console.log('23'); }),
        comboBoxOptionModel('first23', 'First', () => { console.log('1'); }, { color: 'blue' }),
        comboBoxOptionModel('first24', 'Second', () => { console.log('2'); }),
        comboBoxOptionModel('first25', 'Third', () => { console.log('3'); }),
        comboBoxOptionModel('first26', 'Fourth', () => { console.log('4'); }),
        comboBoxOptionModel('first27', 'Fifth', () => { console.log('5'); }),
        comboBoxOptionModel('first28', 'Sixth', () => { console.log('6'); }),
        comboBoxOptionModel('first29', 'Seventh', () => { console.log('7'); }),
        comboBoxOptionModel('first30', 'Eighth', () => { console.log('8'); }),
        comboBoxOptionModel('first31', 'Ninth', () => { console.log('9'); }),
        comboBoxOptionModel('first32', 'Tenth', () => { console.log('10'); }),
        comboBoxOptionModel('first33', 'Eleventh', () => { console.log('11'); }),
        comboBoxOptionModel('first34', 'Twelveth', () => { console.log('12'); }),
        comboBoxOptionModel('first35', 'Thirteenth', () => { console.log('13'); }),
        comboBoxOptionModel('first36', 'Fourteenth', () => { console.log('14'); }),
        comboBoxOptionModel('first37', 'Fifteenth', () => { console.log('15'); }),
        comboBoxOptionModel('first38', 'Sixteenth', () => { console.log('16'); }),
        comboBoxOptionModel('first39', 'Seventeenth', () => { console.log('17'); }),
        comboBoxOptionModel('first40', 'Eighteenth', () => { console.log('18'); }),
        comboBoxOptionModel('first41', 'Nineteenth', () => { console.log('19'); }),
        comboBoxOptionModel('first42', 'Twentieth', () => { console.log('20'); }),
        comboBoxOptionModel('first43', 'Twenty first', () => { console.log('21'); }),
        comboBoxOptionModel('first44', 'Twenty second', () => { console.log('22'); }),
        comboBoxOptionModel('first45', 'Twenty third', () => { console.log('23'); }),
        comboBoxOptionModel('first46', 'First', () => { console.log('1'); }, { color: 'blue' }),
        comboBoxOptionModel('first47', 'Second', () => { console.log('2'); }),
        comboBoxOptionModel('first48', 'Third', () => { console.log('3'); }),
        comboBoxOptionModel('first49', 'Fourth', () => { console.log('4'); }),
        comboBoxOptionModel('first50', 'Fifth', () => { console.log('5'); }),
        comboBoxOptionModel('first51', 'Sixth', () => { console.log('6'); }),
        comboBoxOptionModel('first52', 'Seventh', () => { console.log('7'); }),
        comboBoxOptionModel('first53', 'Eighth', () => { console.log('8'); }),
        comboBoxOptionModel('first54', 'Ninth', () => { console.log('9'); }),
        comboBoxOptionModel('first55', 'Tenth', () => { console.log('10'); }),
        comboBoxOptionModel('first56', 'Eleventh', () => { console.log('11'); }),
        comboBoxOptionModel('first57', 'Twelveth', () => { console.log('12'); }),
        comboBoxOptionModel('first58', 'Thirteenth', () => { console.log('13'); }),
        comboBoxOptionModel('first59', 'Fourteenth', () => { console.log('14'); }),
        comboBoxOptionModel('first60', 'Fifteenth', () => { console.log('15'); }),
        comboBoxOptionModel('first61', 'Sixteenth', () => { console.log('16'); }),
        comboBoxOptionModel('first62', 'Seventeenth', () => { console.log('17'); }),
        comboBoxOptionModel('first63', 'Eighteenth', () => { console.log('18'); }),
        comboBoxOptionModel('first64', 'Nineteenth', () => { console.log('19'); }),
        comboBoxOptionModel('first65', 'Twentieth', () => { console.log('20'); }),
        comboBoxOptionModel('first66', 'Twenty first', () => { console.log('21'); }),
        comboBoxOptionModel('first67', 'Twenty second', () => { console.log('22'); }),
        comboBoxOptionModel('first68', 'Twenty third', () => { console.log('23'); }),
        comboBoxOptionModel('first69', 'First', () => { console.log('1'); }, { color: 'blue' }),
        comboBoxOptionModel('first70', 'Second', () => { console.log('2'); }),
        comboBoxOptionModel('first71', 'Third', () => { console.log('3'); }),
        comboBoxOptionModel('first72', 'Fourth', () => { console.log('4'); }),
        comboBoxOptionModel('first73', 'Fifth', () => { console.log('5'); }),
        comboBoxOptionModel('first74', 'Sixth', () => { console.log('6'); }),
        comboBoxOptionModel('first75', 'Seventh', () => { console.log('7'); }),
        comboBoxOptionModel('first76', 'Eighth', () => { console.log('8'); }),
        comboBoxOptionModel('first77', 'Ninth', () => { console.log('9'); }),
        comboBoxOptionModel('first78', 'Tenth', () => { console.log('10'); }),
        comboBoxOptionModel('first79', 'Eleventh', () => { console.log('11'); }),
        comboBoxOptionModel('first80', 'Twelveth', () => { console.log('12'); }),
        comboBoxOptionModel('first81', 'Thirteenth', () => { console.log('13'); }),
        comboBoxOptionModel('first82', 'Fourteenth', () => { console.log('14'); }),
        comboBoxOptionModel('first83', 'Fifteenth', () => { console.log('15'); }),
        comboBoxOptionModel('first84', 'Sixteenth', () => { console.log('16'); }),
        comboBoxOptionModel('first85', 'Seventeenth', () => { console.log('17'); }),
        comboBoxOptionModel('first86', 'Eighteenth', () => { console.log('18'); }),
        comboBoxOptionModel('first87', 'Nineteenth', () => { console.log('19'); }),
        comboBoxOptionModel('first88', 'Twentieth', () => { console.log('20'); }),
        comboBoxOptionModel('first89', 'Twenty first', () => { console.log('21'); }),
        comboBoxOptionModel('first90', 'Twenty second', () => { console.log('22'); }),
        comboBoxOptionModel('first91', 'Twenty third', () => { console.log('23'); }),
      ],
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

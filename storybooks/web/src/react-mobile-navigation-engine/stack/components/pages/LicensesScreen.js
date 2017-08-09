import Button from 'binary-ui-components/mobile/Button';
import React from 'react';

import { MobileNavigationPage } from 'react-mobile-navigation-engine';

import * as SettingsModeTypesEnum from '../../enum/settings-mode-types-enum';

export default class LicensesScreen extends React.Component {

  constructor(props) {
    super(props);
    this.closePageClick = this.closePageClick.bind(this);
    this.connectedHelpText = this.connectedHelpText.bind(this);
  }

  connectedHelpText() {
    this.props.onPageOpen(SettingsModeTypesEnum.HELP);
  }

  closePageClick(e) {
    this.props.onPageClose();
  }

  render() {
    console.log('Render (2)');
    return (
      <div style={{ backgroundColor: 'white', height: '100%', width: '100%' }} >
        <div style={{ textAlign: 'center' }} >Licenses (2)</div>
        <Button onClick={this.connectedHelpText} label="Open Help" />
        <Button onClick={this.closePageClick} label="Go Back" />
      </div>
    );
  }
}

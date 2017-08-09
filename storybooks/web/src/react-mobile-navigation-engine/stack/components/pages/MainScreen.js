import Button from 'binary-ui-components/mobile/Button';
import React from 'react';

import { MobileNavigationPage } from 'react-mobile-navigation-engine';

import * as SettingsModeTypesEnum from '../../enum/settings-mode-types-enum';

export default class MainScreen extends React.Component {

  constructor(props) {
    super(props);
    this.connectedListText = this.connectedListText.bind(this);
    this.connectedHelpText = this.connectedHelpText.bind(this);
  }

  connectedListText() {
    this.props.onPageOpen(SettingsModeTypesEnum.LICENSES);
  }

  connectedHelpText() {
    this.props.onPageOpen(SettingsModeTypesEnum.HELP);
  }

  render() {
    console.log('Render (1)');
    return (
      <div style={{ backgroundColor: 'white', height: '100%', width: '100%' }} >
        <div style={{ textAlign: 'center' }} >Main (1)</div>
        <Button onClick={this.connectedListText} label="Open Licenses" />
        <Button onClick={this.connectedHelpText} label="Open Help" />
      </div>
    );
  }
}

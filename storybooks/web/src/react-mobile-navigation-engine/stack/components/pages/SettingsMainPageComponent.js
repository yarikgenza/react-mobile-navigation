import React from 'react';
import * as SettingsModeTypesEnum from '../../enum/settings-mode-types-enum';
import {  } from 'react-mobile-navigation-core';
import { MobileNavigationPage } from 'react-mobile-navigation-engine';

export default class SettingsMainPageComponent extends React.Component {

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
        <div onClick={this.connectedListText} >
          Open Licenses
        </div>
        <div onClick={this.connectedHelpText} >
          Open Help
        </div>
      </div>
    );
  }
}

SettingsMainPageComponent.defaultProps = {};

SettingsMainPageComponent.propTypes = {};

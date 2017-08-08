import React from 'react';
import * as SettingsModeTypesEnum from '../../enum/settings-mode-types-enum';
import { MobileNavigationPage } from 'react-mobile-navigation-engine';

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
        <div onClick={this.connectedHelpText} >Open Help</div>
        <div onClick={this.closePageClick} >Go Back</div>
      </div>
    );
  }
}

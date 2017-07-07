import React from 'react';
import * as SettingsModeTypesEnum from '../../enum/settings-mode-types-enum';
import { DirectionEnum } from 'react-mobile-navigation-core';
import { MobileNavigationPage } from 'react-mobile-navigation-engine';

export class SettingsLicencesPageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.closePageClick = this.closePageClick.bind(this);
    this.connectedHelpText = this.connectedHelpText.bind(this);
  }

  connectedHelpText() {
    this.props.pagingActions.openPage(
      SettingsModeTypesEnum.HELP,
      DirectionEnum.HORIZONTAL
    );
  }

  closePageClick(e) {
    this.props.pagingActions.goBack();
  }

  render() {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', width: '100%' }} >
        <div style={{ textAlign: 'center' }} >Licenses (2)</div>
        <div onClick={this.connectedHelpText} >
          Open help
        </div>
        <div onClick={this.closePageClick} >
          Go back
        </div>
      </div>
    );
  }
}

SettingsLicencesPageComponent.defaultProps = {
  pagingActions: undefined,
};

SettingsLicencesPageComponent.propTypes = {
  pagingActions: React.PropTypes.any,
};

import React from 'react';
import * as SettingsModeTypesEnum from '../../enum/settings-mode-types-enum';
import { DirectionEnum } from 'react-mobile-navigation-core';
import { MobileNavigationPage } from 'react-mobile-navigation-engine';

export class SettingsMainPageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.connectedListText = this.connectedListText.bind(this);
    this.connectedHelpText = this.connectedHelpText.bind(this);
  }

  connectedListText() {
    this.props.pagingActions.openPage(
      SettingsModeTypesEnum.LICENSES,
      DirectionEnum.VERTICAL
    );
  }

  connectedHelpText() {
    this.props.pagingActions.openPage(
      SettingsModeTypesEnum.HELP,
      DirectionEnum.HORIZONTAL
    );
  }

  render() {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', width: '100%' }} >
        <div style={{ textAlign: 'center' }} >Main</div>
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

SettingsMainPageComponent.defaultProps = {
  pagingActions: undefined,
};

SettingsMainPageComponent.propTypes = {
  pagingActions: React.PropTypes.any,
};

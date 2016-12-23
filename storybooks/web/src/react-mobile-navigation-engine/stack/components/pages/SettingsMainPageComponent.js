import React from 'react';
import * as SettingsModeTypesEnum from '../../enum/settings-mode-types-enum';
import {
  DirectionEnum,
  PageContent,
  PageWrapper,
} from 'react-mobile-navigation-core';
import { MobileNavigationPage } from 'react-mobile-navigation-engine';

export class SettingsMainPageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.connectedListText = this.connectedListText.bind(this);
    this.connectedHelpText = this.connectedHelpText.bind(this);
  }

  connectedListText() {
    this.props.pagingActions.openPage(
      this.props.stackId,
      SettingsModeTypesEnum.LICENSES,
      DirectionEnum.HORIZONTAL
    );
  }

  connectedHelpText() {
    this.props.pagingActions.openPage(
      this.props.stackId,
      SettingsModeTypesEnum.HELP,
      DirectionEnum.HORIZONTAL
    );
  }

  render() {
    const LIST_TEXT = 'LIST_TEXT';
    const HELP_TEXT = 'HELP_TEXT';
    return (
      <PageWrapper>
        <PageContent>
          <div>
            <div onClick={this.connectedListText} >
              {LIST_TEXT}
            </div>
          </div>
          <div>
            <div onClick={this.connectedHelpText} >
              {HELP_TEXT}
            </div>
          </div>
        </PageContent>
      </PageWrapper>
    );
  }
}

SettingsMainPageComponent.defaultProps = {
  pagingActions: undefined,
  stackId: undefined,
};

SettingsMainPageComponent.propTypes = {
  pagingActions: React.PropTypes.any,
  stackId: React.PropTypes.any,
};

import React from 'react';
import * as SettingsModeTypesEnum from '../../enum/settings-mode-types-enum';
import {
  DirectionEnum,
  PageContent,
  PageWrapper,
} from 'react-mobile-navigation-core';
import { MobileNavigationPage } from 'react-mobile-navigation-engine';

export class SettingsLicencesPageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.closePageClick = this.closePageClick.bind(this);
    this.connectedHelpText = this.connectedHelpText.bind(this);
  }

  connectedHelpText() {
    this.props.pagingActions.openPage(
      this.props.stackId,
      SettingsModeTypesEnum.HELP,
      DirectionEnum.HORIZONTAL
    );
  }

  closePageClick(e) {
    this.props.pagingActions.goBack(this.props.stackId);
  }

  render() {
    return (
      <PageWrapper style={{ backgroundColor: 'white' }} >
        <PageContent>
          <div style={{ textAlign: 'center' }} >Licenses</div>
          <div onClick={this.connectedHelpText} >
            Open help
          </div>
          <div onClick={this.closePageClick} >
            Go back
          </div>
        </PageContent>
      </PageWrapper>
    );
  }
}

SettingsLicencesPageComponent.defaultProps = {
  pagingActions: undefined,
  stackId: undefined,
};

SettingsLicencesPageComponent.propTypes = {
  pagingActions: React.PropTypes.any,
  stackId: React.PropTypes.any,
};

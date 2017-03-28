import React from 'react';
import * as SettingsModeTypesEnum from '../../enum/settings-mode-types-enum';
import {
  DirectionEnum,
  PageContent,
  PageWrapper,
} from 'react-mobile-navigation-core';
import { MobileNavigationPage } from 'react-mobile-navigation-engine';

export class SettingsHelpPageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.cache = '1';
    this.closePageClick = this.closePageClick.bind(this);
    this.connectedHelpText = this.connectedHelpText.bind(this);
  }

  componentOpeningDone() {
    console.log('componentOpeningDone', this.cache);
  }

  componentClosingDone() {
    console.log('componentClosingDone', this.cache);
  }

  connectedHelpText() {
    this.props.pagingActions.openPage(
      this.props.stackId,
      SettingsModeTypesEnum.LICENSES,
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
          <div onClick={this.connectedHelpText} >
            Open licenses
          </div>
          <div onClick={this.closePageClick} >
            Go back
          </div>
        </PageContent>
      </PageWrapper>
    );
  }
}

SettingsHelpPageComponent.defaultProps = {
  pagingActions: undefined,
  stackId: undefined,
};

SettingsHelpPageComponent.propTypes = {
  pagingActions: React.PropTypes.any,
  stackId: React.PropTypes.any,
};

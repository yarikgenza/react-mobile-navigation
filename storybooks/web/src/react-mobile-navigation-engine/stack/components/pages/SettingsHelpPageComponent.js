import { ALERT_TYPES } from 'binary-ui-components/mobile/Alert';
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
    this.onClick = this.onClick.bind(this);
    this.openAlert = this.openAlert.bind(this);
    this.closePageClick = this.closePageClick.bind(this);
    this.connectedHelpText = this.connectedHelpText.bind(this);
  }

  onClick() {
    console.log(1);
  }

  openAlert() {
    this.props.alertOpen('text', ALERT_TYPES.CRITICAL, () => { console.log(1); });
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
      SettingsModeTypesEnum.LICENSES
    );
  }

  closePageClick(e) {
    this.props.pagingActions.goBack(this.props.stackId);
    // this.props.pagingActions.goBackForce(this.props.stackId);
  }

  render() {
    return (
      <PageWrapper style={{ backgroundColor: 'white' }} >
        <PageContent>
          <div style={{ textAlign: 'center' }} >Help</div>
          <div onClick={this.connectedHelpText} >
            Open licenses
          </div>
          <div onClick={this.closePageClick} >
            Go back
          </div>
          <div onClick={this.openAlert} >
            Show alert
          </div>
        </PageContent>
      </PageWrapper>
    );
  }
}

SettingsHelpPageComponent.defaultProps = {
  alertOpen: undefined,
  pagingActions: undefined,
  stackId: undefined,
};

SettingsHelpPageComponent.propTypes = {
  alertOpen: React.PropTypes.func,
  pagingActions: React.PropTypes.any,
  stackId: React.PropTypes.any,
};

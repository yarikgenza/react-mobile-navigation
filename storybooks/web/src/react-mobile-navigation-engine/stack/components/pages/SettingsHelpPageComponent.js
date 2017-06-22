import React from 'react';
import * as SettingsModeTypesEnum from '../../enum/settings-mode-types-enum';
import {
  DirectionEnum,
  PageContent,
  PageWrapper,
} from 'react-mobile-navigation-core';
import { MobileNavigationPage } from 'react-mobile-navigation-engine';
import { AlertBox } from 'react-mobile-navigation-alert';

export class SettingsHelpPageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.cache = '1';
    this.openAlert = this.openAlert.bind(this);
    this.closePageClick = this.closePageClick.bind(this);
    this.connectedHelpText = this.connectedHelpText.bind(this);
  }

  openAlert() {
    this.props.alertActions.openPage(
      this.props.stackId,
      this.props.pageId,
      DirectionEnum.VERTICAL,
      this.props.alert.zIndex
    );
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
        <AlertBox
          pageHeight={200}
          pageState={this.props.alert}
          pagingActions={this.props.alertActions}
          stackId={this.props.stackId}
          text="Text here"
          type={undefined}
        />
      </PageWrapper>
    );
  }
}

SettingsHelpPageComponent.defaultProps = {
  alert: undefined,
  pagingActions: undefined,
  stackId: undefined,
  alertActions: undefined,
};

SettingsHelpPageComponent.propTypes = {
  alert: React.PropTypes.any,
  pagingActions: React.PropTypes.any,
  stackId: React.PropTypes.any,
  alertActions: React.PropTypes.any,
};

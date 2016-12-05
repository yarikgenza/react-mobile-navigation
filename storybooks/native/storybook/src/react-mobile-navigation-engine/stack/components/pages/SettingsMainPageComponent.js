import React from 'react';
import { View, Text } from 'react-native';
import * as SettingsModeTypesEnum from '../../enum/settings-mode-types-enum';
import {
  DirectionEnum,
  CustomPageBody,
  PageWrapper,
} from 'react-mobile-navigation-core';

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
    return (
      <PageWrapper>
        <CustomPageBody zIndex={this.props.pageState.zIndex} >
          <View>
            <Text onClick={this.connectedListText} >
              LIST_TEXT
            </Text>
          </View>
          <View>
            <Text onClick={this.connectedHelpText} >
              HELP_TEXT
            </Text>
          </View>
        </CustomPageBody>
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

import React from 'react';
import { View, Text } from 'react-native';
import {
  PageWrapper,
  CustomPageBody,
} from 'react-mobile-navigation-core';
import * as SettingsModeTypesEnum from '../../enum/settings-mode-types-enum';

export class SettingsLicencesPageComponent extends React.Component {

  constructor(props) {
    super(props);

    this.closePageClick = this.closePageClick.bind(this);
  }

  closePageClick(e) {
    this.props.pagingActions.goBack(this.props.stackId);
  }

  render() {
    return (
      <PageWrapper>
        <CustomPageBody zIndex={this.props.pageState.zIndex} >
          <View>
            <Text onClick={this.closePageClick} >
              Licences
            </Text>
          </View>
        </CustomPageBody>
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

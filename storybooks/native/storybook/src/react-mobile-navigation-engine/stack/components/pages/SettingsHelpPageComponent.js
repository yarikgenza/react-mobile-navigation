import React from 'react';
import { View, Text } from 'react-native';
import {
  PageWrapper,
  CustomPageBody,
} from 'react-mobile-navigation-core';
import * as SettingsModeTypesEnum from '../../enum/settings-mode-types-enum';

export class SettingsHelpPageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.cache = '1';
    this.closePageClick = this.closePageClick.bind(this);
  }

  componentOpeningDone() {
    console.log('componentOpeningDone', this.cache);
  }

  componentClosingDone() {
    console.log('componentClosingDone', this.cache);
  }

  closePageClick(e) {
    this.props.pagingActions.goBack(this.props.stackId);
  }

  render() {
    return (
      <PageWrapper>
        <CustomPageBody zIndex={this.props.pageState.zIndex} >
          <View key="1" >
            <Text onClick={this.closePageClick} >
              Help
            </Text>
          </View>
        </CustomPageBody>
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

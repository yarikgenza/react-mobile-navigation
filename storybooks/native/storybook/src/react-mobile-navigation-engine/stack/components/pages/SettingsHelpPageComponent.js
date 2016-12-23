import React from 'react';
import { View, Text } from 'react-native';
import {
  PageWrapper,
  PageContent,
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
        <PageContent>
          <View key="1" >
            <Text onClick={this.closePageClick} >
              Help
            </Text>
          </View>
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

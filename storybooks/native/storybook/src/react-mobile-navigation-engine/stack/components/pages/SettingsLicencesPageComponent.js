import React from 'react';
import { View, Text } from 'react-native';
import {
  PageWrapper,
  PageContent,
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
        <PageContent>
          <View>
            <Text onClick={this.closePageClick} >
              Licences
            </Text>
          </View>
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

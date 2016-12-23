import React from 'react';
import * as SettingsModeTypesEnum from '../../enum/settings-mode-types-enum';
import { PageContent, PageWrapper } from 'react-mobile-navigation-core';
import { MobileNavigationPage } from 'react-mobile-navigation-engine';

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
    const LIST_TEXT = 'Help';
    return (
      <PageWrapper>
        <PageContent>
          <div key={ '1' }>
            <div onClick={this.closePageClick} >
              {LIST_TEXT}
            </div>
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

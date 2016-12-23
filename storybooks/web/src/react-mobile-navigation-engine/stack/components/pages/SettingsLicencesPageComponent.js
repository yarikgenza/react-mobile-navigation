import React from 'react';
import * as SettingsModeTypesEnum from '../../enum/settings-mode-types-enum';
import { PageContent, PageWrapper } from 'react-mobile-navigation-core';
import { MobileNavigationPage } from 'react-mobile-navigation-engine';

export class SettingsLicencesPageComponent extends React.Component {

  constructor(props) {
    super(props);

    this.closePageClick = this.closePageClick.bind(this);
  }

  closePageClick(e) {
    this.props.pagingActions.goBack(this.props.stackId);
  }

  render() {
    const LIST_TEXT = 'Licences';
    return (
      <PageWrapper>
        <PageContent>
          <div>
            <div onClick={this.closePageClick} >
              {LIST_TEXT}
            </div>
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

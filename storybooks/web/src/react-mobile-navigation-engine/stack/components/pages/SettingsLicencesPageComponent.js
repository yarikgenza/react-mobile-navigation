import React from 'react';
import * as SettingsModeTypesEnum from '../../enum/settings-mode-types-enum';
import {
  PageWrapper,
  CustomPageBody,
} from 'react-mobile-navigation-core';

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
        <CustomPageBody zIndex={ this.props.pageState.zIndex }>
          <div>
            <div onClick={this.closePageClick} >
              {LIST_TEXT}
            </div>
          </div>
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

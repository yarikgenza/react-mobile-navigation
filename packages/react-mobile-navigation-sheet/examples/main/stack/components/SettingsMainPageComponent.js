import React from 'react';
import autobind from 'autobind-decorator';
import {
  DirectionEnum,
  CustomPageBody,
  PageWrapper,
} from 'react-mobile-navigation-core';
import {
  ActionSheetPage,
  systemPagesTypesEnum,
} from '../../stack-action-pages';

export class SettingsMainPageComponent extends React.Component {

  constructor(props) {
    super(props);

    this.actionSheetItems = [];
    this.comboBoxItems = [];
    this.comboBoxInputPlaceholder = 'Type Here (Hardcoded)';

    this.state = {
      comboBoxTextFilter: '',
    }
  }

  @autobind
  openActionsheet() {
    this.actionSheetItems = [];
    this.props.actionSheetActions.openPage(
      this.props.stackId,
      this.props.pageId,
      systemPagesTypesEnum.ACTION_SHEET_PAGE_ID,
      DirectionEnum.VERTICAL,
      this.props.pageState.zIndex
    );
  }

  @autobind
  openCombobox() {
    this.comboBoxItems = [];
    this.setState({
      comboBoxTextFilter: '',
    });
    this.props.comboBoxActions.openPage(
      this.props.stackId,
      this.props.pageId,
      systemPagesTypesEnum.COMBOBOX_PAGE_ID,
      DirectionEnum.HORIZONTAL,
      this.props.pageState.zIndex
    );
  }

  @autobind
  onActionSheetSelect(selectedItem) {
    if (selectedItem.key === 'licenses') {
      this.onActionSheetCancel();
    }
  }

  @autobind
  onActionSheetCancel() {
    this.props.actionSheetActions.goBack(
      this.props.stackId,
      this.props.pageId,
      systemPagesTypesEnum.ACTION_SHEET_PAGE_ID
    );
  }

  @autobind
  onComboBoxSelect(selectedItem) {
    if (selectedItem.key === 'first') {
      this.onComboBoxCancel();
    }
  }

  @autobind
  onComboBoxSelectCustom(text) {
    console.log(text, text.handler());
  }

  @autobind
  onComboBoxSetFilter(comboBoxTextFilter) {
    this.setState({
      comboBoxTextFilter,
    });
  }

  @autobind
  onComboBoxCancel() {
    this.props.comboBoxActions.goBack(
      this.props.stackId,
      this.props.pageId,
      systemPagesTypesEnum.COMBOBOX_PAGE_ID
    );
  }

  render() {
    const ACTION_SHEET = 'ACTION_SHEET';
    const actionSheetPageState = this.props.actionSheet;
    const mainPageStyle = {
      backgroundColor: 'white',
      width: '100%',
      height: '100%',
    };
    return (
      <PageWrapper>
        <CustomPageBody zIndex={this.props.pageState.zIndex} >
          <div style={mainPageStyle}>
            <div onClick={this.openActionsheet} >
              {ACTION_SHEET}
            </div>
          </div>
        </CustomPageBody>
        <ActionSheetPage
          onCancel={this.onActionSheetCancel}
          pageState={actionSheetPageState}
          stackId={this.props.stackId}
          pageId={this.props.pageId}
          pagingActions={this.props.actionSheetActions}
        />
      </PageWrapper>
    );
  }
}

SettingsMainPageComponent.defaultProps = {
  pagingActions: undefined,
  stackId: undefined,
  pageId: undefined,
  actionSheet: undefined,
  comboBox: undefined,
  actionSheetActions: undefined,
  comboBoxActions: undefined,
};

SettingsMainPageComponent.propTypes = {
  pagingActions: React.PropTypes.any,
  stackId: React.PropTypes.any,
  pageId: React.PropTypes.any,
  actionSheet: React.PropTypes.any,
  comboBox: React.PropTypes.any,
  actionSheetActions: React.PropTypes.any,
  comboBoxActions: React.PropTypes.any,
};

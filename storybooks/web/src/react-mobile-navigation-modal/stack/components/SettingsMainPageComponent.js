import React from 'react';
import ArrowDown from 'binary-ui-icons/binary/ArrowDown';
import Button from 'binary-ui-components/mobile/Button';
import Group from 'binary-ui-components/mobile/Group';
import Text from 'binary-ui-components/mobile/Text';
import {
  DirectionEnum,
  PageContent,
  PageWrapper,
} from 'react-mobile-navigation-core';
import { Modal } from 'react-mobile-navigation-modal';

export class SettingsMainPageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.comboBoxItems = [];
    this.comboBoxInputPlaceholder = 'Type Here (Hardcoded)';
    this.openCombobox = this.openCombobox.bind(this);
    this.onComboBoxCancel = this.onComboBoxCancel.bind(this);
    this.onComboBoxConfirm = this.onComboBoxConfirm.bind(this);
  }

  openCombobox() {
    this.comboBoxItems = [];
    this.props.comboBoxActions.openPage(
      this.props.stackId,
      this.props.pageId,
      DirectionEnum.VERTICAL,
      this.props.pageState.zIndex
    );
  }

  onComboBoxCancel() {
    console.log('onComboBoxCancel');
  }

  onComboBoxConfirm() {
    console.log('onComboBoxConfirm');
  }

  render() {
    const COMBOBOX = 'COMBOBOX';
    const comboBoxPageState = this.props.comboBox;
    const SIDE_MENU_HEADER_STYLE = {
      backgroundColor: '#eeeae5',
    };
    const SIDE_MENU_BODY_STYLE = {
      backgroundColor: 'white',
      borderRadius: '5px',
      overflowX: 'hidden',
      overflowY: 'auto',
    };
    return (
      <PageWrapper>
        <PageContent zIndex={this.props.pageState.zIndex} >
          <div key={'section 1'}>
            <Group
              renderLeft={() => (<Text isBold >{COMBOBOX}</Text>)}
              renderRight={() => (
                <Button
                  label={COMBOBOX}
                  onClick={this.openCombobox}
                  renderIcon={() => (<ArrowDown />)}
                />
              )}
            />
          </div>
        </PageContent>
        <Modal
          bodyStyle={SIDE_MENU_BODY_STYLE}
          headerStyle={SIDE_MENU_HEADER_STYLE}
          pageHeight={500}
          pageWidth={400}
          pageId={this.props.pageId}
          pageState={comboBoxPageState}
          pagingActions={this.props.comboBoxActions}
          stackId={this.props.stackId}
          stackTitle="Title"
          onCancel={this.onComboBoxCancel}
          onConfirm={this.onComboBoxConfirm}
        />
      </PageWrapper>
    );
  }
}

SettingsMainPageComponent.defaultProps = {
  pagingActions: undefined,
  stackId: undefined,
  pageId: undefined,
  comboBox: undefined,
  comboBoxActions: undefined,
};

SettingsMainPageComponent.propTypes = {
  pagingActions: React.PropTypes.any,
  stackId: React.PropTypes.any,
  pageId: React.PropTypes.any,
  comboBox: React.PropTypes.any,
  comboBoxActions: React.PropTypes.any,
};

import React from 'react';
import {
  ListItem,
  ListItemNameText,
  Button,
  ButtonTypes,
} from 'binary-ui-components';
import {
  DirectionEnum,
  PageContent,
  PageWrapper,
} from 'react-mobile-navigation-core';
import {
  ComboBox,
  comboBoxOptionModel,
  comboBoxCustomOptionModel,
} from 'react-mobile-navigation-combobox';

export class SettingsMainPageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.comboBoxItems = [];
    this.comboBoxInputPlaceholder = 'Type Here (Hardcoded)';
    this.openCombobox = this.openCombobox.bind(this);
    this.onComboBoxSelect = this.onComboBoxSelect.bind(this);
    this.onComboBoxSelectCustom = this.onComboBoxSelectCustom.bind(this);
    this.onComboBoxCancel = this.onComboBoxCancel.bind(this);
  }

  openCombobox() {
    this.comboBoxItems = [
      comboBoxOptionModel('first0', 'Перший', () => { console.log('licenses'); }, { color: 'blue' }),
      comboBoxOptionModel('first1', 'Перший', () => { console.log('licenses'); }, { color: 'blue' }),
      comboBoxOptionModel('first2', 'Перший', () => { console.log('licenses'); }, { color: 'blue' }),
      comboBoxOptionModel('first3', 'Перший', () => { console.log('licenses'); }, { color: 'blue' }),
      comboBoxOptionModel('first4', 'Перший', () => { console.log('licenses'); }, { color: 'blue' }),
      comboBoxOptionModel('first5', 'Перший', () => { console.log('licenses'); }, { color: 'blue' }),
      comboBoxOptionModel('first6', 'Перший', () => { console.log('licenses'); }, { color: 'blue' }),
      comboBoxOptionModel('first7', 'Перший', () => { console.log('licenses'); }, { color: 'blue' }),
      comboBoxOptionModel('first8', 'Перший', () => { console.log('licenses'); }, { color: 'blue' }),
      comboBoxOptionModel('first9', 'Перший', () => { console.log('licenses'); }, { color: 'blue' }),
      comboBoxOptionModel('first10', 'Перший', () => { console.log('licenses'); }, { color: 'blue' }),
      comboBoxOptionModel('first11', 'Перший', () => { console.log('licenses'); }, { color: 'blue' }),
      comboBoxOptionModel('first12', 'Перший', () => { console.log('licenses'); }, { color: 'blue' }),
      comboBoxOptionModel('first13', 'Перший', () => { console.log('licenses'); }, { color: 'blue' }),
      comboBoxOptionModel('first14', 'Перший', () => { console.log('licenses'); }, { color: 'blue' }),
      comboBoxOptionModel('first15', 'Перший', () => { console.log('licenses'); }, { color: 'blue' }),
      comboBoxOptionModel('first16', 'Перший', () => { console.log('licenses'); }, { color: 'blue' }),
      comboBoxOptionModel('first17', 'Перший', () => { console.log('licenses'); }, { color: 'blue' }),
      comboBoxOptionModel('first18', 'Перший', () => { console.log('licenses'); }, { color: 'blue' }),
      comboBoxOptionModel('first19', 'Перший', () => { console.log('licenses'); }, { color: 'blue' }),
      comboBoxOptionModel('first20', 'Перший', () => { console.log('licenses'); }, { color: 'blue' }),
      comboBoxOptionModel('first21', 'Перший', () => { console.log('licenses'); }, { color: 'blue' }),
      comboBoxOptionModel('first22', 'Перший', () => { console.log('licenses'); }, { color: 'blue' }),
    ];
    this.props.comboBoxActions.openPage(
      this.props.stackId,
      this.props.pageId,
      DirectionEnum.VERTICAL,
      this.props.pageState.zIndex
    );
  }

  onComboBoxSelect(selectedItem) {
    if (selectedItem.key === 'first') {
      // this.onComboBoxCancel();
    }
  }

  onComboBoxSelectCustom(text) {
    console.log(text, text.handler());
  }

  onComboBoxCancel() {
    console.log('onComboBoxCancel');
  }

  render() {
    const COMBOBOX = 'COMBOBOX';
    const comboboxData = {
      text: COMBOBOX,
      type: ButtonTypes.DOWN,
      onClick: this.openCombobox,
    };
    const comboBoxPageState = this.props.comboBox;
    const customOptionModel = comboBoxCustomOptionModel(() => { console.log(this); });
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
            <ListItem>
              <ListItemNameText>
                {COMBOBOX}
              </ListItemNameText>
              <Button {...comboboxData} />
            </ListItem>
          </div>
        </PageContent>
        <ComboBox
          stackTitle="Title"
          customOptionModel={customOptionModel}
          items={this.comboBoxItems}
          itemStyleValue={false}
          inputPlaceholder={this.comboBoxInputPlaceholder}
          allowCustomValue
          bodyStyle={SIDE_MENU_BODY_STYLE}
          headerStyle={SIDE_MENU_HEADER_STYLE}
          pageHeight={500}
          pageWidth={400}
          onCancel={this.onComboBoxCancel}
          onSelect={this.onComboBoxSelect}
          onSelectCustom={this.onComboBoxSelectCustom}
          pageState={comboBoxPageState}
          stackId={this.props.stackId}
          pageId={this.props.pageId}
          pagingActions={this.props.comboBoxActions}
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

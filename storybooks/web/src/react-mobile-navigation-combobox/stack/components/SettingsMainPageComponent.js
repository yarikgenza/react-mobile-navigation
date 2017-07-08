import React from 'react';
import ArrowDown from 'binary-ui-icons/binary/ArrowDown';
import Button from 'binary-ui-components/mobile/Button';
import Group from 'binary-ui-components/mobile/Group';
import Text from 'binary-ui-components/mobile/Text';
import { DirectionEnum } from 'react-mobile-navigation-core';
import {
  ComboBox,
  comboBoxOptionModel,
  comboBoxCustomOptionModel,
} from 'react-mobile-navigation-combobox';

export default class SettingsMainPageComponent extends React.Component {

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
      comboBoxOptionModel('first0', 'First', () => { console.log('1'); }, { color: 'blue' }),
      comboBoxOptionModel('first1', 'Second', () => { console.log('2'); }),
      comboBoxOptionModel('first2', 'Third', () => { console.log('3'); }),
      comboBoxOptionModel('first3', 'Fourth', () => { console.log('4'); }),
      comboBoxOptionModel('first4', 'Fifth', () => { console.log('5'); }),
      comboBoxOptionModel('first5', 'Sixth', () => { console.log('6'); }),
      comboBoxOptionModel('first6', 'Seventh', () => { console.log('7'); }),
      comboBoxOptionModel('first7', 'Eighth', () => { console.log('8'); }),
      comboBoxOptionModel('first8', 'Ninth', () => { console.log('9'); }),
      comboBoxOptionModel('first9', 'Tenth', () => { console.log('10'); }),
      comboBoxOptionModel('first10', 'Eleventh', () => { console.log('11'); }),
      comboBoxOptionModel('first11', 'Twelveth', () => { console.log('12'); }),
      comboBoxOptionModel('first12', 'Thirteenth', () => { console.log('13'); }),
      comboBoxOptionModel('first13', 'Fourteenth', () => { console.log('14'); }),
      comboBoxOptionModel('first14', 'Fifteenth', () => { console.log('15'); }),
      comboBoxOptionModel('first15', 'Sixteenth', () => { console.log('16'); }),
      comboBoxOptionModel('first16', 'Seventeenth', () => { console.log('17'); }),
      comboBoxOptionModel('first17', 'Eighteenth', () => { console.log('18'); }),
      comboBoxOptionModel('first18', 'Nineteenth', () => { console.log('19'); }),
      comboBoxOptionModel('first19', 'Twentieth', () => { console.log('20'); }),
      comboBoxOptionModel('first20', 'Twenty first', () => { console.log('21'); }),
      comboBoxOptionModel('first21', 'Twenty second', () => { console.log('22'); }),
      comboBoxOptionModel('first22', 'Twenty third', () => { console.log('23'); }),
    ];
    /*
    this.props.comboBoxActions.openPage(
      this.props.pageId,
      DirectionEnum.VERTICAL,
      this.props.pageState.zIndex
    );
    */
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
    );
  }
}

SettingsMainPageComponent.defaultProps = {
  pageId: undefined,
  comboBox: undefined,
};

SettingsMainPageComponent.propTypes = {
  pageId: React.PropTypes.any,
  comboBox: React.PropTypes.any,
};

import React from 'react';
import { Dimensions, Text, View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import ComboBox, { comboBoxOptionModel } from 'react-mobile-navigation-combobox';

import Demo from './Demo';

const { height, width } = Dimensions.get('window');

storiesOf('Demo', module)
  .add('all in one', () => (
    <Demo />
  ));

storiesOf('Combobox', module)
  .add('empty', () => (
    <ComboBox
      {...{
        bodyStyle: {
          backgroundColor: 'white',
          // overflowX: 'hidden',
          // overflowY: 'auto',
        },
        headerStyle: {
          backgroundColor: '#eeeae5',
        },
        allowCustomValue: false,
        customOptionModel: undefined,
        items: [],
        inputPlaceholder: 'Placeholder',
        isBold: true,
        noOptionsMatchingInputLabel: 'No matches',
        pressEnterToSaveCustomFieldLabel: 'Press enter',
        title: 'ComboBox title',
        onCancel: action(),
        onSelect: action(),
        onSelectCustom: action(),
      }}
      isVisible={true}
      pageHeight={height}
      pageWidth={width}
      onCloseStart={action()}
      onCloseDone={action()}
    />
  ))
  .add('with options', () => (
    <ComboBox
      {...{
        bodyStyle: {
          backgroundColor: 'white',
          // overflowX: 'hidden',
          // overflowY: 'auto',
        },
        headerStyle: {
          backgroundColor: '#eeeae5',
        },
        allowCustomValue: true,
        customOptionModel: undefined,
        items: [
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
        ],
        inputPlaceholder: 'Type to search',
        noOptionsMatchingInputLabel: 'No matches',
        pressEnterToSaveCustomFieldLabel: 'Press enter to save custom field',
        title: 'ComboBox with options',
        onCancel: action(),
        onSelect: action(),
        onSelectCustom: action(),
      }}
      isVisible={true}
      pageHeight={height}
      pageWidth={width}
      onCloseStart={action()}
      onCloseDone={action()}
    />
  ));

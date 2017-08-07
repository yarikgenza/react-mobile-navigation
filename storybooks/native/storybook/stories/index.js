import React from 'react';
import { Dimensions, Text, View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import ComboBox from 'react-mobile-navigation-combobox';
import { PageStatusTypesEnum } from 'react-mobile-navigation-core';

import Button from './Button';
import CenterView from './CenterView';
import Welcome from './Welcome';

const { height, width } = Dimensions.get('window');

storiesOf('ComboBox', module)
  .add('Empty', () => (
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
      pageHeight={height}
      pageStatus={PageStatusTypesEnum.OPEN_DONE}
      pageWidth={width}
      zIndex={1000}
      onComboBoxOpenDone={action()}
      onComboBoxCloseStart={action()}
      onComboBoxCloseDone={action()}
    />
  ))
.add('With options', () => (
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
        items: [],
        inputPlaceholder: 'Type to search',
        noOptionsMatchingInputLabel: 'No matches',
        pressEnterToSaveCustomFieldLabel: 'Press enter to save custom field',
        title: 'ComboBox with options',
        onCancel: action(),
        onSelect: action(),
        onSelectCustom: action(),
      }}
      pageHeight={height}
      pageStatus={PageStatusTypesEnum.OPEN_DONE}
      pageWidth={width}
      zIndex={1000}
      onComboBoxOpenDone={action()}
      onComboBoxCloseStart={action()}
      onComboBoxCloseDone={action()}
    />
  ));

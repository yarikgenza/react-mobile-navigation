import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ComboBox, { comboBoxOptionModel } from 'react-mobile-navigation-combobox';
import { actionPageStoreModel } from 'react-mobile-navigation-core';

import ActionSheet from './ActionSheet';
import Alert from './Alert';

import * as Settings1ModeTypesEnum from '../src/react-mobile-navigation-action-sheet/stack/enum/settings-mode-types-enum';
import Engine from '../src/react-mobile-navigation-engine/stack/components/SettingsComponent';
import * as Settings2ModeTypesEnum from '../src/react-mobile-navigation-engine/stack/enum/settings-mode-types-enum';

const width = 400;
const height = 500;
const style = {
  position: 'absolute',
  height: height,
  width: width,
};

storiesOf('Demo', module)
  .add('all in one', () => (
    <div style={style} >
      <style>
        {`html, body, #CardsApp {
          width: 100%;
          height: 100%;
        }
        body {
          margin: 0;
          background-color: #eeeae5;
        }`}
      </style>
      <Engine />
    </div>
  ));

storiesOf('ActionSheet', module)
  .add('opened', () => (
    <div style={style} >
      <style>
        {`html, body, #CardsApp {
          width: 100%;
          height: 100%;
        }
        body {
          margin: 0;
          background-color: #eeeae5;
        }`}
      </style>
      <ActionSheet isOpened/>
    </div>
  ))
  .add('closed', () => (
    <div style={style} >
      <style>
        {`html, body, #CardsApp {
          width: 100%;
          height: 100%;
        }
        body {
          margin: 0;
          background-color: #eeeae5;
        }`}
      </style>
      <ActionSheet/>
    </div>
  ))

storiesOf('Alert', module)
  .add('opened', () => (
    <div style={style} >
      <style>
        {`html, body, #CardsApp {
          width: 100%;
          height: 100%;
        }
        body {
          margin: 0;
          background-color: #eeeae5;
        }`}
      </style>
      <Alert isOpened/>
    </div>
  ))
  .add('closed', () => (
    <div style={style} >
      <style>
        {`html, body, #CardsApp {
          width: 100%;
          height: 100%;
        }
        body {
          margin: 0;
          background-color: #eeeae5;
        }`}
      </style>
      <Alert/>
    </div>
  ))
  .add('auto hide', () => (
    <div style={style} >
      <style>
        {`html, body, #CardsApp {
          width: 100%;
          height: 100%;
        }
        body {
          margin: 0;
          background-color: #eeeae5;
        }`}
      </style>
      <Alert autoHide/>
    </div>
  ))

storiesOf('Combobox', module)
  .add('empty', () => (
    <div style={style} >
      <style>
        {`html, body, #CardsApp {
          width: 100%;
          height: 100%;
        }
        body {
          margin: 0;
          background-color: #eeeae5;
        }`}
      </style>
      <ComboBox
        {...{
          bodyStyle: {
            backgroundColor: 'white',
            overflowX: 'hidden',
            overflowY: 'auto',
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
    </div>
  ))
  .add('with options', () => (
    <div style={style} >
      <style>
        {`html, body, #CardsApp {
          width: 100%;
          height: 100%;
        }
        body {
          margin: 0;
          background-color: #eeeae5;
        }`}
      </style>
      <ComboBox
        {...{
          bodyStyle: {
            backgroundColor: 'white',
            overflowX: 'hidden',
            overflowY: 'auto',
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
    </div>
  ));

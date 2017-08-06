import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ComboBox from 'react-mobile-navigation-combobox';
import { actionPageStoreModel, PageStatusTypesEnum } from 'react-mobile-navigation-core';
import ActionSheet from '../src/react-mobile-navigation-action-sheet/stack/components/SettingsComponent';
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
const MAIN_PAGE_ID = 'MAIN_PAGE_ID';
const pageState = mobileNavigationPageStoreModel(PageStatusTypesEnum.OPEN_DONE, 1, undefined);
function mobileNavigationPageStoreModel(status, zIndex, prevPageId) {
  return {
    prevPageId,
    status,
    zIndex: zIndex,
  };
}

storiesOf('Examples', module)
  .add('combobox', () => (
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
        pageHeight={height}
        pageStatus={PageStatusTypesEnum.OPEN_DONE}
        pageWidth={width}
        zIndex={1000}
        onComboBoxOpenDone={action()}
        onComboBoxCloseStart={action()}
        onComboBoxCloseDone={action()}
      />
    </div>
  ))
  .add('demo', () => (
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

import React from 'react';
import infoAddon from '@storybook/addon-info';
import { storiesOf,  setAddon } from '@storybook/react';
import { actionPageStoreModel, PageStatusTypesEnum } from 'react-mobile-navigation-core';
import ActionSheet from '../src/react-mobile-navigation-action-sheet/stack/components/SettingsComponent';
import * as Settings1ModeTypesEnum from '../src/react-mobile-navigation-action-sheet/stack/enum/settings-mode-types-enum';
import Engine from '../src/react-mobile-navigation-engine/stack/components/SettingsComponent';
import * as Settings2ModeTypesEnum from '../src/react-mobile-navigation-engine/stack/enum/settings-mode-types-enum';
import ComboBox from '../src/react-mobile-navigation-combobox/stack/components/SettingsMainPageComponent';

setAddon(infoAddon);

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

storiesOf('examples', module)
  .addWithInfo('react-mobile-navigation-action-sheet', () => (
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
      <ActionSheet />
    </div>
  ))
  .addWithInfo('react-mobile-navigation-combobox', () => (
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
      <ComboBox pageState={{ zIndex: 1 }} />
    </div>
  ))
  .addWithInfo('react-mobile-navigation-engine', () => (
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

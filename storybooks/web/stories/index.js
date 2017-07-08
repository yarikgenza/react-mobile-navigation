import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { actionPageStoreModel, PageStatusTypesEnum } from 'react-mobile-navigation-core';
import {
  MobileNavigationPage,
  mobileNavigationCreateInitState,
  mobileNavigationInitStatePseudoActions,
} from 'react-mobile-navigation-engine';
import ActionSheet from '../src/react-mobile-navigation-action-sheet/stack/components/SettingsComponent';
import * as Settings1ModeTypesEnum from '../src/react-mobile-navigation-action-sheet/stack/enum/settings-mode-types-enum';
import Engine from '../src/react-mobile-navigation-engine/stack/components/SettingsComponent';
import * as Settings2ModeTypesEnum from '../src/react-mobile-navigation-engine/stack/enum/settings-mode-types-enum';
import Sheet from '../src/react-mobile-navigation-sheet/stack/components/SettingsMainPageComponent';
import ComboBox from '../src/react-mobile-navigation-combobox/stack/components/SettingsMainPageComponent';
import Modal from '../src/react-mobile-navigation-modal/stack/components/SettingsMainPageComponent';

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
    direction: undefined,
    prevPageId,
    status,
    zIndex: zIndex,
  };
}

storiesOf('examples', module)
  .add('react-mobile-navigation-action-sheet', () => (
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
  .add('react-mobile-navigation-combobox', () => (
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
  .add('react-mobile-navigation-engine', () => (
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
  ))
  .add('react-mobile-navigation-modal', () => (
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
      <Modal pageState={{ zIndex: 1 }} >
        Here is my text
      </Modal>
    </div>
  ))
  .add('react-mobile-navigation-sheet', () => (
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
      <Sheet
        pageState={pageState}
        pageId="pageId"
        pagingActions={{}}
        pageId={MAIN_PAGE_ID}
        pageWidth={width}
        pageHeight={height}
      />
    </div>
  ));

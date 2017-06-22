import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Provider } from 'react-redux';
import { actionPageStoreModel, PageStatusTypesEnum } from 'react-mobile-navigation-core';
import {
  MobileNavigationPage,
  mobileNavigationCreateInitState,
  mobileNavigationInitStatePseudoActions,
} from 'react-mobile-navigation-engine';
import configureStore1 from '../src/react-mobile-navigation-action-sheet/stack/store/configure-store';
import SettingsContainer1 from '../src/react-mobile-navigation-action-sheet/stack/container/SettingsContainer';
import * as Settings1ModeTypesEnum from '../src/react-mobile-navigation-action-sheet/stack/enum/settings-mode-types-enum';
import configureStore2 from '../src/react-mobile-navigation-engine/stack/store/configure-store';
import SettingsContainer2 from '../src/react-mobile-navigation-engine/stack/container/SettingsContainer';
import * as Settings2ModeTypesEnum from '../src/react-mobile-navigation-engine/stack/enum/settings-mode-types-enum';
import configureStore3 from '../src/react-mobile-navigation-sheet/stack/store/configure-store';
import SettingsMainPageContainer3 from '../src/react-mobile-navigation-sheet/stack/container/SettingsMainPageContainer';
import configureStore4 from '../src/react-mobile-navigation-combobox/stack/store/configure-store';
import ComboboxContainer from '../src/react-mobile-navigation-combobox/stack/container/SettingsMainPageContainer';
import configureStore5 from '../src/react-mobile-navigation-modal/stack/store/configure-store';
import ModalContainer from '../src/react-mobile-navigation-modal/stack/container/SettingsMainPageContainer';

const width = 400;
const height = 500;
const style = {
  position: 'absolute',
  height: height,
  width: width,
};
const MAIN_PAGE_ID = 'MAIN_PAGE_ID';
const stackId = 'stack-id';
const pageState = mobileNavigationPageStoreModel(PageStatusTypesEnum.OPEN_DONE, 1, undefined);
function mobileNavigationPageStoreModel(status, zIndex, prevPageId) {
  return Object.assign({}, actionPageStoreModel(status, zIndex), {
    prevPageId,
    direction: undefined,
  });
}

const store1 = configureStore1({
  mainPageReducers: undefined,
});
const store2 = configureStore2({});
const store3 = configureStore3();
const store4 = configureStore4();
const store5 = configureStore5();

storiesOf('examples', module)
  .add('react-mobile-navigation-action-sheet', () => (
    <Provider store={store1} >
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
        <SettingsContainer1 stackId={stackId} />
      </div>
    </Provider>
  ))
  .add('react-mobile-navigation-combobox', () => (
    <Provider store={store4} >
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
        <ComboboxContainer pageState={{ zIndex: 1 }} stackId={stackId} />
      </div>
    </Provider>
  ))
  .add('react-mobile-navigation-engine', () => (
    <Provider store={store2} >
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
        <SettingsContainer2 stackId={stackId} />
      </div>
    </Provider>
  ))
  .add('react-mobile-navigation-modal', () => (
    <Provider store={store5} >
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
        <ModalContainer pageState={{ zIndex: 1 }} stackId={stackId} >
          Here is my text
        </ModalContainer>
      </div>
    </Provider>
  ))
  .add('react-mobile-navigation-sheet', () => (
    <Provider store={store3} >
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
        <SettingsMainPageContainer3
          pageState={pageState}
          pageId="pageId"
          pagingActions={{}}
          pageId={MAIN_PAGE_ID}
          pageWidth={width}
          pageHeight={height}
          stackId={stackId}
        />
      </div>
    </Provider>
  ));

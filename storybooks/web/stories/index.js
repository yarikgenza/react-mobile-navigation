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
// import * as Settings3ModeTypesEnum from '../src/react-mobile-navigation-sheet/stack/enum/settings-mode-types-enum';

const width = 400;
const height = 500;
const style = {
  position: 'absolute',
  height: height,
  width: width,
};
const MAIN_PAGE_ID = 'MAIN_PAGE_ID';
const stackId = 'stackId';
const pageState = mobileNavigationPageStoreModel(PageStatusTypesEnum.OPEN_DONE, 1, undefined);
function mobileNavigationPageStoreModel(status, zIndex, prevPageId) {
  return Object.assign({}, actionPageStoreModel(status, zIndex), {
    prevPageId,
    direction: undefined,
  });
}

const store1 = configureStore1({
  mobileNavigationReducers: mobileNavigationCreateInitState(Settings1ModeTypesEnum.MAIN, [
    Settings1ModeTypesEnum.MAIN,
  ]),
  mainPageReducers: undefined,
});
const store2 = configureStore2({
  mobileNavigationReducers: mobileNavigationCreateInitState(Settings2ModeTypesEnum.MAIN, [
    Settings2ModeTypesEnum.MAIN,
    Settings2ModeTypesEnum.LICENSES,
    Settings2ModeTypesEnum.HELP
  ], [
    mobileNavigationInitStatePseudoActions.openPageHorizontal(Settings2ModeTypesEnum.HELP),
  ]),
});
const store3 = configureStore3();

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
        <SettingsContainer1 />
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
        <SettingsContainer2 />
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
          stackId={stackId}
          pageId="pageId"
          pagingActions={{}}
          pageId={MAIN_PAGE_ID}
          pageWidth={width}
          pageHeight={height}
        />
      </div>
    </Provider>
  ));

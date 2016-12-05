import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Provider } from 'react-redux';
import { actionPageStoreModel, PageStatusTypesEnum } from 'react-mobile-navigation-core';
import { StandardPageComponent } from 'react-mobile-navigation-engine';
import configureStore1 from '../src/react-mobile-navigation-action-sheet/stack/store/configure-store';
import SettingsMainPageContainer1 from '../src/react-mobile-navigation-action-sheet/stack/container/SettingsMainPageContainer';
import configureStore2 from '../src/react-mobile-navigation-engine/stack/store/configure-store';
import SettingsContainer2 from '../src/react-mobile-navigation-engine/stack/container/SettingsContainer';
import configureStore3 from '../src/react-mobile-navigation-sheet/stack/store/configure-store';
import SettingsMainPageContainer3 from '../src/react-mobile-navigation-sheet/stack/container/SettingsMainPageContainer';

const width = 400;
const height = 500;
const style = {
  position: 'absolute',
  height: height,
  width: width,
};
const MAIN_PAGE_ID = 'MAIN_PAGE_ID';
const stackId = 'stackId';
const pageState = pageStoreModel(PageStatusTypesEnum.OPENED, 1, undefined);
function pageStoreModel(status, zIndex, prevPageId) {
  return Object.assign({}, actionPageStoreModel(status, zIndex), {
    prevPageId,
    direction: undefined,
  });
}

const store1 = configureStore1();
const store2 = configureStore2();
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
        <StandardPageComponent
          pageState={pageState}
          stackId={stackId}
          pagingActions={{}}
          pageId={MAIN_PAGE_ID}
        >
          <SettingsMainPageContainer1 />
        </StandardPageComponent>
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

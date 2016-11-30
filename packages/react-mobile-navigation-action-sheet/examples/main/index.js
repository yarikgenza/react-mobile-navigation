import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { actionPageStoreModel, PageStatusTypesEnum } from 'react-mobile-navigation-core';
import { StandardPageComponent } from 'react-mobile-navigation-engine';
import configureStore from './stack/store/configure-store';
import SettingsMainPageContainer from './stack/container/SettingsMainPageContainer';

/*
import 'cards-fonts/src/fira-sans/fira-sans.css';
*/

function pageStoreModel(status, zIndex, prevPageId) {
  return Object.assign({}, actionPageStoreModel(status, zIndex), {
    prevPageId,
    direction: undefined,
  });
}

const store = configureStore();
const MAIN_PAGE_ID = 'MAIN_PAGE_ID';
const style = {
  position: 'absolute',
  height: '500px',
  width: '400px',
};
const stackId = 'stackId';
const pageState = pageStoreModel(PageStatusTypesEnum.OPENED, 1, undefined);

ReactDOM.render(
  <Provider store={store}>
    <div style={style}>
      <StandardPageComponent
        pageState={pageState}
        stackId={stackId}
        pagingActions={{}}
        pageId={MAIN_PAGE_ID}
      >
        <SettingsMainPageContainer />
      </StandardPageComponent>
    </div>
  </Provider>,
  document.getElementById('CardsApp')
);

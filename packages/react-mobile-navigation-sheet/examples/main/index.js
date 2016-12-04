import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stack/store/configure-store';
import { actionPageStoreModel, PageStatusTypesEnum } from 'react-mobile-navigation-core';
import SettingsMainPageContainer from './stack/container/SettingsMainPageContainer';

function pageStoreModel(status, zIndex, prevPageId) {
  return Object.assign({}, actionPageStoreModel(status, zIndex), {
    prevPageId,
    direction: undefined,
  });
}

const store = configureStore();
const MAIN_PAGE_ID = 'MAIN_PAGE_ID';
const width = 400;
const height = 500;
const style = {
  position: 'absolute',
  height: `${height}px`,
  width: `${width}px`,
};
const stackId = 'stackId';
const pageId = 'pageId';
const pageState = pageStoreModel(PageStatusTypesEnum.OPENED, 1, undefined);

ReactDOM.render(
  <Provider store={store}>
    <div style={style}>
      <SettingsMainPageContainer
        pageState={pageState}
        stackId={stackId}
        pageId={pageId}
        pagingActions={{}}
        pageId={MAIN_PAGE_ID}
        pageWidth={width}
        pageHeight={height}
      />
    </div>
  </Provider>,
  document.getElementById('CardsApp')
);

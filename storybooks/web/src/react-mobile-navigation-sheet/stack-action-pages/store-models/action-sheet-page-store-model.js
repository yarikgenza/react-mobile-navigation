import { actionPageStoreModel } from 'react-mobile-navigation-core';

export function actionSheetPageStoreModel(status, zIndex) {
  return Object.assign({}, actionPageStoreModel(status, zIndex), {
    items: [],
    selectedItem: undefined,
  });
}

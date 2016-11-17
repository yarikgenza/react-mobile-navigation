import { actionPageStoreModel } from 'react-mobile-navigation-core';

export function pageStoreModel(status, zIndex, prevPageId) {
  return Object.assign({}, actionPageStoreModel(status, zIndex), {
    prevPageId,
  });
}

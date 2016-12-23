import { actionPageStoreModel } from 'react-mobile-navigation-core';

export default (status, zIndex, prevPageId) => (
  Object.assign({}, actionPageStoreModel(status, zIndex), {
    prevPageId,
  })
);

import { actionPageStoreModel } from 'react-mobile-navigation-core';

export default(status, zIndex) => (
  Object.assign({}, actionPageStoreModel(status, zIndex), {
    items: [],
    selectedItem: undefined,
  })
);

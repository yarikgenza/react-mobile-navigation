import { actionPageStoreModel } from 'react-mobile-navigation-core';

export default (status, zIndex) => {
  return Object.assign({}, actionPageStoreModel(status, zIndex), {
    items: [],
    selectedItem: undefined,
  });
};

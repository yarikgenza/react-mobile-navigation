import { PageStatusTypesEnum } from 'react-mobile-navigation-core';
import { getInitPage, getPrevPageId } from './page-manager';

const { BACK_ANIMATING_OUT_DONE, OPEN_DONE } = PageStatusTypesEnum;

function getInitPages(activePageId, pagesList) {
  return pagesList.reduce((accumulator, currentValue) => (
    Object.assign({}, accumulator, {
      [currentValue]: getInitPage(activePageId === currentValue),
    })
  ), {});
}

export default (activePageId, pagesList, actions = []) => (
  actions.reduce((accumulator, action) => {
    const newPageId = action.pageName;
    const currentPageId = getPrevPageId(accumulator, newPageId);
    return Object.assign({}, accumulator, {
      activePageId: newPageId,
      pages: Object.assign({}, accumulator.pages, {
        [currentPageId]: Object.assign({}, accumulator.pages[currentPageId], {
          direction: action.direction,
          status: BACK_ANIMATING_OUT_DONE,
        }),
        [newPageId]: Object.assign({}, accumulator.pages[newPageId], {
          direction: action.direction,
          prevPageId: currentPageId,
          status: OPEN_DONE,
          zIndex: accumulator.pages[currentPageId].zIndex + 1,
        }),
      }),
    });
  }, {
    activePageId,
    pages: getInitPages(activePageId, pagesList),
  })
);

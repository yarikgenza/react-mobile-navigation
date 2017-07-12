import { PageStatusTypesEnum } from 'react-mobile-navigation-core';

export function getPagingPrevPageById(pages, pageIdActive) {
  return pages[pageIdActive].prevPageId;
}

export function getPrevPageById(pages, pageIdActive) {
  return getPagingPrevPageById(pages, pageIdActive);
}

function isCurrentPageActive(state, pageId) {
  return pageId === state.pageIdActive;
}

export function getPrevPageId(state, pageId) {
  return isCurrentPageActive(state, pageId)
    ? getPrevPageById(state.pages, state.pageIdActive)
    : state.pageIdActive;
}

export function getInitPage(isDefaultPage) {
  return {
    direction: undefined,
    prevPageId: undefined,
    status: isDefaultPage ? PageStatusTypesEnum.OPEN_DONE : PageStatusTypesEnum.CLOSE_DONE,
    zIndex: isDefaultPage ? 1 : 0,
  };
}

export function isPrevPage(pages, pageIdNew) {
  return Object.keys(pages).find(pageId => pages[pageId].prevPageId === pageIdNew) !== undefined;
}

import { PageStatusTypesEnum } from 'react-mobile-navigation-core';

const { OPEN_DONE, CLOSE_DONE } = PageStatusTypesEnum;

export function getPagingPrevPageById(pages, pageIdActive) {
  return pages[pageIdActive].prevPageId;
}

function isCurrentPageActive(state, pageId) {
  return pageId === state.pageIdActive;
}

export function getPrevPageById(pages, pageIdActive) {
  return getPagingPrevPageById(pages, pageIdActive);
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
    status: isDefaultPage ? OPEN_DONE : CLOSE_DONE,
    zIndex: isDefaultPage ? 1 : 0,
  };
}

export function isPrevPage(pages, pageIdNew) {
  return Object.keys(pages).find(pageId => pages[pageId].prevPageId === pageIdNew) !== undefined;
}

import { PageStatusTypesEnum } from 'react-mobile-navigation-core';

const { OPEN_DONE, CLOSE_DONE } = PageStatusTypesEnum;

export function getPagingPrevPageById(pages, activePageId) {
  return pages[activePageId].prevPageId;
}

function isCurrentPageActive(state, pageId) {
  return pageId === state.activePageId;
}

export function getPrevPageById(pages, activePageId) {
  return getPagingPrevPageById(pages, activePageId);
}

export function getPrevPageId(state, pageId) {
  return isCurrentPageActive(state, pageId)
    ? getPrevPageById(state.pages, state.activePageId)
    : state.activePageId;
}

export function getInitPage(isDefaultPage) {
  return {
    direction: undefined,
    isShow: false,
    prevPageId: undefined,
    status: isDefaultPage ? OPEN_DONE : CLOSE_DONE,
    zIndex: isDefaultPage ? 1 : 0,
  };
}

export function isPrevPage(pages, pageIdNew) {
  return Object.keys(pages).find(pageId => pages[pageId].prevPageId === pageIdNew) !== undefined;
}

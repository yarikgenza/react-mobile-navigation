import { PageStatusTypesEnum } from 'react-mobile-navigation-core';
import mobileNavigationPageStoreModel from '../store-models/page-store-model';

const { OPEN_DONE, CLOSE_DONE } = PageStatusTypesEnum;

export function getPagingPrevPageById(pages, activePageId) {
  return pages[activePageId].prevPageId;
}

function isCurrentPageActive(state, pageName) {
  return pageName === state.activePageId;
}

export function getPrevPageById(state) {
  return getPagingPrevPageById(state.pages, state.activePageId);
}

export function getPrevPageId(state, pageName) {
  return isCurrentPageActive(state, pageName) ? getPrevPageById(state) : state.activePageId;
}

export function getPageById(children, pageId) {
  return children.find(child => child.props.pageId === pageId);
}

export function getInitPage(isDefaultPage) {
  return mobileNavigationPageStoreModel(
    isDefaultPage ? OPEN_DONE : CLOSE_DONE,
    isDefaultPage ? 1 : 0,
    undefined
  );
}

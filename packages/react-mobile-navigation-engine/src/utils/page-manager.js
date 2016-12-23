import { PageStatusTypesEnum } from 'react-mobile-navigation-core';
import mobileNavigationPageStoreModel from '../store-models/page-store-model';

const { OPEN_DONE, CLOSE_DONE } = PageStatusTypesEnum;

export function getActivePageId(systemData, defaultPageId) {
  if (systemData.activePageId === undefined) {
    return defaultPageId;
  }
  return systemData.activePageId;
}

export function getPageById(children, pageId) {
  return children.find(child => child.props.pageId === pageId);
}

function getInitPage(isDefaultPage) {
  return mobileNavigationPageStoreModel(
    isDefaultPage ? OPEN_DONE : CLOSE_DONE,
    isDefaultPage ? 1 : 0,
    undefined
  );
}

export function getPageState(systemData, defaultPageId, pageId) {
  const pageState = systemData.pages[pageId];
  if (!pageState) {
    return getInitPage(defaultPageId === pageId);
  }
  return pageState;
}

// TODO: improve logic
export function initStack(children, defaultPageId, mobileNavigationActions, stackId) {
  const pages = {};
  children.forEach((child) => {
    const pageId = child.props.pageId;
    pages[pageId] = getInitPage(pageId === defaultPageId);
  });
  mobileNavigationActions.initStack(
    stackId,
    defaultPageId,
    pages
  );
}

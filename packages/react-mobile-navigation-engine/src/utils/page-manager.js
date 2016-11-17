import { PageStatusTypesEnum } from 'react-mobile-navigation-core';
import { pageStoreModel } from '../store-models/page-store-model';

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
  return pageStoreModel(
    isDefaultPage ? PageStatusTypesEnum.OPENED : PageStatusTypesEnum.CLOSED,
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

export function initStack(children, defaultPageId, stackSystemDataActions, stackId) {
  const pages = {};
  children.forEach((child) => {
    const pageId = child.props.pageId;
    pages[pageId] = getInitPage(pageId === defaultPageId);
  });
  stackSystemDataActions.initStack(
    stackId,
    defaultPageId,
    pages
  );
}

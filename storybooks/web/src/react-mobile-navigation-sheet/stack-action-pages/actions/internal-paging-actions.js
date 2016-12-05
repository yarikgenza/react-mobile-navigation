import {
  INTERNAL_GO_BACK,
  INTERNAL_GOING_BACK,
  INTERNAL_GOING_BACK_DONE,
  INTERNAL_OPEN_PAGE,
  INTERNAL_OPENING_PAGE,
  INTERNAL_OPENING_PAGE_DONE,
} from '../constants/internal-paging-action-types';

export function openPage(stackId, pageName, internalPageName, direction, zIndex) {
  return { type: INTERNAL_OPEN_PAGE, stackId, pageName, internalPageName, direction, zIndex };
}

export function openingPage(stackId, pageName, internalPageName) {
  return { type: INTERNAL_OPENING_PAGE, stackId, pageName, internalPageName };
}

export function openingPageDone(stackId, pageName, internalPageName) {
  return { type: INTERNAL_OPENING_PAGE_DONE, stackId, pageName, internalPageName };
}

export function goBack(stackId, pageName, internalPageName) {
  return { type: INTERNAL_GO_BACK, stackId, pageName, internalPageName };
}

export function goingBack(stackId, pageName, internalPageName) {
  return { type: INTERNAL_GOING_BACK, stackId, pageName, internalPageName };
}

export function goingBackDone(stackId, pageName, internalPageName) {
  return { type: INTERNAL_GOING_BACK_DONE, stackId, pageName, internalPageName };
}

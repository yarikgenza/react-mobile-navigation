import {
  INTERNAL_GO_BACK,
  INTERNAL_GOING_BACK,
  INTERNAL_GOING_BACK_DONE,
  INTERNAL_OPEN_PAGE,
  INTERNAL_OPENING_PAGE,
  INTERNAL_OPENING_PAGE_DONE,
} from '../constants/internal-paging-action-types';

export function openPage(stackId, pageName, direction, zIndex) {
  return { type: INTERNAL_OPEN_PAGE, stackId, pageName, direction, zIndex };
}

export function openingPage(stackId, pageName) {
  return { type: INTERNAL_OPENING_PAGE, stackId, pageName };
}

export function openingPageDone(stackId, pageName) {
  return { type: INTERNAL_OPENING_PAGE_DONE, stackId, pageName };
}

export function goBack(stackId, pageName) {
  return { type: INTERNAL_GO_BACK, stackId, pageName };
}

export function goingBack(stackId, pageName) {
  return { type: INTERNAL_GOING_BACK, stackId, pageName };
}

export function goingBackDone(stackId, pageName) {
  return { type: INTERNAL_GOING_BACK_DONE, stackId, pageName };
}

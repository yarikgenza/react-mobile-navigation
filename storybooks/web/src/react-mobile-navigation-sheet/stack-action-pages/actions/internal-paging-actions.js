import {
  ACTION_SHEET_GO_BACK,
  ACTION_SHEET_GOING_BACK,
  ACTION_SHEET_GOING_BACK_DONE,
  ACTION_SHEET_OPEN_PAGE,
  ACTION_SHEET_OPENING_PAGE,
  ACTION_SHEET_OPENING_PAGE_DONE,
} from '../action-types/internal-paging-action-types';

export function openPage(stackId, pageName, direction, zIndex) {
  return { type: ACTION_SHEET_OPEN_PAGE, stackId, pageName, direction, zIndex };
}

export function openingPage(stackId, pageName) {
  return { type: ACTION_SHEET_OPENING_PAGE, stackId, pageName };
}

export function openingPageDone(stackId, pageName) {
  return { type: ACTION_SHEET_OPENING_PAGE_DONE, stackId, pageName };
}

export function goBack(stackId, pageName) {
  return { type: ACTION_SHEET_GO_BACK, stackId, pageName };
}

export function goingBack(stackId, pageName) {
  return { type: ACTION_SHEET_GOING_BACK, stackId, pageName };
}

export function goingBackDone(stackId, pageName) {
  return { type: ACTION_SHEET_GOING_BACK_DONE, stackId, pageName };
}

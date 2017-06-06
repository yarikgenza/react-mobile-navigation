import {
  MODAL_GO_BACK,
  MODAL_GOING_BACK,
  MODAL_GOING_BACK_DONE,
  MODAL_OPEN_PAGE,
  MODAL_OPENING_PAGE,
  MODAL_OPENING_PAGE_DONE,
} from '../action-types/internal-paging-action-types';

export function openPage(stackId, pageName, direction, zIndex) {
  return { type: MODAL_OPEN_PAGE, stackId, pageName, direction, zIndex };
}

export function openingPage(stackId, pageName) {
  return { type: MODAL_OPENING_PAGE, stackId, pageName };
}

export function openPageDone(stackId, pageName) {
  return { type: MODAL_OPENING_PAGE_DONE, stackId, pageName };
}

export function goBack(stackId, pageName) {
  return { type: MODAL_GO_BACK, stackId, pageName };
}

export function goingBack(stackId, pageName) {
  return { type: MODAL_GOING_BACK, stackId, pageName };
}

export function goBackDone(stackId, pageName) {
  return { type: MODAL_GOING_BACK_DONE, stackId, pageName };
}

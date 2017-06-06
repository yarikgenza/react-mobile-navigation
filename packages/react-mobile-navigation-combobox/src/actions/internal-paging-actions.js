import {
  COMBO_BOX_GO_BACK,
  COMBO_BOX_GOING_BACK,
  COMBO_BOX_GOING_BACK_DONE,
  COMBO_BOX_OPEN_PAGE,
  COMBO_BOX_OPENING_PAGE,
  COMBO_BOX_OPENING_PAGE_DONE,
} from '../action-types/internal-paging-action-types';

export function openPage(stackId, pageName, direction, zIndex) {
  return { type: COMBO_BOX_OPEN_PAGE, stackId, pageName, direction, zIndex };
}

export function openingPage(stackId, pageName) {
  return { type: COMBO_BOX_OPENING_PAGE, stackId, pageName };
}

export function openPageDone(stackId, pageName) {
  return { type: COMBO_BOX_OPENING_PAGE_DONE, stackId, pageName };
}

export function goBack(stackId, pageName) {
  return { type: COMBO_BOX_GO_BACK, stackId, pageName };
}

export function goingBack(stackId, pageName) {
  return { type: COMBO_BOX_GOING_BACK, stackId, pageName };
}

export function goBackDone(stackId, pageName) {
  return { type: COMBO_BOX_GOING_BACK_DONE, stackId, pageName };
}

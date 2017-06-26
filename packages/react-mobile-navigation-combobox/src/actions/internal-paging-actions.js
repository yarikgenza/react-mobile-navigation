import {
  COMBO_BOX_GO_BACK,
  COMBO_BOX_GOING_BACK,
  COMBO_BOX_GOING_BACK_DONE,
  COMBO_BOX_OPEN_PAGE,
  COMBO_BOX_OPENING_PAGE,
  COMBO_BOX_OPENING_PAGE_DONE,
} from '../action-types/internal-paging-action-types';

export function openPage(props, direction) {
  return { type: COMBO_BOX_OPEN_PAGE, props, direction };
}

export function openingPage() {
  return { type: COMBO_BOX_OPENING_PAGE };
}

export function openPageDone() {
  return { type: COMBO_BOX_OPENING_PAGE_DONE };
}

export function goBack() {
  return { type: COMBO_BOX_GO_BACK };
}

export function goingBack() {
  return { type: COMBO_BOX_GOING_BACK };
}

export function goBackDone() {
  return { type: COMBO_BOX_GOING_BACK_DONE };
}

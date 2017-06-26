import {
  MODAL_GO_BACK,
  MODAL_GOING_BACK,
  MODAL_GOING_BACK_DONE,
  MODAL_OPEN_PAGE,
  MODAL_OPENING_PAGE,
  MODAL_OPENING_PAGE_DONE,
} from '../action-types/internal-paging-action-types';

export function openPage(props, direction) {
  return { type: MODAL_OPEN_PAGE, props, direction };
}

export function openingPage() {
  return { type: MODAL_OPENING_PAGE };
}

export function openPageDone() {
  return { type: MODAL_OPENING_PAGE_DONE };
}

export function goBack() {
  return { type: MODAL_GO_BACK };
}

export function goingBack() {
  return { type: MODAL_GOING_BACK };
}

export function goBackDone() {
  return { type: MODAL_GOING_BACK_DONE };
}

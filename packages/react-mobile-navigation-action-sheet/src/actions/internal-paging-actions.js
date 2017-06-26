import {
  ACTION_SHEET_CLOSE_START,
  ACTION_SHEET_CLOSING,
  ACTION_SHEET_CLOSE_DONE,
  ACTION_SHEET_OPEN_START,
  ACTION_SHEET_OPENING,
  ACTION_SHEET_OPEN_DONE,
} from '../action-types/internal-paging-action-types';

export function openPage(props, direction) {
  return { type: ACTION_SHEET_OPEN_START, props, direction };
}

export function openingPage() {
  return { type: ACTION_SHEET_OPENING };
}

export function openPageDone() {
  return { type: ACTION_SHEET_OPEN_DONE };
}

export function goBack() {
  return { type: ACTION_SHEET_CLOSE_START };
}

export function goingBack() {
  return { type: ACTION_SHEET_CLOSING };
}

export function goBackDone() {
  return { type: ACTION_SHEET_CLOSE_DONE };
}

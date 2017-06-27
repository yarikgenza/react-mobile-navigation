import {
  ACTION_SHEET_CLOSE_START,
  ACTION_SHEET_CLOSING,
  ACTION_SHEET_CLOSE_DONE,
  ACTION_SHEET_OPEN_START,
  ACTION_SHEET_OPENING,
  ACTION_SHEET_OPEN_DONE,
} from '../action-types/internal-paging-action-types';

export function openPage(pageName, direction, zIndex) {
  return { type: ACTION_SHEET_OPEN_START, pageName, direction, zIndex };
}

export function openingPage(pageName) {
  return { type: ACTION_SHEET_OPENING, pageName };
}

export function openPageDone(pageName) {
  return { type: ACTION_SHEET_OPEN_DONE, pageName };
}

export function goBack(pageName) {
  return { type: ACTION_SHEET_CLOSE_START, pageName };
}

export function goingBack(pageName) {
  return { type: ACTION_SHEET_CLOSING, pageName };
}

export function goBackDone(pageName) {
  return { type: ACTION_SHEET_CLOSE_DONE, pageName };
}

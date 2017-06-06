import {
  ACTION_SHEET_CLOSE_START,
  ACTION_SHEET_CLOSING,
  ACTION_SHEET_CLOSE_DONE,
  ACTION_SHEET_OPEN_START,
  ACTION_SHEET_OPENING,
  ACTION_SHEET_OPEN_DONE,
} from '../action-types/internal-paging-action-types';

export function openPage(stackId, pageName, direction, zIndex) {
  return {
    type: ACTION_SHEET_OPEN_START,
    stackId,
    pageName,
    direction,
    zIndex,
  };
}

export function openingPage(stackId, pageName) {
  return {
    type: ACTION_SHEET_OPENING,
    stackId,
    pageName,
  };
}

export function openPageDone(stackId, pageName) {
  return {
    type: ACTION_SHEET_OPEN_DONE,
    stackId,
    pageName,
  };
}

export function goBack(stackId, pageName) {
  return {
    type: ACTION_SHEET_CLOSE_START,
    stackId,
    pageName,
  };
}

export function goingBack(stackId, pageName) {
  return {
    type: ACTION_SHEET_CLOSING,
    stackId,
    pageName,
  };
}

export function goBackDone(stackId, pageName) {
  return {
    type: ACTION_SHEET_CLOSE_DONE,
    stackId,
    pageName,
  };
}

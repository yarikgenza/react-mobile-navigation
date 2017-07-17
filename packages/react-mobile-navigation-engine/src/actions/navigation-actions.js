import {
  PAGE_OPEN_START,
  PAGE_OPEN_DONE,
  PAGE_CLOSE_START,
  PAGE_CLOSE_DONE,
} from '../action-types/navigation-action-types';

export function openPage(pageIdNew, isForce = false) {
  return { type: PAGE_OPEN_START, isForce, pageIdNew };
}

export function openPageDone() {
  return { type: PAGE_OPEN_DONE };
}

export function closePage(isForce = false) {
  return { type: PAGE_CLOSE_START, isForce };
}

export function closePageDone() {
  return { type: PAGE_CLOSE_DONE };
}

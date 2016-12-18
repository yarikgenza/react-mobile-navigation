import { DirectionEnum } from 'react-mobile-navigation-core';
import {
  GO_BACK,
  GOING_BACK,
  GOING_BACK_DONE,
  OPEN_PAGE,
  OPENING_PAGE,
  OPENING_PAGE_DONE,
} from '../constants/paging-action-types';

// TODO: should not be exposed
export function openPage(stackId, pageName, direction) {
  return { type: OPEN_PAGE, stackId, pageName, direction };
}

export function openPageHorizontal(stackId, pageName) {
  return { type: OPEN_PAGE, stackId, pageName, direction: DirectionEnum.HORIZONTAL };
}

export function openPageVertical(stackId, pageName) {
  return { type: OPEN_PAGE, stackId, pageName, direction: DirectionEnum.VERTICAL };
}

// TODO: should not be exposed
export function openingPage(stackId, pageName) {
  return { type: OPENING_PAGE, stackId, pageName };
}

// TODO: should not be exposed
export function openingPageDone(stackId, pageName) {
  return { type: OPENING_PAGE_DONE, stackId, pageName };
}

export function goBack(stackId, onClosed) {
  return { type: GO_BACK, stackId, onClosed };
}

// TODO: should not be exposed
export function goingBack(stackId, pageName) {
  return { type: GOING_BACK, stackId, pageName };
}

// TODO: should not be exposed
export function goingBackDone(stackId, pageName) {
  return { type: GOING_BACK_DONE, stackId, pageName };
}

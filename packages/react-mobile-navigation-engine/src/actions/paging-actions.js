import { DirectionEnum } from 'react-mobile-navigation-core';
import {
  GO_BACK,
  GOING_BACK,
  GOING_BACK_DONE,
  OPEN_PAGE,
  OPENING_PAGE,
  OPENING_PAGE_DONE,
} from '../action-types/paging-action-types';

export function openPage(stackId, pageName, direction) {
  return { type: OPEN_PAGE, stackId, pageName, direction };
}

export function openPageHorizontal(stackId, pageName) {
  return { type: OPEN_PAGE, stackId, pageName, direction: DirectionEnum.HORIZONTAL };
}

export function openPageVertical(stackId, pageName) {
  return { type: OPEN_PAGE, stackId, pageName, direction: DirectionEnum.VERTICAL };
}

export function openingPage(stackId, pageName) {
  return { type: OPENING_PAGE, stackId, pageName };
}

export function openingPageDone(stackId, pageName) {
  return { type: OPENING_PAGE_DONE, stackId, pageName };
}

export function goBack(stackId, onClosed) {
  return { type: GO_BACK, stackId, onClosed };
}

export function goingBack(stackId, pageName) {
  return { type: GOING_BACK, stackId, pageName };
}

export function goingBackDone(stackId, pageName) {
  return { type: GOING_BACK_DONE, stackId, pageName };
}

import { DirectionEnum } from 'react-mobile-navigation-core';
import {
  PAGE_CLOSE_START,
  PAGE_CLOSING,
  PAGE_CLOSE_DONE,
  PAGE_CLOSE_FORCE,
  PAGE_OPEN_START,
  PAGE_OPENING,
  PAGE_OPEN_DONE,
} from '../action-types/paging-action-types';

export function openPage(stackId, pageName, direction) {
  return { type: PAGE_OPEN_START, stackId, pageName, direction };
}

export function openPageHorizontal(stackId, pageName) {
  return { type: PAGE_OPEN_START, stackId, pageName, direction: DirectionEnum.HORIZONTAL };
}

export function openPageVertical(stackId, pageName) {
  return { type: PAGE_OPEN_START, stackId, pageName, direction: DirectionEnum.VERTICAL };
}

export function openingPage(stackId, pageName) {
  return { type: PAGE_OPENING, stackId, pageName };
}

export function openPageDone(stackId, pageName) {
  return { type: PAGE_OPEN_DONE, stackId, pageName };
}

export function goBack(stackId) {
  return { type: PAGE_CLOSE_START, stackId };
}

export function goBackForce(stackId) {
  return { type: PAGE_CLOSE_FORCE, stackId };
}

export function goingBack(stackId, pageName) {
  return { type: PAGE_CLOSING, stackId, pageName };
}

export function goBackDone(stackId, pageName) {
  return { type: PAGE_CLOSE_DONE, stackId, pageName };
}

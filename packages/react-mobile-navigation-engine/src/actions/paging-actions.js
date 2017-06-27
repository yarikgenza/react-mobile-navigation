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

export function openPage(pageName, direction) {
  return { type: PAGE_OPEN_START, pageName, direction };
}

export function openPageHorizontal(pageName) {
  return { type: PAGE_OPEN_START, pageName, direction: DirectionEnum.HORIZONTAL };
}

export function openPageVertical(pageName) {
  return { type: PAGE_OPEN_START, pageName, direction: DirectionEnum.VERTICAL };
}

export function openingPage(pageName) {
  return { type: PAGE_OPENING, pageName };
}

export function openPageDone(pageName) {
  return { type: PAGE_OPEN_DONE, pageName };
}

export function goBack() {
  return { type: PAGE_CLOSE_START };
}

export function goBackForce() {
  return { type: PAGE_CLOSE_FORCE };
}

export function goingBack(pageName) {
  return { type: PAGE_CLOSING, pageName };
}

export function goBackDone(pageName) {
  return { type: PAGE_CLOSE_DONE, pageName };
}

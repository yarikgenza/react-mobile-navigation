import { DirectionEnum } from 'react-mobile-navigation-core';

export function openPageHorizontal(pageName) {
  return { direction: DirectionEnum.HORIZONTAL, pageName };
}

export function openPageVertical(pageName) {
  return { direction: DirectionEnum.VERTICAL, pageName };
}

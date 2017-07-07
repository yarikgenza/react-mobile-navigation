import { DirectionEnum } from 'react-mobile-navigation-core';

export function openPageHorizontal(pageIdNew) {
  return { direction: DirectionEnum.HORIZONTAL, pageIdNew };
}

export function openPageVertical(pageIdNew) {
  return { direction: DirectionEnum.VERTICAL, pageIdNew };
}

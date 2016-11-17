import { getTranslate3dByDirection } from 'react-mobile-navigation-core';
import { isActionSheetVisible } from './visability-statuses';

export function getDarkBackgroundStyle(zIndex, status, translateValue) {
  const halfOpacity = 0.3;
  const translateMaxValue = 100;
  const dynamicOpacity = halfOpacity * translateValue / translateMaxValue;
  return {
    zIndex: zIndex + 1,
    visibility: isActionSheetVisible(status) ? 'visible' : 'hidden',
    opacity: halfOpacity - dynamicOpacity,
  };
}

export function getShadowPageContentStyle(direction, zIndex, status, translateValue) {
  const transformStyle = getTranslate3dByDirection(status, direction, translateValue);
  return Object.assign({ zIndex: zIndex + 2 }, transformStyle);
}

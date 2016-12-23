import { isActionSheetVisible } from './visability-statuses';

export function getDarkBackgroundStyle(status, translateValue) {
  const halfOpacity = 0.3;
  const translateMaxValue = 100;
  const dynamicOpacity = halfOpacity * translateValue / translateMaxValue;
  return {
    visibility: isActionSheetVisible(status) ? 'visible' : 'hidden',
    opacity: halfOpacity - dynamicOpacity,
  };
}

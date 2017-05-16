import { PageStatusTypesEnum } from 'react-mobile-navigation-core';

export function isActionSheetVisible(status) {
  switch (status) {
    case PageStatusTypesEnum.OPEN_ANIMATING:
    case PageStatusTypesEnum.OPEN_DONE:
    case PageStatusTypesEnum.CLOSE_PREPARE:
    case PageStatusTypesEnum.CLOSE_ANIMATING:
      return true;
    case PageStatusTypesEnum.CLOSE_DONE:
    case PageStatusTypesEnum.OPEN_PREPARE:
      return false;
    default:
      return true;
  }
}

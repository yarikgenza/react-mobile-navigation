import invariant from 'invariant';
import * as PageStatusTypesEnum from 'react-mobile-navigation-core';

export function isActionSheetVisible(status) {
  switch (status) {
    case PageStatusTypesEnum.OPENING:
    case PageStatusTypesEnum.OPENED:
    case PageStatusTypesEnum.PREPARE_TO_CLOSE:
    case PageStatusTypesEnum.CLOSING:
      return true;
    case PageStatusTypesEnum.CLOSED:
    case PageStatusTypesEnum.PREPARE_TO_OPEN:
      return false;
    default:
      invariant(true, 'Porperty "status" in "isActionSheetVisible" function is out of range');
      return true;
  }
}

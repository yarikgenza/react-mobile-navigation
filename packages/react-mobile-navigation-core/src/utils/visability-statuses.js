import invariant from 'invariant';
import PageStatusTypesEnum from '../constants/page-status-types';

export function isPageOpen(status) {
  switch (status) {
    case PageStatusTypesEnum.OPENING:
    case PageStatusTypesEnum.OPENED:
    case PageStatusTypesEnum.PREPARE_TO_CLOSE:
      return true;
    case PageStatusTypesEnum.CLOSING:
    case PageStatusTypesEnum.CLOSED:
    case PageStatusTypesEnum.PREPARE_TO_OPEN:
      return false;
    default:
      invariant(true, 'Porperty "status" in "isPageOpen" function is out of range');
      return true;
  }
}

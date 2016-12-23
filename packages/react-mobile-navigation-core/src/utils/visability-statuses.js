import invariant from 'invariant';
import PageStatusTypesEnum from '../constants/page-status-types';
import { INTERP_OUT, INTERP_BEGIN, INTERP_END } from '../constants/interpolation-values';

export function getSpringValue(status) {
  switch (status) {
    case PageStatusTypesEnum.OPEN_ANIMATING:
    case PageStatusTypesEnum.OPEN_DONE:
    case PageStatusTypesEnum.CLOSE_PREPARE:
    case PageStatusTypesEnum.BACK_ANIMATING_IN:
      return INTERP_BEGIN;
    case PageStatusTypesEnum.CLOSE_ANIMATING:
    case PageStatusTypesEnum.CLOSE_DONE:
    case PageStatusTypesEnum.OPEN_PREPARE:
      return INTERP_END;
    case PageStatusTypesEnum.BACK_ANIMATING_OUT:
    case PageStatusTypesEnum.BACK_ANIMATING_OUT_DONE:
      return INTERP_OUT;
    default:
      invariant(true, 'Property "status" in "isPageOpen" function is out of range');
      return INTERP_BEGIN;
  }
}

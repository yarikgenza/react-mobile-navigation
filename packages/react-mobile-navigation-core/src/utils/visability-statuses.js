import * as PageStatusTypesEnum from '../constants/page-status-types';
import { INTERP_OUT, INTERP_BEGIN, INTERP_END } from '../constants/interpolation-values';

export function getSpringValue(status) {
  switch (status) {
    case PageStatusTypesEnum.OPEN_DONE:
      return INTERP_BEGIN;
    case PageStatusTypesEnum.CLOSE_DONE:
      return INTERP_END;
    case PageStatusTypesEnum.BACK_ANIMATING_OUT_DONE:
      return INTERP_OUT;
    default:
      return INTERP_BEGIN;
  }
}

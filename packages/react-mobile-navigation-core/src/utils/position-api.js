import * as PageStatusTypesEnum from '../constants/page-status-types';

const INTERP_OUT = -30;
const INTERP_BEGIN = 0;
const INTERP_END = 100;

export function getPositionFromStatus(status) {
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

export function getModalPositionFromStatus(status) {
  switch (status) {
    case PageStatusTypesEnum.OPEN_DONE:
      return INTERP_BEGIN;
    case PageStatusTypesEnum.CLOSE_DONE:
      return INTERP_END;
    case PageStatusTypesEnum.BACK_ANIMATING_OUT_DONE:
      return INTERP_BEGIN;
    default:
      return INTERP_BEGIN;
  }
}

import {
  BACK_ANIMATING_OUT_START,
  BACK_ANIMATING_OUT_PROCESSING,
  BACK_ANIMATING_OUT_DONE,
  BACK_ANIMATING_IN_START,
  BACK_ANIMATING_IN_PROCESSING,
  OPEN_START,
  OPEN_PROCESSING,
  OPEN_DONE,
  CLOSE_START,
  CLOSE_PROCESSING,
  CLOSE_DONE,
} from '../constants/page-status-types';

const INTERP_OUT = -30;
const INTERP_BEGIN = 0;
const INTERP_END = 100;

export function getPositionFromStatus(status) {
  switch (status) {
    case BACK_ANIMATING_IN_PROCESSING:
    case BACK_ANIMATING_OUT_START:
    case OPEN_DONE:
    case OPEN_PROCESSING:
    case CLOSE_START:
      return INTERP_BEGIN;
    case CLOSE_PROCESSING:
    case OPEN_START:
    case CLOSE_DONE:
      return INTERP_END;
    case BACK_ANIMATING_OUT_DONE:
    case BACK_ANIMATING_OUT_PROCESSING:
    case BACK_ANIMATING_IN_START:
      return INTERP_OUT;
    default:
      return INTERP_BEGIN;
  }
}

export function getModalPositionFromStatus(status) {
  switch (status) {
    case BACK_ANIMATING_IN_PROCESSING:
    case BACK_ANIMATING_OUT_START:
    case OPEN_DONE:
    case OPEN_PROCESSING:
    case CLOSE_START:
      return INTERP_BEGIN;
    case CLOSE_PROCESSING:
    case OPEN_START:
    case CLOSE_DONE:
      return INTERP_END;
    case BACK_ANIMATING_OUT_DONE:
    case BACK_ANIMATING_OUT_PROCESSING:
    case BACK_ANIMATING_IN_START:
      return INTERP_BEGIN;
    default:
      return INTERP_BEGIN;
  }
}

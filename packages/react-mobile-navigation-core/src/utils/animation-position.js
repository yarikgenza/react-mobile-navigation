import PageStatusTypesEnum from '../constants/page-status-types';
import DirectionEnum from '../constants/direction-types';
import { INTERP_OUT, INTERP_BEGIN, INTERP_END } from '../constants/interpolation-values';

function getTransform(transform) {
  return {
    transform,
    WebkitTransform: transform,
  };
}

export default (status, direction, value) => {
  switch (status) {
    case PageStatusTypesEnum.OPEN_DONE:
      return getTransform(`translate3d(${INTERP_BEGIN}, ${INTERP_BEGIN}, 0)`);
    case PageStatusTypesEnum.OPEN_PREPARE:
    case PageStatusTypesEnum.OPEN_ANIMATING:
    case PageStatusTypesEnum.CLOSE_PREPARE:
    case PageStatusTypesEnum.CLOSE_ANIMATING:
    case PageStatusTypesEnum.BACK_ANIMATING_OUT:
    case PageStatusTypesEnum.BACK_ANIMATING_IN:
      switch (direction) {
        case DirectionEnum.HORIZONTAL:
          return getTransform(`translate3d(${value}%, 0, 0)`);
        case DirectionEnum.VERTICAL:
          return getTransform(`translate3d(0, ${value}%, 0)`);
        default:
          return getTransform('translate3d(0, 0, 0)');
      }
    case PageStatusTypesEnum.CLOSE_DONE:
      return getTransform(`translate3d(${INTERP_END}%, 0, 0)`);
    case PageStatusTypesEnum.BACK_ANIMATING_OUT_DONE:
      return getTransform(`translate3d(${INTERP_OUT}%, 0, 0)`);
    default:
      return getTransform('translate3d(0, 0, 0)');
  }
};

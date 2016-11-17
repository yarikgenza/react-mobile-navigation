import invariant from 'invariant';
import PageStatusTypesEnum from '../constants/page-status-types';
import DirectionEnum from '../constants/direction-types';

function getTransform(transform) {
  return {
    transform,
    WebkitTransform: transform,
  };
}

export default (status, direction, value) => {
  switch (status) {
    case PageStatusTypesEnum.OPENED:
      return getTransform('translate3d(0, 0, 0)');
    case PageStatusTypesEnum.PREPARE_TO_OPEN:
    case PageStatusTypesEnum.OPENING:
    case PageStatusTypesEnum.PREPARE_TO_CLOSE:
    case PageStatusTypesEnum.CLOSING:
      switch (direction) {
        case DirectionEnum.HORIZONTAL:
          return getTransform(`translate3d(${value}%, 0, 0)`);
        case DirectionEnum.VERTICAL:
          return getTransform(`translate3d(0, ${value}%, 0)`);
        default:
          if (process.env.NODE_ENV !== 'production') {
            invariant(true, 'Property "direction" should be "HORIZONTAL" or "VERTICAL"');
          }
          return getTransform('translate3d(0, 0, 0)');
      }
    case PageStatusTypesEnum.CLOSED:
      return getTransform('translate3d(100%, 0, 0)');
    default:
      if (process.env.NODE_ENV !== 'production') {
        invariant(true, 'Property "status" is out of range.');
      }
      return getTransform('translate3d(0, 0, 0)');
  }
};

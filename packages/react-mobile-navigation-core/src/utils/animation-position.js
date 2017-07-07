import DirectionEnum from '../constants/direction-types';
// import { INTERP_OUT, INTERP_BEGIN, INTERP_END } from '../constants/interpolation-values';

function getTransform(transform) {
  return {
    transform,
    // WebkitTransform: transform,
  };
}

export default (direction, translateValue) => {
  switch (direction) {
    case DirectionEnum.VERTICAL:
      return getTransform(`translate3d(0, ${translateValue}%, 0)`);
    case DirectionEnum.HORIZONTAL:
      return getTransform(`translate3d(${translateValue}%, 0, 0)`);
    default:
      return getTransform('translate3d(0%, 0%, 0)');
  }
};

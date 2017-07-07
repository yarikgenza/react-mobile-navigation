import * as DirectionEnum from '../constants/direction-types';

function getTransform(transform) {
  return {
    transform,
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

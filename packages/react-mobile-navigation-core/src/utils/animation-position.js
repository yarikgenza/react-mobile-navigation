import * as DirectionEnum from '../constants/direction-types';

function getTransform(direction, transform) {
  return {
    transform,
    transition: direction ? 'transform 0.25s' : undefined,
  };
}

export default (direction, translateValue) => {
  switch (direction) {
    case DirectionEnum.VERTICAL:
      return getTransform(direction, `translate3d(0, ${translateValue}%, 0)`);
    case DirectionEnum.HORIZONTAL:
      return getTransform(direction, `translate3d(${translateValue}%, 0, 0)`);
    default:
      return getTransform(direction, 'translate3d(0%, 0%, 0)');
  }
};

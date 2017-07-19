import { HORIZONTAL, VERTICAL } from '../constants/direction-types';

export const MODAL_MARGIN = 10;

export const TRANSFORM_CURVE = 'cubic-bezier(0.190, 1.000, 0.220, 1.000)';

function getTransform(direction, isForce, transform) {
  return {
    transform,
    transition: (!direction || isForce) ? undefined : `transform 0.5s ${TRANSFORM_CURVE}`,
  };
}

export default (direction, isForce, position) => {
  switch (direction) {
    case VERTICAL:
      return getTransform(direction, isForce, `translate3d(0, ${position}%, 0)`);
    case HORIZONTAL:
      return getTransform(direction, isForce, `translate3d(${position}%, 0, 0)`);
    default:
      return getTransform(direction, isForce, 'translate3d(0%, 0%, 0)');
  }
};
